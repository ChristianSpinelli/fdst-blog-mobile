export const UserRole = {
  ALUNO: 'aluno',
  PROFESSOR: 'professor',
  ADMIN: 'admin',
} as const;

export type UserRole = typeof UserRole[keyof typeof UserRole];

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  role: UserRole;
}

export interface UserRequest {
    name: string;
    username: string;
    email: string;
    role: string;
    password: string;
}
