import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.GOOGLE_USER,
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
  },
});
transporter
  .verify()
  .then(() => {
    console.log("Ready to send mail");
  })
  .catch((err) => {
    console.log("Error:", err);
  });

export async function sendMail({ to, subject, text="", html }) {
  const mailOptions = {
    from: process.env.GOOGLE_USER,
    to,
    subject,
    text,
    html,
  };
  const details = await transporter.sendMail(mailOptions);
  console.log('Email server is ready to send messages');
  return "mail Sent successfully to " + to
}
