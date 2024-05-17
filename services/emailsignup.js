const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "josemesamarin@gmail.com",
    pass: "butd bfol zojs kcaq",
  },
});

const sendEmail = async (to, subject, html) => {
  try {
    const mailOptions = {
      from: "josemesamarin@gmail.com",
      to: to,
      subject: subject,
      html: html,
    };
    await transporter.sendMail(mailOptions);
    console.log("mensaje enviado");
  } catch (error) {
    console.error("error al enviar el mensaje", error.message);
  }
};

module.exports = sendEmail;
