const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_AUTH,
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function mailAuthenticatior(email) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: email, // sender address
    to: "kumarprem75715@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

mailAuthenticatior().catch(console.error);


module.exports = mailAuthenticatior;