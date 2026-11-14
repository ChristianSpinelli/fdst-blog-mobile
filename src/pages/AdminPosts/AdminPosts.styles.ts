import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 16px;
`;

export const AdminHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const TitleGroup = styled.View`
  flex: 1;
  margin-right: 12px;
`;

export const Title = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 4px;
`;

export const Subtitle = styled.Text`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const CreateButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 10px 14px;
  border-radius: ${({ theme }) => theme.radii.small};
  justify-content: center;
  align-items: center;
`;

export const CreateButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 14px;
  font-weight: bold;
`;

export const AdminCard = styled.View`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.medium};
  padding: 16px;
  margin-bottom: 12px;
`;

export const CardInfo = styled.View`
  margin-bottom: 12px;
`;

export const PostTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 4px;
`;

export const PostDescription = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 8px;
`;

export const AuthorText = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const CardActions = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  gap: 8px;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.border};
  padding-top: 12px;
`;

export const EditButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.surfaceAlt};
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  padding: 8px 14px;
  border-radius: ${({ theme }) => theme.radii.small};
`;

export const EditButtonText = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const DeleteButton = styled.TouchableOpacity`
  background-color: rgba(239, 68, 68, 0.1);
  border: 1px solid ${({ theme }) => theme.colors.danger};
  padding: 8px 14px;
  border-radius: ${({ theme }) => theme.radii.small};
`;

export const DeleteButtonText = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.danger};
`;

export const EmptyState = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textMuted};
  text-align: center;
  margin-top: 24px;
`;

export const LoadingMessage = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textPrimary};
  text-align: center;
  margin-top: 24px;
`;