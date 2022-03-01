const router = require("express").Router();
const db = require('../models/index')
const multer = require('multer')
const User = db.users
// const Form = require('../models/forms')
const Form = db.forms
const path = require('path')

const jwt_decode = require('jwt-decode');
const getAllForms = async (req, res, next) => {
  // var token = req.headers.authorization.split(" ")[1];
  
  // var decode = jwt_decode(token);
  try {
    const form = await Form.findAll({
      include:[{
        model: User,
        attributes: ['username']
      }]
    });
    res.send({
      status: "success",
      data: form,
    });
  } catch (error) {
    next(error);
  }
};

const createForm = async (req, res, next) => {
  var token = req.headers.authorization.split(" ")[1];
  
  var decode = jwt_decode(token);
  try {
    const {
      PONo,
      legalEntity,
      GST,
      MSME,
      SEZ,
      bAddress,
      sAddress,
      PMName,
      PMEmail,
      PMPhoneNo,
      FTName,
      FTEmail,
      FTPhoneNo
    } = req.body;
    const image = req.file.path;
    const user_id = decode.userid
    const dataCreate = {
      PONo,
      legalEntity,
      GST,
      image,
      MSME,
      SEZ,
      bAddress,
      sAddress,
      PMName,
      PMEmail,
      PMPhoneNo,
      FTName,
      FTEmail,
      FTPhoneNo,
      user_id,
      image
    };
    const createForm = await Form.create(dataCreate);
    if (!createForm) {
      res.send(
        {
          status: "error",
          message: "Form failed",
        },
        500
      );
    }
    res.send({
      status: "success",
      data: {createForm, decode}
    });
  } catch (error) {
    next(error);
  }
};


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'Images')
  },
  filename: (req, file, cb) => {
      cb(null, file.originalname)
  }
})

const upload = multer({
  storage: storage,
  limits: { fileSize: '1000000' },
  fileFilter: (req, file, cb) => {
      const fileTypes = /jpeg|jpg|png|pdf/
      const mimeType = fileTypes.test(file.mimetype)  
      const extname = fileTypes.test(path.extname(file.originalname))

      if(mimeType && extname) {
          return cb(null, true)
      }
      cb('Give proper files formate to upload')
  }
}).single('image')





module.exports = {
  //   getAll,
  getAllForms,
  createForm,
  upload
};
