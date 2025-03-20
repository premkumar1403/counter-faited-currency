const userModel = require('./user.model')
const bcrypt = require("bcrypt")
const axios =require("axios")
const fs = require("fs")

const userController = {

    //user signup
    Signup: async (req, res) => {
        const { name, email, password } = req.body;
        const hashed_password = await bcrypt.hash(password, 10);
        try {
             const response = await userModel.signupModal(
               name,
               email,
               hashed_password
            );
            const token = userModel.generateJwt(email, password);
            res.cookie("Token", token, { httpOnly: true, maxAge: 3600 * 60 });
            res.status(201).json({ message: "user created successfully!",token});
        } catch (error) {
           console.log("Error creating a user",error);
           res.status(400).json({message:"bad request"})
        }
    },
    
    //user login
    Login: async (req,res) => {
        const { email, password } = req.body;
        const hashed_password = await bcrypt.hash(password, 10);
        try {
            const response = await userModel.loginModal(email, hashed_password);
            const token = userModel.generateJwt(email.password);
            res.cookie("Token", token, { httpOnly: true, maxAge: 3600 * 60 });
            res.status(200).json({ message: "user loggedin successfully", user: response, token });
           
        } catch (error) {
            console.log("Error loging in user");
            res.status(400).json({ message: "Error loging in user" });
        }
    },

    //user logout
    Logout: async (req, res) => {
        res.cookie("Token", " ", { httpOnly: true });
        res.status(200).json({ message: "Loggedout successfully" });
        console.log("Loggedout successfully".yellow);
        
    },


    //verify wheather a currency is counterfaited or not
  Verify: async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      // Read the file as binary data
      const filePath = req.file.path;
      const image = await fs.promises.readFile(filePath); // Read the image file as binary content

      // Create a form-data to send as 'multipart/form-data'
      const FormData = require('form-data');
      const formData = new FormData();
      formData.append('image', image, {
        filename: req.file.originalname,
        contentType: req.file.mimetype,
      });

      // Send the image to the FastAPI server for evaluation
      const response = await axios.post(
        "http://127.0.0.1:8000/evaluate",
        formData,
        { 
          headers: {
            ...formData.getHeaders(), // Include multipart/form-data headers
          },
        }
      );

      // Return the FastAPI response back to the client
      res.json(response.data);
      console.log(response.data.prediction);
      
    } catch (error) {
      console.error("Error in Express server:", error);
      res.status(500).json({ message: "Error evaluating image", error });
    }
  }
}
module.exports = userController;