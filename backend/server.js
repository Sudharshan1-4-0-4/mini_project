const path = require('path');


const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
   service : 'gmail',
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "siddumsn1@gmail.com",
    pass: "ecdn dobk dvff shey",
  },
});


  
const sendConfirmationEmail = (to, userName, jobName) => {
  const mailOptions = {
    from: 'siddumsn1@gmail.com', // sender address
    to: to,                       // list of receivers
    subject: 'Job Application Confirmation',
    text: `Hello ${userName},\n\nYou have successfully applied for the job: ${jobName}.\n\nThank you for using our platform.\n\nBest regards,\nJobby-Platform Team`
  };

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
     return console.log(error);
   }
   console.log('Email sent: ' + info.response);
  });
};



module.exports = sendConfirmationEmail;




