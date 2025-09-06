// server.js

// For auth routes
const authRoutes = require('./routes');  // <- matches routes.js

// For patient routes
const patientRoutes = require('./routespatients');  // <- matches routespatients.js

// Use them
app.use('/api/auth', authRoutes);
app.use('/api/patient', patientRoutes);
