const express = require('express')
const productmodel = require('./models/product');
const staffmodel = require('./models/staffs');
const customermodel = require('./models/customers')
const deliverymodel = require('./models/deliverymans');
const productmigrate = require('./migrations/productinsert');
const staffmigrate=require('./migrations/staffsmigrate');
const customermigrate = require('./migrations/customermigrate');
const deliverymigrate= require('./migrations/deliverymigrate');
const app = express()
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 3001

//payment method intrigrate

const SSLCommerzPayment = require('sslcommerz-lts');
const store_id = 
const store_passwd = 
const is_live = false //true for live, false for sandbox

//Payment method intrigrate
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World!')
});
app.use('/deliverymanuploades',express.static('deliverymanuploads'));
app.use('/staffuploades',express.static('staffuploads'));
app.use('/uploads', express.static('uploads'));
//path for insert product
app.get('/productdeletebyid/:id',productmigrate.DeleteProductById);
app.post('/productupdate',productmigrate.updateProduct);
app.get('/getproductbycatagory/:id',productmigrate.getproductByCatagory);
app.get('/selectcatagory',productmigrate.getCatagory);
app.post('/catagoryinsert',productmigrate.insertintocatagory);
app.post('/productinsert',productmigrate.insertProduct);
app.get('/getproduct',productmigrate.selectAllProducts);
app.get('/product/:id', productmigrate.selectProductById);
app.get('/productmigrate', productmodel.productmodesync);

//path for staffs
app.get('/findtotalcost',staffmigrate.totalcosts);
app.get('/findcost',staffmigrate.findCosts);
app.post('/costenter',staffmigrate.costInsert);
app.post('/addnewcosttype',staffmigrate.insertnewcosttype);
app.get('/fetchallcosttype',staffmigrate.getAllcostType);
app.get('/finddeliveryman',deliverymigrate.findAllDeliveryMan);
app.post('/hiredeliveryman',deliverymigrate.CreateJobs);
app.get('/changecartpaymentstatus/:id',customermigrate.updateToCartPymentStatus);
app.get('/cartpaymentinfo',customermigrate.findCartPaymentInfo);
app.get('/changestatus/:id',customermigrate.updatePaymentStatus);
app.get('/findorder',customermigrate.findPaymentInfo);
app.post('/insertnewdeliveryman',deliverymigrate.insertNewDeliveryman);
app.get('/findstaffbyid/:id',staffmigrate.findStaff);
app.post('/staffinsert',staffmigrate.staffReg);
app.post('/stafflogin',staffmigrate.staffLogin);
app.get('/deleteorder/:id1/:id2',customermigrate.deleteorder);
app.get('/deletecartorder/:id1/:id2',customermigrate.deletecartorder);
app.get('/staffmigrate',staffmodel.staffmodelsync);


//path for customer
app.get('/totalearnfrommultiproduct',customermigrate.multiproductnetpay);
app.get('/totalearnfromsingleproduct',customermigrate.singleproductnetpay);
app.post('/orderplace',customermigrate.customerinsert);
app.get('/orderfindbyid/:id',customermigrate.orderfindbyid);
app.get('/findorderedProductbyId/:id',customermigrate.findorderedProductbyId);
app.get('/findorderid/:id',customermigrate.findpaymentinfobyid);
app.post('/requestinvoice',customermigrate.paymentInfo);
app.get('/customerfindbyid/:id',customermigrate.customerfindbyid);
app.post('/cartinsert',customermigrate.cartproductinsert);
app.post('/cartpaymentInfo',customermigrate.cartPaymentInfo);
app.post('/success-confirmation/:id',customermigrate.success);
app.post('/fail-confirmation/:id1/:id2',customermigrate.fail);
app.get('/cartorderfindinvoicebyid/:id',customermigrate.findInvoicebyId);
app.get('/cartproductfindinvoicebyid/:id',customermigrate.findProductbyId);
app.get('/customermigrate',customermodel.customermodelsync);
app.get('/findcartpaymentinfobyid/:id',customermigrate.findcartpaymentinfobyid)

//path for deliveryman
app.get('/finddeliverymanbyid/:id',deliverymigrate.deliveryManById);
app.post('/deliverymanlogin',deliverymigrate.deliveryLogin);
app.get('/findjobs',deliverymigrate.Jobs);
app.get('/findjobbyid/:id',deliverymigrate.findJobById);
app.get('/findreports',deliverymigrate.findReport);
app.get('/findschedulebyid/:id',deliverymigrate.findschedulebyuserID);
app.get('/findondelivery',deliverymigrate.findAllonDelivery);
app.get('/findondeliverybyid/:id',deliverymigrate.findAllonDeliverybyid);
app.get('/deliverymigrate',deliverymodel.deliverymodelsync);
app.get('/orderconfirmation/:id',customermigrate.getorderconfirmation);
app.post('/reportinsert',deliverymigrate.makeReport);



//ssl ecommerz test
app.get('/init', (req, res) => {
    const data = {
        total_amount: 100,
        currency: 'BDT',
        tran_id: 'REF123', // use unique tran_id for each api call
        success_url: 'http://localhost:3001/success-confirmation/1020',
        fail_url: 'http://localhost:3030/fail',
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
        res.redirect(GatewayPageURL)
        console.log('Redirecting to: ', GatewayPageURL)
    });
})
//ssl 


app.get('/success', (req, res) => {
    console.log(res.data);
})
//ssl ecommerz test

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

