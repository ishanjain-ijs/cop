const router = require("express").Router();
const db = require('../models/index')
const User = db.users
// const Form = require('../models/forms')
const Form = db.forms
// const bcrypt = require("bcrypt");
const jwt_decode = require('jwt-decode');
const getAllForms = async (req, res, next) => {
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
    const user_id = req.params.id
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
      user_id,
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
// module.exports.createForm = async (userId, form) => {
//     try {
//         const form = await Form.create({
//             PONo: form.PONo,
//             legalEntity: form.legalEntity,
//             GST: form.GST,
//             MSME: form.MSME,
//             SEZ: form.SEZ,
//             bAddress: form.bAddress,
//             sAddress: form.sAddress,
//             PMName: form.PMName,
//             PMEmail: form.PMEmail,
//             PMPhoneNo: form.PMPhoneNo,
//             FTName: form.FTName,
//             FTEmail: form.FTEmail,
//             FTPhoneNo: form.FTPhoneNo,
//             userId: userId
//         });
//         console.log(">> Created form: " + JSON.stringify(comment, null, 4));
//         return form;
//     } catch (err) {
//         console.log(">> Error while creating form: ", err);
//     }
//   };

module.exports = {
  //   getAll,
  getAllForms,
  createForm,
};
