const nodemailer = require('nodemailer')
require('dotenv').config();

const EMAIL = process.env.EMAIL
const PASS = process.env.EMAIL_PASS


function sendEmail(toAddress, message){

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
    }
});
  
  const mailOptions = {
    from: 'The Idea project',
    to: toAddress,
    subject: 'Sending Email using Node.js',
    text: message
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

module.exports = sendEmail
  