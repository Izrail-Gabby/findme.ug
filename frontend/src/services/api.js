// frontend/src/services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://findme-ug.onrender.com/api',  // Your live backend!
});

export const searchWorkers = (service, area) => 
  API.get('/workers', { params: { service, area } });
