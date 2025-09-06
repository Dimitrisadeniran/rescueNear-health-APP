// routes/patients.js
const express = require('express');
const router = express.Router();
const { getPatients, addPatient } = require('../controllers/patientController');

// GET /api/patients
router.get('/', getPatients);

// POST /api/patients
router.post('/', addPatient);

module.exports = router;

