// controllersauthControllers.js
const User = require('../modeluser');            // ✅ corrected path
const sendEmailOTP = require('..UtilssendemailOTP'); // ✅ corrected path

// Signup
exports.signup = async (req, res) => {
  const { email, phone } = req.body;
  if (!email || !phone) return res.json({ success: false, message: 'Missing fields' });

  const exists = await User.findOne({ phone });
  if (exists) return res.json({ success: false, message: 'Phone already registered' });

  const otp = Math.floor(1000 + Math.random() * 9000).toString();
  const user = new User({
    email,
    phone,
    otp,
    otpExpires: new Date(Date.now() + 5 * 60 * 1000),
  });
  await user.save();

  try {
    await sendEmailOTP(email, otp);
    res.json({ success: true, message: 'Signup successful! OTP sent to email.' });
  } catch (err) {
    console.error('OTP send error:', err);
    res.json({ success: false, message: 'Failed to send OTP' });
  }
};

// Login
exports.login = async (req, res) => {
  const { phone } = req.body;
  if (!phone) return res.json({ success: false, message: 'Phone required' });

  const user = await User.findOne({ phone });
  if (!user) return res.json({ success: false, message: 'User not found' });

  const otp = Math.floor(1000 + Math.random() * 9000).toString();
  user.otp = otp;
  user.otpExpires = new Date(Date.now() + 5 * 60 * 1000);
  await user.save();

  try {
    await sendEmailOTP(user.email, otp);
    res.json({ success: true, message: 'OTP sent to email.' });
  } catch (err) {
    console.error('OTP send error:', err);
    res.json({ success: false, message: 'Failed to send OTP' });
  }
};

// Verify OTP
exports.verify = async (req, res) => {
  const { phone, otp } = req.body;
  if (!phone || !otp) return res.json({ success: false, message: 'Missing fields' });

  const user = await User.findOne({ phone, otp });
  if (!user) return res.json({ success: false, message: 'Invalid OTP' });

  if (user.otpExpires < Date.now()) {
    return res.json({ success: false, message: 'OTP expired' });
  }

  // Clear OTP
  user.otp = null;
  user.otpExpires = null;
  await user.save();

  res.json({ success: true, message: 'OTP verified. Login successful!' });
};
