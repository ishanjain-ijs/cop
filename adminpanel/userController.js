// const router = require("express").Router();
const db = require('../models/index')
const User = db.users
// const Form = require('../models/forms')
const Form = db.forms
// const bcrypt = require("bcrypt");
// const updateUser =  async (req, res) => {

// }

const getAllUsers = async (req,res,next) =>{
  try{
    const user = await User.findAll({
      attributes:['username'],
      include:[{
        model: Form,
      }]
    });
    res.send({
      status: 'success',
      data: user
    });
  } catch (error){
      next(error);
  }
}

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const findUserById = await User.findByPk(id);
    if (!findUserById) {
      res.status(404).json("User not found!");
    }
    const deleteUser = findUserById.destroy();
    if (!deleteUser) {
      res.status(503).send({
        status: "error",
        message: `user with id ${id} failed to delete`,
      });
    }
    res.status(200).send({
      status: "success",
      message: `user with id ${id} deleted`,
    });
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const findUserById = await User.findByPk(id);
    if (!findUserById) {
      res.send({
        status: "error",
        message: `user with id ${id} not found`,
      });
    }
    res.send({
      status: "success",
      data: findUserById,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  // updateUser,
  getAllUsers,
  deleteUser,
  getUser,
};
