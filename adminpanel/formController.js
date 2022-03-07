const db = require('../models/index')
const User = db.users
// const Form = require('../models/forms')
const Form = db.forms


const getAllForms = async (req,res,next) =>{
  try{
    const form = await Form.findAll({
      include:[{
        model: User,
        attributes: ['username']
      }]
    });
    res.send({
      status: 'success',
      data: form
    });
  } catch (error){
      next(error);
  }
}

module.exports = {
    // updateUser,
    getAllForms
    // deleteForm
};