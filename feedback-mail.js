const nodemailer = require('nodemailer');
require('dotenv').config

async function sendEmail(emailData) {
  // Create a transporter using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'Gmail', // e.g., 'Gmail'
    port : 465,
    secure : true,
    logger : true,
    debug : true,
    secureConnection : false,
    auth: {
      user: process.env.SENDER_MAIL,
      pass: process.env.APP_PASSWORD
    },
    tls : {
        rejectUnauthorized : true,
    }
  });

  // Email content and configuration
  let mailOptions = {
    from: process.env.SENDER_MAIL,
    to: emailData.to,
    subject: 'Thank you for your feedback',
    text: 'thanks for providing the valuable feedback on the website of Ratnakar portfolio.',
  };

  try {
    // Send the email
    let info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    return true;
  } catch (err) {
    console.error('Error sending email:', err);
    return false;
  }
}

module.exports = sendEmail;