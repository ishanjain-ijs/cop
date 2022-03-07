const express = require("express");
const router = express.Router();
const handleNewUser = require('./registerController');

router.route('/')
    .post(handleNewUser);


module.exports = router;
