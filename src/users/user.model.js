const db = require("../../config/database.config")
const colors=require("colors")
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken")
const userModal = {
    signupModal: (name,email,password) => {
        const query = `INSERT INTO credential (name,email,password) VALUES (?,?,?)`;
        const values = [name, email, password];
         return new Promise((resolve, reject) => {
             db.query(query, values, (error,result) => {
                 if (error) {
                     console.log("Error creating a user",error.message.red);
                     reject();
                    }
                 else {
                     console.log("user creaetd successfully".yellow);
                      resolve({id:result.user_id}) 
                 }
            })
         })
    },

    generateJwt: (emil, password) => {
        const token = jwt.sign({ emil, password }, process.env.JWT_SECRET, { expiresIn: "1d" });
        return token;
    },
    
    loginModal: (email, password) => {
        const query = `SELECT email,password FROM credential WHERE email = ?`;
        return new Promise((resolve, reject) => {
            db.query(query,email, async(error,result)=> {
                if (error) {
                    console.log("error validating email:",error.message.red);
                    reject();
                }
                else if (result.length === 0) {
                    console.log("Email not found".red);
                    resolve(null)
                }
                else {
                    try {
                        const hashed_password = bcrypt.compare( password, result[0].password);
                        if (hashed_password) {
                            console.log(
                              "logged successfully:",
                              `${result[0].email}`.yellow
                            );
                            resolve(result[0]);
                        }
                    } catch (error) {
                        console.log(`Error on logging...${error.message}`.red);
                        reject(error);
                    }
                }
            })
        })
    }
}
module.exports = userModal;