const sequelize = require('../connection');
const Sequelize = require('sequelize');


const Product = sequelize.define('product', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    catagory:{
        type: Sequelize.STRING,
        allowNull: false
    },
    productName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    productDetail: {
        type: Sequelize.STRING,
        allowNull: false
    },
    size:{
        type: Sequelize.STRING,
        allowNull: false
    },
    color:{
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    photo: {
        type: Sequelize.STRING,
        allowNull: true
    }
});
 
const catagory=sequelize.define('catagorie',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    catagory:{
     type: Sequelize.STRING,
     allowNull: false
    }
 });

function productmodesync(req, res) {
    sequelize.sync({alter:true})
        .then(() => {
            res.send('Product table created successfully');
        })
        .catch((error) => {
            res.send('Error occurred');
            console.error('Unable to create product table:', error);
        });
}

module.exports = {
    productmodesync,
    catagory,
    Product
};
