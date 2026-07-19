import axios from 'axios';
import { clearAuth, getAuthToken } from '../utils/authSession';

const isLocalApiUrl = (url = '') =>
  /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?(\/|$)/i.test(url);

export const getApiBaseURL = () => {
  const configuredUrl = import.meta.env.VITE_API_URL;

  if (import.meta.env.PROD && isLocalApiUrl(configuredUrl)) {
    return '/api';
  }

  return configuredUrl || '/api';
};

export const getSocketBaseURL = () => {
  const baseURL = getApiBaseURL().replace(/\/api\/?$/, '');
  return baseURL || window.location.origin;
};

const api = axios.create({
  // Voltámos a colocar o /api no fim, para casar com o novo server.js!
  baseURL: getApiBaseURL(),
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
