const router = require("express").Router();
const db = require('../models/index')
const multer = require('multer')
const User = db.users
// const Form = require('../models/forms')
const Form = db.forms
const nodemailer = require("nodemailer");
const TempForm = require('../models/tempForm')
const path = require('path')
const fs = require('fs')
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
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'Images')
  },
  filename: (req, file, cb) => {
      cb(null, Date.now()+file.originalname)
  }
})

const upload = multer({
  storage: storage,
  limits: { fileSize: '5242880' },
  fileFilter: (req, file, cb) => {
      const fileTypes = /jpg|png|JPG|PNG|JPEG|jpeg|pdf|PDF/
      const mimeType = fileTypes.test(file.mimetype)  
      const extname = fileTypes.test(path.extname(file.originalname))

      if(mimeType && extname) {
          return cb(null, true)
      }
      cb('Give proper files formate to upload')
  }
})
const createForm = async (req, res, next) => {
  // const uploadMultiple = upload.
  var token = req.headers.authorization.split(" ")[1];
  
  var decode = jwt_decode(token);
  // console.log(req.body)
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
      FTPhoneNo,
      isConfirmed
    } = req.body;
    const PONo_doc = req.files['PONo_doc'][0].path
    const GST_doc = req.files['GST_doc'][0].path
    const MSME_doc = req.files['MSME_doc'][0].path
    const SEZ_doc = req.files['SEZ_doc'][0].path
    const user_id = decode.userid
    const dataCreate = {
      PONo,
      legalEntity,
      GST,
      PONo_doc,
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
      GST_doc,
      MSME_doc,
      SEZ_doc,
      isConfirmed
    };
    const createForm = await Form.create(dataCreate);
    res.status(201).json({ 'Success': 'created', createForm })
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.EMAIL_USERNAME,
        pass: process.env.PASSWORD,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN
      }
     });
     var tableHTML ='<table border="1" style="width:100%", >' + 
   "<tr><td>Username</td><td>" +
   decode.username + 
   "</td></tr>" +
   "<tr><td>PO Number</td><td>" + 
   PONo + 
   "</td></tr>" +
   "<tr><td>Project Manager Name</td><td>" + 
   PMName + 
   "</td></tr>" +
   "<tr><td>Finanace Manager Name</td><td>" + 
   FTName + 
  "</td></tr>" +
   "</table>";
     const mailConfigurations = {
      from: 'ishanijs1910@gmail.com',
      to: 'ishanagjain@gmail.com',
      subject: `User ${decode.username} filled the form`,
      html: tableHTML
  };
      
  transporter.sendMail(mailConfigurations, function(error, info){
      if (error) throw Error(error);
         console.log('Email Sent Successfully');
      console.log(info);
  });
  } catch (error) {
    fs.unlinkSync(req.files['PONo_doc'][0].path)
    fs.unlinkSync(req.files['GST_doc'][0].path)
    fs.unlinkSync(req.files['MSME_doc'][0].path)
    fs.unlinkSync(req.files['SEZ_doc'][0].path)

    res.status(404).json({ error: error.message })
    next(error);
  }
  
};






const deleteForm = async(req, res, next) =>{
  try {
    const { id } = req.params;
    const findFormById = await Form.findByPk(id);
    if (!findFormById) {
      res.status(404).json("Form not found!");
    }
    const deleteForm = findFormById.destroy();
    if (!deleteForm) {
      res.status(503).send({
        status: "error",
        message: `Form with id ${id} failed to delete`,
      });
    }
    res.status(200).send({
      status: "success",
      message: `Form with id ${id} deleted`,
    });
  } catch (error) {
    next(error);
  }
}
// const updateForm = async (req, res, next) => {
//   var token = req.headers.authorization.split(" ")[1];
  
//   var decode = jwt_decode(token);
//   try {
//     const {
//       PONo,
//       legalEntity,
//       GST,
//       MSME,
//       SEZ,
//       bAddress,
//       sAddress,
//       PMName,
//       PMEmail,
//       PMPhoneNo,
//       FTName,
//       FTEmail,
//       FTPhoneNo
//     } = req.body;
//     const image = req.file.path;
//     const user_id = decode.userid
//     const dataUpdate = {
//       PONo,
//       legalEntity,
//       GST,
//       image,
//       MSME,
//       SEZ,
//       bAddress,
//       sAddress,
//       PMName,
//       PMEmail,
//       PMPhoneNo,
//       FTName,
//       FTEmail,
//       FTPhoneNo,
//       user_id,
//     };
//     const id = req.params
//     const updateForm = await TempForm.create(dataUpdate, {where: {id:id}});
//     if (!updateForm) {
//       res.send(
//         {
//           status: "error",
//           message: "Form updation failed",
//         },
//         500
//       );
//     }
//     res.send({
//       status: "success",
//       data: {dataUpdate, decode}
//     });
//   await updateForm.save();
//   } catch (error) {
//     next(error);
//   }
  
// // };
// }

module.exports = {
  //   getAll,
  getAllForms,
  createForm,
  deleteForm,
  upload
}