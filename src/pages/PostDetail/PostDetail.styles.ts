import styled from 'styled-components/native';

export const PostHeader = styled.View`
  margin-bottom: 20px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.border};
  padding-bottom: 16px;
`;

export const PostTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 12px;
`;

export const PostMeta = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const AuthorText = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const AuthorName = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-left: 4px;
`;

export const PostBody = styled.View`
  margin-bottom: 24px;
`;

export const PostContentText = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.textPrimary};
  line-height: 24px;
`;

export const LoadingMessage = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.textPrimary};
  text-align: center;
  margin-top: 40px;
`;

export const ErrorMessage = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.danger};
  text-align: center;
  margin-top: 20px;
`;