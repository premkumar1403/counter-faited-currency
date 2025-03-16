const express = require("express");
const dotenv = require("dotenv");
const dbConn = require('./config/database.config');
const user = require("./src/users/user.routes")
const cookieParser = require("cookie-parser");
const app = express();
app.use(cookieParser());


app.use(express.json());
dotenv.config();
const Port = process.env.PORT || 5000;


app.use("/api/v1/users", user);


app.listen(Port, () => {
    console.log("server running successfully!".blue,`${Port}`.blue);
});