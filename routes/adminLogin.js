const express = require('express');
const router = express.Router();
const adminLogin = require('../adminpanel/adminLogin');

router.route('/')
    .get(adminLogin.getLogin);

router.route('/redirect') 
    .get(adminLogin.getRedirect)

module.exports = router;