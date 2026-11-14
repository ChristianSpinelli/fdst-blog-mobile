import React, { useState } from 'react';
import { Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../contexts/AuthContext';
import {
  Container,
  MenuButton,
  ButtonPlaceholderText,
  ModalOverlay,
  MenuContent,
  MenuItem,
  MenuItemText,
  LogoutText,
  UserSection,
  UserBadge,
} from './HeaderRight.styles';
import { UserRole } from '../../types/auth';

export const HeaderRight: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigation = useNavigation<any>();
  const { user, logout } = useAuth();

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleNavigate = (screenName: string) => {
    setIsOpen(false);
    navigation.reset({
      index: 0,
      routes: [{ name: screenName }]
    })
  };

  const handleLogout = async () => {
    setIsOpen(false);
    await logout();
  };

  return (
    <Container>
      <UserSection>
        <UserBadge>{user?.username || 'Usuário'}</UserBadge>
      </UserSection>

      <MenuButton onPress={toggleMenu} activeOpacity={0.7}>
        <ButtonPlaceholderText>☰</ButtonPlaceholderText>
      </MenuButton>

      <Modal
        visible={isOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <ModalOverlay onPress={() => setIsOpen(false)}>
          <MenuContent>
            <MenuItem 
                onPress={() => handleNavigate('Dashboard')}
                activeOpacity={0.7}
              >
              <MenuItemText>Mural de Postagens</MenuItemText>
            </MenuItem>

            {user?.role === UserRole.PROFESSOR && (
              <MenuItem 
                onPress={() => handleNavigate('AdminPosts')}
                activeOpacity={0.7}
              >
                <MenuItemText>Painel Administrativo</MenuItemText>
              </MenuItem>
            )}

            <MenuItem 
              onPress={handleLogout}
              activeOpacity={0.7}
            >
              <LogoutText>Sair</LogoutText>
            </MenuItem>
          </MenuContent>
        </ModalOverlay>
      </Modal>
    </Container>
  );
};

export default HeaderRight;