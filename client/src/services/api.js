import axios from 'axios';
import { clearAuth, getAuthToken } from '../utils/authSession';

const api = axios.create({
  // Voltámos a colocar o /api no fim, para casar com o novo server.js!
  baseURL: import.meta.env.VITE_API_URL || 'https://noxvelia.onrender.com/api',
});

api.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && getAuthToken()) {
      clearAuth();
      window.dispatchEvent(new Event('noxvelia:auth-expired'));
    }
    return Promise.reject(error);
  },
);

export default api;
