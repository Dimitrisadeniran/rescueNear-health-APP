const User = require('../models/User');
const sendEmailOTP = require('../utils/sendEmailOTP');

exports.signup = async (req, res) => {
  const { email, phone } = req.body;
  if(!email || !phone) return res.json({success:false,message:'Missing fields'});

  const exists = await User.findOne({phone});
  if(exists) return res.json({success:false,message:'Phone already registered'});

  const otp = Math.floor(1000 + Math.random()*9000).toString();
  const user = new User({email, phone, otp, otpExpires: new Date(Date.now()+5*60*1000)});
  await user.save();

  try {
    await sendEmailOTP(email, otp);
    res.json({success:true,message:'Signup successful! OTP sent to email.'});
  } catch(err){
    console.error("OTP send error:", err);
    res.json({success:false,message:'Failed to send OTP'});
  }
};

// Add login and verify methods similarly
