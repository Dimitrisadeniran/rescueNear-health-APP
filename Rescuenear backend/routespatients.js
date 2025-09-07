// routespatients.js
const express = require('express');
const router = express.Router();

// Temporary inline patient controller
const patientController = {
    signup: (req, res) => res.json({ message: 'Patient signup successful!' }),
    getAll: (req, res) => res.json({ patients: [] }),
};

router.post('/signup', patientController.signup);
router.get('/', patientController.getAll);

module.exports = router;

