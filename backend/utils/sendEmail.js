import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER, // e.g., your-email@gmail.com
    pass: process.env.EMAIL_PASS, // Google Account App Password (16 letters)
  },
});

export async function sendOtpEmail(email, otp) {
  const mailOptions = {
    from: `"Memos Support" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Your Memos Account Verification Code',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 480px; margin: auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #0f172a; color: #f8fafc;">
        <h2 style="color: #818cf8; text-align: center; margin-bottom: 8px;">Memos Verification</h2>
        <p style="text-align: center; color: #94a3b8; font-size: 14px;">Use the code below to complete your registration.</p>
        <div style="background: #1e293b; border-radius: 8px; padding: 16px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 6px; color: #38bdf8; margin: 24px 0;">
          ${otp}
        </div>
        <p style="color: #64748b; font-size: 12px; text-align: center;">This code will expire in 10 minutes. If you didn't request this, ignore this email.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}