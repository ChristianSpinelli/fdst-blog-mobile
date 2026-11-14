import styled from 'styled-components/native';

export const UserSection = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;

export const UserBadge = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const LogoutButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.surfaceAlt};
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  padding: 6px 12px;
  border-radius: ${({ theme }) => theme.radii.small};
`;

export const LogoutButtonText = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.danger};
`;