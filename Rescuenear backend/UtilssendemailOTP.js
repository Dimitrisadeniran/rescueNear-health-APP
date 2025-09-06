// UtilssendemailOTP.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT, 10),
  secure: process.env.EMAIL_PORT == 465, // true for 465, false for 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

if (process.env.NODE_ENV !== 'production') {
  transporter.verify((err, success) => {
    if (err) console.error('❌ SMTP error:', err);
    else console.log('✅ SMTP ready');
  });
}

async function sendEmailOTP(email, otp) {
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Your OTP Code',
    text: `Your 4-digit OTP code is: ${otp}`,
    html: `<p>Your 4-digit OTP code is: <b>${otp}</b></p>`,
  });
  console.log(`📨 OTP sent to ${email}`);
}

module.exports = sendEmailOTP;
