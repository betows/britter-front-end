import axios from 'axios';

export default defineNuxtPlugin(() => {
  const api = axios.create({
    baseURL: process.env.BACKEND_URL,
  });
  return {
    provide: { api },
  };
});
