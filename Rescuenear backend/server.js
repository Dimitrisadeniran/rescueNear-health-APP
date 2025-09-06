require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const authRoutes = require('./routes/auth');
const patientRoutes = require('./routes/patient');
const paymentRoutes = require('./routes/payment');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser:true, useUnifiedTopology:true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// Serve frontend
app.use(express.static(path.join(__dirname, '../frontend/html')));

// API routes
app.use('/api', authRoutes);
app.use('/api/patient', patientRoutes);
app.use('/api/payment', paymentRoutes);

// Catch-all for frontend
app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname, '../frontend/html/index.html'));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
