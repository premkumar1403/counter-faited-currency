const express = require("express")
const router = express.Router();
const userController = require("./user.controller");
const userModal = require("./user.model");

//signup route
router.post("/signup", userController.Signup);

//login route
router.post('/login', userController.Login);

//logout route
router.get("/logout",userController.Logout)

//deep learnig path
router.post("/verify",userController.Verify)

module.exports = router;