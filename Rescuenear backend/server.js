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

// --------------------
// API Routes (always before frontend catch-all)
app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);

// --------------------
// MongoDB connection (GRACEFUL fallback)
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/rescuenear";

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => {
    console.warn("⚠️ MongoDB connection failed, continuing without DB:", err.message);
});

// --------------------
// Serve frontend
const frontendPath = path.join(__dirname, 'frontend');
app.use(express.static(frontendPath));

// Catch-all route for non-API requests
app.get('*', (req, res) => {
    try {
        if (req.path.startsWith('/api')) {
            // Nonexistent API route
            return res.status(404).json({ message: 'API route not found' });
        }
        // Serve frontend index.html
        res.sendFile(path.join(frontendPath, 'index.html'));
    } catch (err) {
        console.error("Error serving frontend:", err.message);
        res.status(500).send("Internal server error");
    }
});

// --------------------
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
