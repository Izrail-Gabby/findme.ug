// frontend/src/services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://findme-ug.onrender.com', // ← we’ll create this in 5 min
  // fallback for local testing
  // baseURL: 'http://localhost:5000/api',
});

export const searchWorkers = (service, area) => 
  API.get('/workers', { params: { service, area } });
