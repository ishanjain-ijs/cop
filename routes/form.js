const express = require('express');
const router = express.Router();
const formController = require('../controllers/formController');

const verifyJWT = require('../middleware/verifyJWT')
// router.route('/')
//     .get(formController.getAll)
    
router.route('/')
    .get(formController.getAllForms)

router.route('/:id')
    .post(verifyJWT ,formController.upload, formController.createForm)
//     .put( verifyJWT ,postsController.updatePost)
//     .delete(verifyJWT, postsController.deletePost);

// router.route('/:id')
//     .get(postsController.getPost);

module.exports = router;