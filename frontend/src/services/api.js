import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production' 
    ? 'https://social-media-nv2v.onrender.com/api' // Your actual deployed backend URL with /api prefix
    : 'http://localhost:3000/api', // Local backend with /api prefix to match server config
});

// Add auth token to requests if available
api.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
