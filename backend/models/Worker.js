// backend/models/Worker.js
const mongoose = require('mongoose');

const WorkerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  whatsapp: {
    type: String,
    required: true
  },
  services: {
    type: [String], // e.g., ["plumbing", "electrical"]
    required: true
  },
  location: {
    type: String,
    required: true // e.g., "Ntinda, Kampala"
  },
  area: {
    type: String,
    required: true // e.g., "Ntinda", "Nakawa", "Kisaasi"
  },
  experience: {
    type: Number,
    default: 1
  },
  priceRange: {
    type: String,
    enum: ['Budget', 'Medium', 'Premium'],
    default: 'Medium'
  },
  verified: {
    type: Boolean,
    default: false
  },
  rating: {
    type: Number,
    default: 0
  },
  totalReviews: {
    type: Number,
    default: 0
  },
  photo: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Worker', WorkerSchema);
