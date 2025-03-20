const express = require("express")
const router = express.Router();
const userController = require("./user.controller");
const upload=require("../middleware/multer.config")

//signup route
router.post("/signup", userController.Signup);

//login route
router.post('/login', userController.Login);

//logout route
router.get("/logout",userController.Logout)

//deep learnig path
router.post("/verify", upload.single("file"), userController.Verify);

module.exports = router;