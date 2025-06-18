// src/api/axios.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Your backend base URL
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // if you're using cookies
});

export default api;
