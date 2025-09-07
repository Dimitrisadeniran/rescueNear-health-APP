// routespatients.js
const express = require('express');
const router = express.Router();

// Temporary patient controller inline
const patientController = {
    signup: (req, res) => res.json({ message: 'Patient signup successful!' }),
    getAll: (req, res) => res.json({ patients: [] }),
};

router.post('/signup', patientController.signup);
router.get('/', patientController.getAll);

module.exports = router;

