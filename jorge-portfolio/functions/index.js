const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const nodemailer = require("nodemailer");

// Gmail Transporter Setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "jorgedaluzon5@gmail.com",
    pass: "krkq frya kjen yelk", // Replace with your Google App Password
  },
});

exports.sendEmailOnNewMessage = onDocumentCreated("messages/{docId}", async (event) => {
  const snapshot = event.data;
  if (!snapshot) return;

  const data = snapshot.data();

  const mailOptions = {
    from: "Portfolio Contact <jorgedaluzon5@gmail.com>",
    to: "jorgedaluzon5@gmail.com",
    subject: `New Portfolio Message from ${data.name}`,
    html: `
      <h3>New Portfolio Contact Submission</h3>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Message:</strong></p>
      <p>${data.message}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
  }
});