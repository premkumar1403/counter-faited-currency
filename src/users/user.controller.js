const userModel = require('./user.model')
const bcrypt = require("bcrypt")


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
    Verify: async (req,res) => {
        const { image } = req.body;
        try {
            
        } catch (error) {
            
        }
    }
}
module.exports = userController;