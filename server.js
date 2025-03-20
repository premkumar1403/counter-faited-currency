const express = require("express");
const dotenv = require("dotenv");
const dbConn = require('./config/database.config');
const user = require("./src/users/user.routes")
const cookieParser = require("cookie-parser");
const upload = require("./src/middleware/multer.config")
const app = express();
app.use(cookieParser());

dotenv.config();
app.use(express.json());
// Increase request body size limit (important for handling larger uploads)
// app.use(express.json({ limit: '100mb' }));
// app.use(express.urlencoded({ limit: '100mb', extended: true }));
// app.use("/uploads", express.static("uploads"));

const Port = process.env.PORT || 5000;


app.use("/api/v1/users", user);

// app.post("/data", upload.single("file"), async (req, res) => {
//     console.log(req.file.path);
    
//      try {
//          const response = await cloudinary.uploader.upload(req.file.path,{
//         folder:"prem"
//          })
//          res.json(response.secure_url);
         
//      } catch (error) {
//         console.log("error:",error);
        
//      }
// })

app.listen(Port, () => {
    console.log("server running successfully!".blue,`${Port}`.blue);
});