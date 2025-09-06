// server.js
require('dotenv').config();
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

// API routes (always put BEFORE frontend catch-all)
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

// Serve frontend
const frontendPath = path.join(__dirname, 'frontend');
app.use(express.static(frontendPath));

// Catch-all route to serve frontend index.html for non-API routes
app.get('*', (req, res) => {
    if (req.path.startsWith('/api')) {
        // Prevent API routes from being caught by frontend catch-all
        return res.status(404).send({ message: 'API route not found' });
    }
    res.sendFile(path.join(frontendPath, 'index.html'));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
