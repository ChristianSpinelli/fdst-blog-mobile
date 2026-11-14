import styled from 'styled-components/native';

export const UserSection = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;

export const UserBadge = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
`;


export const Container = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const MenuButton = styled.TouchableOpacity`
  padding: 8px;
  justify-content: center;
  align-items: center;
`;

export const ButtonPlaceholderText = styled.Text`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 18px;
  font-weight: bold;
`;

export const ModalOverlay = styled.Pressable`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.4);
  justify-content: flex-start;
  align-items: flex-end;
  padding-top: 50px;
  padding-right: 16px;
`;

export const MenuContent = styled.View`
  width: 220px;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.medium};
  padding: 6px;
`;

export const MenuItem = styled.TouchableOpacity`
  padding: 12px 14px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.borderLight};
`;

export const MenuItemText = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const LogoutText = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.danger};
`;