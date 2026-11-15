import { User } from "./user";

export interface LoginCredentials {
  username: string; 
  password: string;
}

export interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (loginCredentials: LoginCredentials) => void;
  logout: () => void;
}