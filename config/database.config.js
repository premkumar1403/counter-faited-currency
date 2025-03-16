
const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();

const dbConn = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  port: process.env.PORT,
};
const pool = mysql.createPool({
  connectionLimit: 10,
  host: dbConn.host,
  user: dbConn.user,
  password: dbConn.password,
  database: dbConn.database,
  port: dbConn.port,
});

pool.getConnection((err, connection) => {
  if (err) {
    console.log("Error connecting to database:".red, err.red);
    return;
  }
  console.log("Database connected successfully!".blue);
  connection.release();
});

pool.on("error", (err) => {
  console.log("Database connection error:".red, err.red);
});

module.exports = pool;
