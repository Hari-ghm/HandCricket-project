import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const sendOtpEmail = async (to: string, otp: string) => {
  
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // e.g., your-email@gmail.com
      pass: process.env.EMAIL_PASS, // App password (not your login password)
    },
  });
  
  const mailOptions = {
    from: `"Your App" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Your OTP Code",
    html: `<p>Your OTP code for sign up is: <strong>${otp}</strong></p>`,
  };
  
  await transporter.sendMail(mailOptions);
};
