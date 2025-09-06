// server.js
require('dotenv').config(); // Load local .env if present
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import routes
const authRoutes = require('./routes');          // adjust if different
const patientRoutes = require('./routespatients'); // adjust if different

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);

// Root route (for browser test)
app.get('/', (req, res) => {
  res.send('🚀 Rescuenear backend is running!');
});

// MongoDB connection
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/rescuenear"; 
// TEMPORARY fallback: local MongoDB if env var missing

console.log("Mongo URI in use:", mongoURI); // Debug: prints the URI being used

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// 404 handler for unknown routes
app.use((req, res) => {
  res.status(404).send('⚠️ Route not found!');
});

// Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
