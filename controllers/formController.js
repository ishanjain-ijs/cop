const router = require("express").Router();
const db = require('../models/index')
const multer = require('multer')
const User = db.users
// const Form = require('../models/forms')
const Form = db.forms
const TempForm = require('../models/tempForm')
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
  console.log(req.body)
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
    // const image = req.file.path;
    const user_id = decode.userid
    const dataCreate = {
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
      user_id
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


// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//       cb(null, 'Images')
//   },
//   filename: (req, file, cb) => {
//       cb(null, file.originalname)
//   }
// })

// const upload = multer({
//   storage: storage,
//   limits: { fileSize: '1000000' },
//   fileFilter: (req, file, cb) => {
//       const fileTypes = /jpg|png|JPG|PNG|JPEG|jpeg|pdf|PDF/
//       const mimeType = fileTypes.test(file.mimetype)  
//       const extname = fileTypes.test(path.extname(file.originalname))

//       if(mimeType && extname) {
//           return cb(null, true)
//       }
//       cb('Give proper files formate to upload')
//   }
// })

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
  // updateForm,
}