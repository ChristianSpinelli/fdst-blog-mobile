import axios from 'axios';
import { storageService } from '../services/storageService';

const api = axios.create({
  baseURL: 'http://192.168.1.8:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async (config) => {
    if (config.headers['x-user-username']) {
      return config;
    }

    try {
      const user = await storageService.getUser();
      if (user && user.username) {
        config.headers['x-user-username'] = user.username;
      }
    } catch (error) {
      console.error('Erro ao recuperar usuário no interceptor do Axios', error);
    }
    
    return config;
  }, 
  (error) => {
    return Promise.reject(error);
  }
);

export default api;