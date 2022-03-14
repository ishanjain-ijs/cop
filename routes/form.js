const express = require('express');
const router = express.Router();
const formController = require('../controllers/formController');
// const upload = require('../middleware/upload')
const verifyJWT = require('../middleware/verifyJWT')
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

// router.route('/')
//     .get(formController.getAll)
    
router.route('/')
    .get(formController.getAllForms)

router.route('/')
    .post(verifyJWT , formController.upload.fields([{ name: 'PONo_doc', maxCount: 1 }, { name: 'GST_doc', maxCount: 1 }, { name: 'MSME_doc', maxCount: 1 }, { name: 'SEZ_doc', maxCount: 1 }]) ,formController.createForm)

router.route('/:id')
    .delete( formController.deleteForm),
router.route('/update/:id')
    .put( verifyJWT,formController.upload.fields([{ name: 'PONo_doc', maxCount: 1 }, { name: 'GST_doc', maxCount: 1 }, { name: 'MSME_doc', maxCount: 1 }, { name: 'SEZ_doc', maxCount: 1 }]) ,formController.updateForm)

module.exports = router;