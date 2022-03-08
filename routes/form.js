const express = require('express');
const router = express.Router();
const formController = require('../controllers/formController');
// const upload = require('../middleware/upload')
const verifyJWT = require('../middleware/verifyJWT')
// router.route('/')
//     .get(formController.getAll)
    
router.route('/')
    .get(formController.getAllForms)

router.route('/')
    .post(verifyJWT , formController.createForm)

    

router.route('/:id')
    .delete( formController.deleteForm)
    // .post(verifyJWT, formController.updateForm)

module.exports = router;