const express = require('express');
const router = express.Router();
const userController = require('./userController');

// const verifyJWT = require('../middleware/verifyJWT')
router.route('/').get(userController.getAllUsers)
router.route('/:id')
    .get(userController.getUser)
    // .put(userController.updateUser)
    .delete( userController.deleteUser);
module.exports = router;