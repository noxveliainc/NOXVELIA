import axios from 'axios';

const api = axios.create({
  // Voltámos a colocar o /api no fim, para casar com o novo server.js!
  baseURL: import.meta.env.VITE_API_URL || 'https://noxvelia.onrender.com/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('@App:token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;