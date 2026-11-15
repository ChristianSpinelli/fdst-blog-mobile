import api from '../api/api';
import { User, UserRequest } from '../types/user';

export const userService = {
    
    getUsersByRole: async (role:string): Promise<User[]> => {
        try{
            const response = await api.get<User[]>(`/users/role/${role}`);
            return response.data;
        }catch(error){
            throw error;
        }
    },
     
    createUser: async (userRequest: UserRequest): Promise<User> => {
        try {
            const response = await api.post<User>('/users', userRequest);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getUserById: async (id: number): Promise<User> => {
        try {
            const response = await api.get<User>(`/users/id/${id}`);
            return response.data; 
        } catch (error) {
            throw error;
        }
    },

    editUser: async (userRequest: Partial<UserRequest>, id: number): Promise<User> =>{
        try{
            const response = await api.put<User>(`/users/${id}`, userRequest);
            return response.data;
        }catch(error){
            throw error;
        }
    },

    deleteUser: async (id: number): Promise<string> => {
        try{
            const response = await api.delete<string>(`/users/${id}`);
            return response.data;
        }catch(error){
            throw error;
        }
    },

}