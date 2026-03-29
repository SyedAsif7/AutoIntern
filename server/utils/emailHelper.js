import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail', // or your email provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmail = async (to, subject, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"AutoIntern" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });
    console.log('Email sent: %s', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

export const getWelcomeEmailTemplate = (name) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
    <h1 style="color: #6366f1;">Welcome to AutoIntern, ${name}!</h1>
    <p>We're thrilled to have you on board. AutoIntern is designed to help you find the best internships and gain the skills you need to succeed.</p>
    <p>Next steps:</p>
    <ul>
      <li><a href="${process.env.CLIENT_URL}/onboarding">Complete your profile</a></li>
      <li><a href="${process.env.CLIENT_URL}/courses">Browse certification courses</a></li>
    </ul>
    <p>Happy learning!<br>The AutoIntern Team</p>
  </div>
`;

export const getDailyReminderTemplate = (name, streak) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
    <h1 style="color: #f59e0b;">Don't break your streak, ${name}! 🔥</h1>
    <p>You haven't logged any learning today. Keep your ${streak}-day streak alive!</p>
    <div style="text-align: center; margin-top: 20px;">
      <a href="${process.env.CLIENT_URL}/dashboard" style="background-color: #6366f1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Continue Learning</a>
    </div>
  </div>
`;
