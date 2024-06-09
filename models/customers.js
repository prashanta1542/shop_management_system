const sequelize = require('../connection');
const Sequelize = require('sequelize');

const customerreg = sequelize.define('customerdetail', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    // nid:{
    //     type: Sequelize.STRING,
    //     allowNull: false
    // },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    mobile: {
        type: Sequelize.STRING,
        allowNull: false
    },
    alternative_mobile: {
        type: Sequelize.STRING,
        allowNull: false
    },
    // house: {
    //     type: Sequelize.STRING,
    //     allowNull: false
    // },
    street: {
        type: Sequelize.STRING,
        allowNull: false
    },
    city: {
        type: Sequelize.STRING,
        allowNull: true
    },
    // policestation: {
    //     type: Sequelize.STRING,
    //     allowNull: false
    // },
    // postcode: {
    //     type: Sequelize.STRING,
    //     allowNull: false
    // },
    // postoffice: {
    //     type: Sequelize.STRING,
    //     allowNull: false
    // },
    
});

const customerorder = sequelize.define('customerorders', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    productid: {
        type: Sequelize.STRING,
        allowNull: false
    },
    productname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.STRING,
        allowNull: false
    },
    quantity: {
        type: Sequelize.STRING,
        allowNull: false
    },
    totalprice: {
        type: Sequelize.STRING,
        allowNull: false
    },
});

const customernetpay = sequelize.define('totalbill', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    customerid: {
        type: Sequelize.STRING,
        allowNull: false
    },
    netpay: {
        type: Sequelize.STRING,
        allowNull: false
    },
});

const paymentinfo = sequelize.define('paymentinfo', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    customerid: {
        type: Sequelize.STRING,
        allowNull: false
    },
    netpay: {
        type: Sequelize.STRING,
        allowNull: false
    },
    paymeenttype: {
        type: Sequelize.STRING,
        allowNull: false
    },
    bakshnumber: {
        type: Sequelize.STRING,
        allowNull: false
    },
    trxid: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false
    },
    

});

const orderstate = sequelize.define('orderstate', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    customerid: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false
    },

});

const cartProduct = sequelize.define('cartproduct',{
    bill_id:{
        type: Sequelize.STRING,
        primaryKey: true,
    },
    customerid: {
        type: Sequelize.STRING,
        allowNull: false
    },
    productid: {
        type: Sequelize.STRING,
        allowNull: false
    },
    productname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.STRING,
        allowNull: false
    },
    quantity: {
        type: Sequelize.STRING,
        allowNull: false
    },
    totalprice: {
        type: Sequelize.STRING,
        allowNull: false
    },
    invoice_id:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

const cart_payment_info= sequelize.define('cart_payment',{
    invoice_id:{
        type: Sequelize.STRING,
        primaryKey: true,
    },
    bill_id:{
        type: Sequelize.STRING,
        primaryKey: true,
    },
    customerid: {
        type: Sequelize.STRING,
        allowNull: false
    },
    netpay: {
        type: Sequelize.STRING,
        allowNull: false
    },
    paymeenttype: {
        type: Sequelize.STRING,
        allowNull: false
    },
    bakshnumber: {
        type: Sequelize.STRING,
        allowNull: false
    },
    trxid: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false
    },
    
})

const cart_invoice=sequelize.define('cartinvoice',{
    bill_id: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    invoice_id: {
        type: Sequelize.STRING,
        allowNull: false
    },
    customerid: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false
    },
})

const ordercon=sequelize.define('orderconfirmation',{
    orderid:{
        type: Sequelize.STRING,
        primaryKey: true,
    },
    otp:{
        type: Sequelize.STRING,
        allowNull: false
    }
})
function customermodelsync(req, res) {
    sequelize.sync({alter:true})
        .then(() => {
            res.send('Customer table created successfully');
        })
        .catch((error) => {
            res.send('Error occurred');
            console.error('Unable to create customer table:', error);
        });
}


module.exports={
    customerreg,
    customerorder,
    customernetpay,
    paymentinfo,
    orderstate,
    cartProduct,
    cart_payment_info,
    cart_invoice,
    customermodelsync,
    ordercon,
}

