const multer = require('multer');
const crypto = require('crypto');
const deliveryReg=require('../models/deliverymans').deliverymanreg;
const login=require('../models/deliverymans').Login;
const schedule=require('../models/deliverymans').Schedule;
const weeklysechedule=require('../models/deliverymans').weeklySchedule;
const jobs = require('../models/deliverymans').jobs;
const ondelivery= require('../models/deliverymans').Ondelivery;
const report=require('../models/deliverymans').Report;
const paymentinfo = require('../models/customers').paymentinfo;
const orderstate = require('../models/customers').orderstate;
const cartpayment = require('../models/customers').cart_payment_info;
const cartinvoice = require('../models/customers').cart_invoice;

const nodemailer = require('nodemailer');
const { uploadsDeliveryman } = require('../multer');
const { where } = require('sequelize');

function sendOTPByEmail(email, otp) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'prashantachowdhury967@gmail.com',
        pass: 'uhnthdcaznlatwuq'
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

 function insertNewDeliveryman(req,res){
  uploadsDeliveryman.single('image')(req, res, function (err) {
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
      const { position, name, fname, mname ,nationality,dob,image,pstreet,phouse,pCity,ppostoffice,ppostcode,parstreet,parhouse,parCity,parpostoffice,parpostcode,mobileno,alternatenumber,officenumber,employeeEmail,joiningdate,salary} = req.body
      const filename = req.file.filename;
      const randomBytes = crypto.randomBytes(8).toString('hex')
      const password = crypto.randomBytes(4).toString('hex')
      deliveryReg.create({
        id:randomBytes,
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
        ppostoffice:ppostoffice,
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
      weeklysechedule.create({
        staffid:randomBytes,
        day1:req.body.day1,
        day2:req.body.day2,
        day3:req.body.day3,
      })
      login.create({
         id:randomBytes,
         email:employeeEmail,
         password:password,
      }).then(() => {
        sendOTPByEmail(employeeEmail,password);
        res.send({
            message:"Success"
        });
        console.log(filename)
      }).catch((err) => {
        console.error('Error creating product:', err)
        res.status(400).send('Error creating product')
      })
    }
  })
 }

 function deliveryLogin(req, res) {
 
  login.findOne({ where: { email: req.body.email, password: req.body.password } })
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
        staffId: staff.id,
        loginid:loginId,
      });
    })
    .catch((err) => {
      console.error('Error creating product:', err);
      res.status(400).send('Error creating product');
    });
}

function deliveryManById(req,res){
  deliveryReg.findByPk(req.params.id)
  .then((staff) => {
    if (staff) {
      res.send(staff)
    } else {
      res.status(404).send('Delivery man not found')
    }
  }).catch((err) => {
    res.status(400).send('Error fetching Information')
  })
}

function CreateJobs(req,res){
  const id = crypto.randomBytes(2).toString('hex')
  jobs.create({
      id:id,
      deliverymanid:req.body.jobid,
      order_id:req.body.Orderid,
      day:req.body.day,
      date:req.body.date,
      time:req.body.time,
      type:req.body.Type
  }).then(()=>{
    ondelivery.create({
      id:req.body.Orderid,
      deliverymanid:req.body.Deliveryid,
      
    }).then(()=>{
      res.send({message:"Successfully Hire a Job"})
    }).catch((err)=>{
      console.error(err);
      res.send({message:"Error occure in Ondelivery Table"})
    })   
  }).catch((err)=>{
    console.error(err);
  })
}

  function Jobs(req,res){
    jobs.findAll()
  .then((job) => {
    if (job) {
      res.send(job)
    } else {
      res.status(404).send('job not found')
    }
  }).catch((err) => {
    res.status(400).send('Error fetching job')
  })
  }
 function findJobById(req,res){
  const id = req.params.id;
  jobs.findAll({
    where:{
      deliverymanid:id,
    }
  })
    .then((product) => {
      if (product) {
        res.send(product)
      } else {
        res.status(404).send('Product not found')
      }
    }).catch((err) => {
      console.error('Error fetching product:', err)
      res.status(400).send('Error fetching product')
    })
 }
 function findschedulebyuserID(req,res){
  const id = req.params.id;
  weeklysechedule.findByPk(req.params.id)
    .then((product) => {
      if (product) {
        res.send(product)
      } else {
        res.status(404).send('Product not found')
      }
    }).catch((err) => {
      console.error('Error fetching product:', err)
      res.status(400).send('Error fetching product')
    })
 }
  function findAllDeliveryMan(req,res){
    deliveryReg.findAll().then((lists)=>{
      res.send(lists)
    }).catch((err)=>{
      console.error(err);
      res.status(400).send('Error fetching details')
    })
  }

  function findAllonDelivery(req,res){
    ondelivery.findAll().then((lists)=>{
      res.send(lists)
    }).catch((err)=>{
      console.error(err);
      res.status(400).send('Error fetching details')
    })
  }

  function findAllonDeliverybyid(req,res){
    //console.log(req.params.id);
    ondelivery.findAll(
      {
        where:{
          id:req.params.id,
        }
      }
    ).then((lists)=>{
      if (lists.length === 0) {      
        res.send('No records found');
      } else {
        const status = lists[0].deliverymanid; // Extract the 'status' property from the first record
        res.send(status);
      }
    }).catch((err)=>{
      console.error(err);
      res.status(400).send('Error fetching details')
    })
  }

  function makeReport(req,res){
    report.create({
      id:req.body.orderid,
      otp:req.body.otp,
      reporttype:req.body.reporttype,
      description:req.body.description,
   }).then(()=>{
    paymentinfo.update({status:req.body.reporttype},{
      where:{
        id:req.body.orderid,
        }
    })
    orderstate.update({status:req.body.reporttype},{
      where:{
        id:req.body.orderid,
      }
    })
    cartpayment.update({status:req.body.reporttype},{
      where:{
        bill_id:req.body.orderid,
        }
      })
    cartinvoice.update({status:req.body.reporttype},{
      where:{
        bill_id:req.body.orderid,
      }
    })
   }).catch((err)=>{
    console.error(err);
    res.status(400).send({
      status: 400,
      message: "Failed to insert Report",
    });
   })
  }

  function findReport(req,res){
    report.findAll().then((e)=>{
      res.send(e)
    }).catch((err)=>{
      console.error(err);
      res.status(400).send({
        status: 400,
        message: "Failed to insert Report",
      });
     })
  }
  module.exports={
    findAllDeliveryMan,
    CreateJobs,
    Jobs,
    findJobById,
    findschedulebyuserID,
    insertNewDeliveryman,
    deliveryLogin,
    deliveryManById,
    findAllonDelivery,
    findAllonDeliverybyid,
    makeReport,
    findReport,
  }