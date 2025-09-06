// server.js
require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Import routes
const authRoutes = require('./routes');          
const patientRoutes = require('./routespatients'); 

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Use API routes
app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);

// MongoDB connection
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/rescuenear"; 
console.log("Mongo URI in use:", mongoURI);

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// Serve frontend files
const frontendPath = path.join(__dirname, 'frontend');
app.use(express.static(frontendPath));

// Serve index.html for all non-API routes
app.get('*', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
});

// Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

