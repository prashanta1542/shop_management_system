const product =require('../models/product').Product;
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const { create } = require('domain');
const catagory=require('../models/product').catagory;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext);
}});

const fileFilter = function (req, file, cb) {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
  if (!allowedTypes.includes(file.mimetype)) {
    const error = new Error("Wrong file type");
    error.code = "LIMIT_FILE_TYPES";
    return cb(error, false);
  }
  cb(null, true);
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1000000 } // 1 MB
});

function insertProduct(req, res) {
  upload.single('image')(req, res, function (err) {
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
      const { catagory,pname, pdetails, price, quantity,color,size } = req.body
      const filename = req.file.filename
      const randomBytes = crypto.randomBytes(8).toString('hex')
      product.create({
        id:randomBytes,
        catagory:catagory,
        productName: pname,
        productDetail: pdetails,
        price: price,
        color:color,
        size:size,
        quantity: quantity,
        photo: filename,
      }).then((product) => {
        res.send(product);
        console.log(filename)
      }).catch((err) => {
        console.error('Error creating product:', err)
        res.status(400).send('Error creating product')
      })
    }
  })
}

function selectAllProducts(req, res) {
  product.findAll()
    .then((products) => {
      res.send(products)
    }).catch((err) => {
      console.error('Error fetching products:', err)
      res.status(400).send('Error fetching products')
    })
}

function selectProductById(req, res) {
  const id = req.params.id;
  product.findByPk(id)
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

function DeleteProductById(req,res){
  const pid=req.params.id;
  product.destroy({
    where:{
      id:pid
    }
  }).then(()=>{
    res.status(200).send('Product Successfully Delete')
  }).catch((err)=>{
    console.error('Error to fetching product:', err)
    res.status(400).send('Failed to product delete')
  })
}

function insertintocatagory(req,res){
  catagory.create({
    catagory:req.body.catagory
  }).then(()=>{
    res.send({
      status:200,
      message:"Successfully insert data",
    })
  }).catch(err=>{
    console.error(err);
    res.send({
      status:400,
      message: "Failed to insert",
    })
  })
}

function getCatagory(req,res){
  catagory.findAll().then
  ((catagories)=>{
    res.send(catagories)
  }).catch((err)=>{
    console.error(err);
    res.send({
      status:400,
      message:"Failed to find catagory"
    })
  })
}

function getproductByCatagory(req,res){
  product.findAll({
    where:{
      catagory:req.params.id
    }
  }).then((products)=>{
    res.send(products)
  }).catch((err)=>{
    console.error(err);
  })
}

function updateProduct(req,res){
  upload.single('image')(req, res, function (err) {
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
      const { id,catagory,pname, pdetails, price, quantity } = req.body
      const filename = req.file.filename
      product.update({
        catagory:catagory,
        productName: pname,
        productDetail: pdetails,
        price: price,
        quantity: quantity,
        photo: filename,
      },{
        where:{
          id:id
        }
      }).then((product) => {
        res.send(product);
        console.log(filename)
      }).catch((err) => {
        console.error('Error creating product:', err)
        res.status(400).send('Error creating product')
      })
    }
  })
}
module.exports={
  insertProduct,
  selectAllProducts,
  selectProductById,
  DeleteProductById,
  insertintocatagory,
  getCatagory,
  updateProduct,
  getproductByCatagory,
}