const crypto = require('crypto');
const customerdetails = require('../models/customers').customerreg;
const customerorder = require('../models/customers').customerorder;
const totalbill = require('../models/customers').customernetpay;
const paymentinfo = require('../models/customers').paymentinfo;
const orderstate = require('../models/customers').orderstate;
const cartproduct = require('../models/customers').cartProduct;
const cartpayment = require('../models/customers').cart_payment_info;
const cartinvoice = require('../models/customers').cart_invoice;
const orderconfirmation = require('../models/customers').ordercon;
const nodemailer = require('nodemailer'); 
const { where } = require('sequelize');

//payment method intrigrate

const SSLCommerzPayment = require('sslcommerz-lts');
const store_id = 'shopm64bd607b89c63'
const store_passwd = 'shopm64bd607b89c63@ssl'
const is_live = false //true for live, false for sandbox

//Payment method intrigrate

function sendOTPByEmail(email, orderid,otp) {
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
    subject: 'New Order Placed ', // Subject line
    text: `Dear User,\n\nThanks for buying new product for us. Your Order Id is : ${orderid}.\n\nPlease use this Order Id to track your order for further process.\n Order Confirmation OTP : ${otp} (***It is required to confirm your order when deliveryman ask to about One Time Password .)\n\nThank you,\nManager From YourhopHome`,
    html: `<p>Dear User,</p><p>Thanks for buying new product for us. Your Order Id is : <strong>${orderid}</strong>.</p><p>Please use this Order Id to track your order for further process.</p><br><p>Order Confirmation OTP : ${otp} (***It is required to confirm your order when deliveryman ask to about One Time Password .)</p><br><p>Thank you,</p><p>Manager From YourhopHome</p>`
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
function orderCancelEmail(email, orderid) {
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
    subject: 'Order Cancel Confirmation ', // Subject line
    text: `Dear User,\n\n Your Order Id is : ${orderid}.\n\nYour order has been cancel for unavoidal payment issues. Please try again with valid payment confirmation. For more info stay connect with us\n\nThank you,\nManager From YourhopHome`,
    html: `<p>Dear User,</p><p>Your Order Id is : <strong>${orderid}</strong>.</p><p>Your order has been cancel for unavoidal payment issues. Please try again with valid payment confirmation. For more info stay connect with us </p><br><p>Thank you,</p><p>Manager From YourhopHome</p>`
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
function customerinsert(req, res) {
  const custId = crypto.randomBytes(4).toString('hex');
  const billerId = crypto.randomBytes(4).toString('hex');
  const otp= crypto.randomBytes(2).toString('hex');
  customerdetails.create(
    {
      id: custId,
      name: req.body.customerName,
      email: req.body.customerEmail,
      // nid: req.body.customerNid,
      mobile: req.body.customerMobileNo,
      alternative_mobile: req.body.customerAlternativeMobileNo,
      // house: req.body.house,
      street: req.body.streetAddress,
      city: req.body.city,
      // postoffice: req.body.postOffice,
      // postcode: req.body.postCode,
      // policestation: req.body.policeStation,
    }
  )

  customerorder.create(
    {
      id: custId,
      productid: req.body.productid,
      productname: req.body.productname,
      price: req.body.price,
      quantity: req.body.quantity,
      totalprice: req.body.totalprice,
    }
  )
  orderconfirmation.create({
    orderid:billerId,
    otp:otp,
  })

  totalbill.create({
    id: billerId,
    customerid: custId,
    netpay: req.body.netpay,
  })
    .then(() => {
      sendOTPByEmail(req.body.customerEmail, billerId,otp);
      res.send(billerId);
    })
    .catch((err) => {
      console.error(err);
      res.status(400).send("Failed to create order");
    });


}
function findorderedProductbyId(req,res){
  customerorder.findByPk(req.params.id).then((product)=>{
    res.send(product)
  }).catch((err)=>{
    res.status(404).send('Not Found User')
    console.error(err);
  })
}
function orderfindbyid(req, res) {
  totalbill.findByPk(req.params.id)
    .then((bill) => {
      if (bill) {
        res.send(bill)
      } else {
        res.status(404).send('Product not found')
      }
    })
    .catch((err) => {
      console.error('Error fetching product:', err)
      res.status(400).send('Error fetching product')
    })

}

function paymentInfo(req, res) {

  paymentinfo.create({
    id: req.body.billerId,
    customerid: req.body.customerid,
    netpay: req.body.totalPay,
    paymeenttype: req.body.paytype,
    bakshnumber: req.body.bkashnumber,
    trxid: req.body.trxid,
    status: "pending"
  })

  orderstate.create({
    id: req.body.billerId,
    customerid: req.body.customerid,
    status: "pending"
  })
    .then(() => {
      res.send({
        custId: req.body.customerid,
        orderId: req.body.billerId,
        message: "Successfully placed order"
      });
    })
    .catch((error) => {
      console.error("Error placing order:", error);
      res.status(400).send("Error placing order");
    });
}
function findpaymentinfobyid(req,res){
  paymentinfo.findByPk(req.params.id)
    .then((bill) => {
      if (bill) {
        res.send([bill])
      } else {
        res.status(404).send('Product not found')
      }
    }).catch((err) => {
      console.error('Error fetching product:', err)
      res.status(400).send('Error fetching product')
    })
}
function customerfindbyid(req, res) {
  customerdetails.findByPk(req.params.id)
    .then((bill) => {
      if (bill) {
        res.send(bill)
      } else {
        res.status(404).send('customer not found')
      }
    }).catch((err) => {
      res.status(400).send('Error fetching product')
    })

}

function cartproductinsert(req, res) {
  const custId = crypto.randomBytes(4).toString('hex');
  const invoiceId = crypto.randomBytes(4).toString('hex');
  const products = req.body.products.map((product) => JSON.parse(product));
  console.log(products);

 
  customerdetails.create({
    id: custId,
    name: req.body.customerName,
    email: req.body.customerEmail,
    //nid: req.body.customerNid,
    mobile: req.body.customerMobileNo,
    alternative_mobile: req.body.customerAlternativeMobileNo,
   // house: req.body.house,
    street: req.body.streetAddress,
    city: req.body.city,
    // postoffice: req.body.postOffice,
    // postcode: req.body.postCode,
    // policestation: req.body.policeStation,
  })
  .then(() => {
    const promises = products.map((item) => {
      const billerId = crypto.randomBytes(4).toString('hex');
      return cartproduct.create({
        bill_id: billerId,
        customerid: custId,
        productid: item.id,
        productname: item.productName,
        price: item.price,
        quantity: item.quantity,
        totalprice: item.totalPrice,
        invoice_id: invoiceId
      });
    });

    Promise.all(promises)
      .then(() => {
        return totalbill.create({
          id: invoiceId,
          customerid: custId,
          netpay: req.body.netpay,
        });
      })
      .then(() => {
        res.send(invoiceId);
      })
      .catch((err) => {
        console.error(err);
        res.status(400).send("Failed to create order");
      });
  })
  .catch((err) => {
    console.error(err);
    res.status(400).send("Failed to create customer");
  });
}


function cartPaymentInfo(req, res) {
  const billerId = crypto.randomBytes(4).toString('hex');
  const otp = crypto.randomBytes(2).toString('hex');
  const trxid = crypto.randomBytes(4).toString('hex');
  const custEmail = req.body.email;
  const total_pay=req.body.totalPay;

  cartpayment
    .create({
      invoice_id: req.body.invoiceId,
      bill_id: billerId,
      customerid: req.body.customerid,
      netpay: req.body.totalPay,
      paymeenttype: req.body.paytype,
      bakshnumber: req.body.bkashnumber,
      trxid: trxid,
      status: 'pending',
    })
    .then(() => {
      orderconfirmation.create({
        orderid: billerId,
        otp: otp,
      });

      cartinvoice.create({
        bill_id: billerId,
        invoice_id: req.body.invoiceId,
        customerid: req.body.customerid,
        status: 'pending',
      }).then(() => {
        sendOTPByEmail(custEmail, billerId, otp);

        const data = {
          total_amount: total_pay,
          currency: 'BDT',
          tran_id: 'REF123', // use unique tran_id for each api call
          success_url: 'http://localhost:3001/success-confirmation/'+billerId,
          fail_url: 'http://localhost:3001/fail-confirmation/'+req.body.customerid +'/'+billerId,
          cancel_url: 'http://localhost:3030/cancel',
          ipn_url: 'http://localhost:3030/ipn',
          shipping_method: 'Courier',
          product_name: 'Computer.',
          product_category: 'Electronic',
          product_profile: 'general',
          cus_name: 'Customer Name',
          cus_email: 'customer@example.com',
          cus_add1: 'Dhaka',
          cus_add2: 'Dhaka',
          cus_city: 'Dhaka',
          cus_state: 'Dhaka',
          cus_postcode: '1000',
          cus_country: 'Bangladesh',
          cus_phone: '01711111111',
          cus_fax: '01711111111',
          ship_name: 'Customer Name',
          ship_add1: 'Dhaka',
          ship_add2: 'Dhaka',
          ship_city: 'Dhaka',
          ship_state: 'Dhaka',
          ship_postcode: 1000,
          ship_country: 'Bangladesh',
        };

        const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
        sslcz.init(data).then(apiResponse => {
            // Redirect the user to payment gateway
            let GatewayPageURL = apiResponse.GatewayPageURL
            res.send({url:GatewayPageURL})
            console.log('Redirecting to: ', GatewayPageURL)
        });
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(400).send("Failed to create payment or order");
    });
}


function success(req,res){
    const id=req.params.id;
    res.redirect(`http://localhost:3000/cartinvoice/${id}`)
}
function fail(req,res){
  const custId = req.params.id1;
  const billId = req.params.id2;
  customerdetails.findOne({
    where:{
      id:custId
    }
  }).then((data)=>{
    const email= data.dataValues.email;
    customerdetails.destroy({
      where:{
        id:custId
      }
    })
    cartproduct.destroy({
      where:{
        customerid:custId
      }
    })
    orderconfirmation.destroy({
     where:{
      orderid:billId
     }
    })
    totalbill.destroy({
     where:{
      customerid:custId
     }
    })
    cartpayment.destroy({
      where:{
        customerid:custId
      }
    })
    cartinvoice.destroy({
      where:{
        customerid:custId
      }
    })
    orderstate.destroy({
      where:{
        customerid:custId
      }
    }).then(() => {
      orderCancelEmail(email,billId)
      res.redirect(`http://localhost:3000/fail-payment/`)
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        status: 'error',
        message: 'An error occurred while deleting the payment information.'
      });
    });
  })

}
function findInvoicebyId(req,res){
  
  cartinvoice.findByPk(req.params.id)
  .then((bill) => {
    if (bill) {
      res.send(bill)
    } else {
      res.status(404).send('customer not found')
    }
  }).catch((err) => {
    res.status(400).send('Error fetching product')
  })
}
function findProductbyId(req,res){
  
  cartproduct.findAll({
    where: {
      invoice_id: req.params.id
    }
  }).then((cartProducts) => {
    console.log(cartProducts);
    res.send({ status: 'success', data: cartProducts });
  }).catch((error) => {
    console.error(error);
    res.json({ status: 'error', message: 'An error occurred while retrieving cart products.' });
  });
  
}

function findPaymentInfo(req, res) {
  paymentinfo.findAll({
    order: [['updatedAt', 'DESC']]
  }).then((orders) => {
    res.send(orders)
  }).catch((err) => {
    console.error(err);
    res.status(500).json({ // Set HTTP status code to 500
      status: 'error', // Set status to error
      message: 'An error occurred while retrieving payment information.' // Set error message
    });
  })
}

function updatePaymentStatus(req,res){
    paymentinfo.update({status:'Not delivered'},{
      where:{
        id:req.params.id,
        status:'pending'}
    })
    orderstate.update({status:'Not delivered'},{
      where:{
        id:req.params.id,
        status:'pending'
      }
    }).then((res)=>{
      res.status(200).send({
        status:"Success"
      })
    })
 .catch((err)=>{
    console.error(err);
    res.status(500).json({ // Set HTTP status code to 500
      status: 'error', // Set status to error
      message: 'An error occurred while retrieving payment information.' // Set error message
    });
  })
}

function findjobs(req,res){
  orderstate.findAll(
    {
      where:{status:'Not delivered'}
    }
  ).then((orders) => {
    res.send(orders)
  }).catch((err) => {
    console.error(err);
    res.status(500).json({ // Set HTTP status code to 500
      status: 'error', // Set status to error
      message: 'An error occurred while retrieving payment information.' // Set error message
    });
  })
}

function findCartPaymentInfo(req,res){
  cartpayment.findAll()
  .then((infos)=>{
    res.send(infos);
  }).catch((err)=>{
    console.error(err);
    res.status(500).json({ // Set HTTP status code to 500
      status: 'error', // Set status to error
      message: 'An error occurred while retrieving payment information.' // Set error message
    });
  })
}

function updateToCartPymentStatus(req,res){
  cartpayment.update({status:'Not delivered'},{
    where:{
      invoice_id:req.params.id,
      status:'pending'}
    })
  cartinvoice.update({status:'Not delivered'},{
    where:{
      invoice_id:req.params.id,
      status:'pending'}
  })
  .then(()=>{
    console.log("success");
  }).catch((err)=>{
    console.error(err);
    res.status(500).json({ // Set HTTP status code to 500
      status: 'error', // Set status to error
      message: 'An error occurred while retrieving payment information.' // Set error message
    });
  })
}

function singleproductnetpay(req,res){
  paymentinfo.sum('netpay')
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
function multiproductnetpay(req,res){
  cartpayment.sum('netpay')
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
function getorderconfirmation (req,res){
  orderconfirmation.findByPk(req.params.id).then((product)=>{
    res.send(product)
  }).catch((err)=>{
    res.status(404).send('Not Found User')
    console.error(err);
  })
}
function findcartpaymentinfobyid(req,res){
  cartpayment.findAll({
    where:{
      bill_id:req.params.id
    }
  }).then((data)=>{
    res.send(JSON.stringify(data));
  }).catch((err)=>{
    res.status(404).send('Not Found User')
    console.error(err);
  })
}
function deleteorder(req,res){
  const custId = req.params.id1;
  const billId = req.params.id2;
  
  customerdetails.findOne({
    where:{
      id:custId
    }
  }).then((data)=>{
    const email= data.dataValues.email;
    customerdetails.destroy({
      where:{
        id:custId
      }
    })
    customerorder.destroy({
      where:{
        id:custId
      }
    })
    orderconfirmation.destroy({
     where:{
      orderid:billId
     }
    })
    totalbill.destroy({
     where:{
      customerid:custId
     }
    })
    paymentinfo.destroy({
      where:{
        customerid:custId
      }
    })
    orderstate.destroy({
      where:{
        customerid:custId
      }
    }).then(() => {
      orderCancelEmail(email,billId)
      res.status(200).json({
        status: 'success',
        message: 'Payment information deleted successfully.'
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        status: 'error',
        message: 'An error occurred while deleting the payment information.'
      });
    });
  })
 

}

function deletecartorder(req,res){
  const custId = req.params.id1;
  const billId = req.params.id2;
  customerdetails.findOne({
    where:{
      id:custId
    }
  }).then((data)=>{
    const email= data.dataValues.email;
    customerdetails.destroy({
      where:{
        id:custId
      }
    })
    cartproduct.destroy({
      where:{
        customerid:custId
      }
    })
    orderconfirmation.destroy({
     where:{
      orderid:billId
     }
    })
    totalbill.destroy({
     where:{
      customerid:custId
     }
    })
    cartpayment.destroy({
      where:{
        customerid:custId
      }
    })
    cartinvoice.destroy({
      where:{
        customerid:custId
      }
    })
    orderstate.destroy({
      where:{
        customerid:custId
      }
    }).then(() => {
      orderCancelEmail(email,billId)
      res.status(200).json({
        status: 'success',
        message: 'Payment information deleted successfully.'
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        status: 'error',
        message: 'An error occurred while deleting the payment information.'
      });
    });
  })

}
module.exports = {
  customerinsert,
  orderfindbyid,
  paymentInfo,
  customerfindbyid,
  cartproductinsert,
  cartPaymentInfo,
  findInvoicebyId,
  findProductbyId,
  findPaymentInfo,
  updatePaymentStatus,
  findjobs,
  findCartPaymentInfo,
  updateToCartPymentStatus,
  singleproductnetpay,
  multiproductnetpay,
  findpaymentinfobyid,
  findorderedProductbyId,
  getorderconfirmation,
  findcartpaymentinfobyid,
  deleteorder,
  deletecartorder,
  success,
  fail
}