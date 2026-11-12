import axios from 'axios';
import { storageService } from '../services/storageService';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  if (config.headers['x-user-username']) {
    return config;
  }

  const user = storageService.getUser();
  if (user) {
    if (user.username) {
      config.headers['x-user-username'] = user.username;
    }
  }
  
  return config;
}, (error) => Promise.reject(error));

export default api;
