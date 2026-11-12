import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from "../types/auth";

const USER_KEY = '@BlogFiap:user';

export const storageService = {
  getUser: async (): Promise<User | null> => {
    try {
      const user = await AsyncStorage.getItem(USER_KEY);
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Erro ao buscar usuário do storage', error);
      return null;
    }
  },
  
  setUser: async (user: User): Promise<void> => {
    try {
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch (error) {
      console.error('Erro ao salvar usuário no storage', error);
    }
  },
  
  removeUser: async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem(USER_KEY);
    } catch (error) {
      console.error('Erro ao remover usuário do storage', error);
    }
  }
};