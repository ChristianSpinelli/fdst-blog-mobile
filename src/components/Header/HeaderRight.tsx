import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import {
  UserSection,
  UserBadge,
  LogoutButton,
  LogoutButtonText,
} from './HeaderRight.styles';

export const HeaderRight: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <UserSection>
      <UserBadge>{user?.username || 'Usuário'}</UserBadge>
      <LogoutButton onPress={logout}>
        <LogoutButtonText>Sair</LogoutButtonText>
      </LogoutButton>
    </UserSection>
  );
};

export default HeaderRight;