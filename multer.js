const multer = require('multer');
const path = require('path');
const storageforstaff = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'staffuploads/')
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

  const uploadstaff = multer({
    storage: storageforstaff,
    fileFilter: fileFilter,
    limits: { fileSize: 1000000 } // 1 MB
  });

  const storageforDelivery = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'deliverymanuploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const ext = path.extname(file.originalname);
      cb(null, uniqueSuffix + ext);
  }});
  
  const fileFilters = function (req, file, cb) {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
    if (!allowedTypes.includes(file.mimetype)) {
      const error = new Error("Wrong file type");
      error.code = "LIMIT_FILE_TYPES";
      return cb(error, false);
    }
    cb(null, true);
  };

  const uploadsDeliveryman = multer({
    storage: storageforDelivery,
    fileFilter: fileFilter,
    limits: { fileSize: 1000000 } // 1 MB
  });
  module.exports={
    uploadstaff,
    uploadsDeliveryman,
  }