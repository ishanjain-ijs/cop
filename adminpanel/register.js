const express = require("express");
const router = express.Router();
const registerController = require("./registerController");
// const config = {
//     headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`
//     } 
// }
  

router.post("/", registerController.handleNewUser);

module.exports = router;
