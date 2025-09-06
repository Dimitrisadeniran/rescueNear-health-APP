const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  fullname: String,
  age: Number,
  location: String,
  condition: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Patient', patientSchema);
