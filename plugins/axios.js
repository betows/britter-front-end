import axios from 'axios';

export default defineNuxtPlugin(() => {
  const api = axios.create({
    baseURL: process.env.BACKEND_URL || 'http://localhost:5000/api',
  });
  return {
    provide: { api },
  };
});
