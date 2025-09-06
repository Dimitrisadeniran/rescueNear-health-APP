const express = require('express');
const router = express.Router();
const authController = require('./controllersauthcontrollers');

router.post('/signup', authController.signup);
// add login, verify OTP routes here

module.exports = router;
