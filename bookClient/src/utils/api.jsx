// client/src/utils/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://backendfolder-ijfx.onrender.com/api' // Replace with your backend URL
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
