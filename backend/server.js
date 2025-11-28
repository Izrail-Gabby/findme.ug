// backend/server.js - FINAL VERSION
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Welcome route
app.get('/', (req, res) => {
  res.json({
    message: 'FindMe.ug API is LIVE!',
    status: 'success',
    version: '1.0.0',
    city: 'Kampala',
    time: new Date().toLocaleString('en-UG')
  });
});

// API Routes
app.use('/api/workers', require('./routes/workerRoutes'));

// Handle undefined routes
app.use('*', (req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`FindMe.ug backend running on port ${PORT} (Kampala time)`);
});
