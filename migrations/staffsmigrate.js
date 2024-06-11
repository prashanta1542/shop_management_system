const multer = require('multer');
const crypto = require('crypto');
const staffreg = require('../models/staffs').StaffReg;
const stafflogin = require('../models/staffs').Login;
const staffupload = require('../multer').uploadstaff;
const costs = require('../models/staffs').costs;
const coststype = require('../models/staffs').costtype;
const nodemailer = require('nodemailer');
const { uploadstaff } = require('../multer');

function sendOTPByEmail(email, otp) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user:
      pass:
    }
  });

  let mailOptions = {
    from: '"Shop management database system" <your-email@gmail.com>', // sender address
    to: email, // list of receivers
    subject: 'One Time Password (OTP) for login', // Subject line
    text: `Dear User,\n\nYour One Time Password (OTP) for login is ${otp}.\n\nPlease use this OTP to complete your login process.\n\nThank you,\nYour Name`,
    html: `<p>Dear User,</p><p>Your One Time Password (OTP) for login is <strong>${otp}</strong>.</p><p>Please use this OTP to complete your login process.</p><br><p>Thank you,</p><p>Your Name</p>`
  };
  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}



function staffReg(req, res) {
  staffupload.single('image')(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred
      console.error('Multer error:', err)
      res.status(400).send('File upload error')
    } else if (err) {
      // An unknown error occurred
      console.error('Unknown error:', err)
      res.status(400).send('Unknown error')
    } else {
      // File upload successful, proceed with creating product
      const { position, name, fname, mname, nationality, dob, image, pstreet, phouse, pCity, ppostoffice, ppostcode, parstreet, parhouse, parCity, parpostoffice, parpostcode, mobileno, alternatenumber, officenumber, employeeEmail, joiningdate, salary } = req.body
      const filename = req.file.filename;
      const randomBytes = crypto.randomBytes(8).toString('hex')
      const password = crypto.randomBytes(4).toString('hex')
      staffreg.create({
        id: randomBytes,
        position: position,
        employeename: name,
        fname: fname,
        mname: mname,
        nationality: nationality,
        dob: dob,
        photo: filename,
        pstree: pstreet,
        phouse: phouse,
        pCity: pCity,
        ppostoffice: ppostoffice,
        ppostcode: ppostcode,
        parstree: parstreet,
        parhouse: parhouse,
        parCity: parCity,
        parpostoffice: parpostoffice,
        parpostcode: parpostcode,
        mobilenumber: mobileno,
        alternatenumber: alternatenumber,
        officenumber: officenumber,
        customerEmail: employeeEmail,
        joiningdate: joiningdate,
        salary: salary,
      })

      stafflogin.create({
        staffid: randomBytes,
        email: employeeEmail,
        password: password,
      }).then(() => {
        sendOTPByEmail(employeeEmail, password);
        res.send({
          message: "Success"
        });
        console.log(filename)
      }).catch((err) => {
        console.error('Error creating product:', err)
        res.status(400).send('Error creating product')
      })
    }
  })
}

function staffLogin(req, res) {

  stafflogin.findOne({ where: { email: req.body.email, password: req.body.password } })
    .then((staff) => {
      if (!staff) {
        return res.status(400).send({
          status: 'error',
          message: 'Invalid email or password'
        });
      }

      const loginId = crypto.randomBytes(4).toString('hex');
      res.send({
        status: 'success',
        message: 'Login successful',
        staffId: staff.staffid,
        loginid: loginId,
      });
    })
    .catch((err) => {
      console.error('Error creating product:', err);
      res.status(400).send('Error creating product');
    });
}

function findStaff(req, res) {
  staffreg.findByPk(req.params.id)
    .then((staff) => {
      if (staff) {
        res.send(staff)
      } else {
        res.status(404).send('customer not found')
      }
    }).catch((err) => {
      res.status(400).send('Error fetching product')
    })
}

function costInsert(req, res) {
  const costId = crypto.randomBytes(2).toString('hex');
  costs.create({
    costid: costId,
    type: req.body.Type,
    details: req.body.Details,
    amount: req.body.Amount,
  }).then(() => {
    res.send({ message: "Successfully cost enter" })
  }).catch((err) => {
    console.error(err);
    res.status(400).send('Failed to insert costs')
  })
}
function findCosts(req, res) {
  costs.findAll()
    .then((info) => {
      res.send(info)
    }).catch((err) => {
      console.error(err);
      res.status(400).send('Failed to fetch costs')
    })
}
function totalcosts(req,res){
  costs.sum('amount')
  .then((earns) => {
    res.status(200).send({ earnings: earns });
  })
  .catch((err) => {
    console.error(err);
    res.status(400).send({
      message: "Error occurred while calculating earnings",
      error: err
    })
  })
}

function insertnewcosttype(req,res){
  coststype.create({
    costs:req.body.cost
  }).then(()=>{
    res.send({
      status:400,
      message:"Successfully Insert"
    })
  }).catch((err)=>{
    console.error(err);
    res.send({
      status:404,
      message:"Failed to insert"
    })
  })
}
function getAllcostType(req,res){
  coststype.findAll().then((data)=>{
    res.send(data);
  }).catch((err)=>{
    console.error(err);
    res.send({
      status:404,
      message:"Failed to fetch data"
    })
  })
}
module.exports = {
  staffReg,
  staffLogin,
  findStaff,
  costInsert,
  findCosts,
  totalcosts,
  insertnewcosttype,
  getAllcostType,
}
