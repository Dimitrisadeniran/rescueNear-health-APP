const express = require('express');
const router = express.Router();
const authController = require('../controllersauthControllers');

router.post('/signup', authController.signup);
// add login, verify OTP routes here

module.exports = router;
