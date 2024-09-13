import axios from 'axios';

export const useApi = () => {
  const api = axios.create({
    baseURL: process.env.BACKEND_URL || 'http://localhost:5000/api',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Automatically add token for authenticated requests
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return { api };
};
