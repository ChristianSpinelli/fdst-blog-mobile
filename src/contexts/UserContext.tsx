import React, { createContext, useContext, useState, useCallback } from 'react';
import { User, UserRequest } from '../types/user';
import { userService } from '../services/userService';

interface UserContextData {
  users: User[];
  isLoading: boolean;
  errorMessage: string | null;
  fetchUsersByRole: (role: string) => Promise<void>;
  createUser: (data: UserRequest) => Promise<void>;
  updateUser: (data: Partial<UserRequest>, id: number) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
}

const UserContext = createContext<UserContextData>({} as UserContextData);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchUsersByRole = useCallback(async (role: string) => {
    try {
      setIsLoading(true);
      setErrorMessage(null);
      const users = await userService.getUsersByRole(role);
      setUsers(users);
    } catch (err) {
      setErrorMessage(`Não foi possível carregar os usuários do tipo ${role}.`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createUser = async (user: UserRequest) => {
    await userService.createUser(user);
  };

  const updateUser = async (user: Partial<UserRequest>, id: number) => {
    await userService.editUser(user, id);
  };

  const deleteUser = async (id: number) => {
    await userService.deleteUser(id);
    setUsers((prev) => prev.filter((user) => Number(user.id) !== Number(id)));
  };

  return (
    <UserContext.Provider
      value={{
        users,
        isLoading,
        errorMessage,
        fetchUsersByRole,
        createUser,
        updateUser,
        deleteUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUsers = () => useContext(UserContext);