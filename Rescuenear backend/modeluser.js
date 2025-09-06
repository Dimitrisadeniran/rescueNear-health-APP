const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: String,
  phone: String,
  otp: String,
  otpExpires: Date,
  hasPaid: { type: Boolean, default: false },
  paystackRef: String
});

module.exports = mongoose.model('User', userSchema);

