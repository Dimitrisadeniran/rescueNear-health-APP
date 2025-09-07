// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');

// Import routes
const authRoutes = require('./routes');          
const patientRoutes = require('./routespatients'); 

const app = express();

// --------------------
// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev')); // HTTP request logging

// --------------------
// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);

// --------------------
// MongoDB Connection
const mongoURI = process.env.MONGO_URI;

if (mongoURI) {
    mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    mongoose.connection.on('connected', () => {
        console.log('✅ MongoDB connected');
    });

    mongoose.connection.on('error', (err) => {
        console.error('❌ MongoDB connection error:', err);
    });
} else {
    console.warn('⚠️ MONGO_URI not set. MongoDB is not connected. API routes that need DB will fail.');
}

// --------------------
// Serve Frontend
const frontendPath = path.join(__dirname, 'Rescuenear frontend');
app.use(express.static(frontendPath));

// Catch-all route for non-API requests
app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
        // Nonexistent API route
        return res.status(404).json({ message: 'API route not found' });
    }

    res.sendFile(path.join(frontendPath, 'index.html'), (err) => {
        if (err) {
            next(err);
        }
    });
});

// --------------------
// Global Error Handler
app.use((err, req, res, next) => {
    console.error('💥 Server error:', err);
    res.status(500).json({ message: 'Internal server error' });
});

// --------------------
// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
