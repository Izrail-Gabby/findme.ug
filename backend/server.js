// backend/server.js - FindMe.ug Backend
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Basic route
app.get('/', (req, res) => {
  res.json({
    message: 'FindMe.ug API is running!',
    status: 'success',
    version: '1.0.0',
    city: 'Kampala'
  });
});

// Routes will be added here later
// app.use('/api/workers', require('./routes/workerRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`FindMe.ug backend running on port ${PORT} 🚀`);
});
