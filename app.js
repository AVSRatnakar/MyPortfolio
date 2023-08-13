const express = require('express');
const sendEmail = require('./response-mail'); // Import the sendEmail function
const receiveMail = require('./feedback-mail'); // Import the receiveMail function
const app = express();
const port = 3000;
require('dotenv').config

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('./public'))

app.get('/', (req, res) => {
  res.send('Welcome to the email sender!');
});

// Endpoint to send an email
app.post('/send-email', async (req, res) => {
  const emailData = req.body;
  const emailSent = await sendEmail(emailData);
  const feedbackmail = await receiveMail(emailData);

  if (feedbackmail) {
    // res.send({ success: true, message: 'Email sent successfully!' });
    console.log("Email sent successfully")
  } else {
    // res.status(500).json({ success: false, message: 'Failed to send email.' });
    console.log("Failed to sent feedback mail.")
  }
  if (emailSent) {
    res.send({ success: true, message: 'Email sent successfully!' });
  } else {
    res.status(500).json({ success: false, message: 'Failed to send email.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});