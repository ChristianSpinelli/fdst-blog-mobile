import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const HeaderSection = styled.View`
  margin-bottom: 20px;
  padding: 16px;
`;

export const TitleGroup = styled.View`
  margin-bottom: 12px;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 4px;
`;

export const Subtitle = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const SearchContainer = styled.View`
  width: 100%;
`;

export const SearchInput = styled.TextInput`
  width: 100%;
  padding: 12px 16px;
  background-color: ${({ theme }) => theme.colors.surfaceAlt};
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 16px;
`;

export const PostCard = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 16px;
  margin: 0 16px 12px 16px;
`;

export const PostHeader = styled.View`
  margin-bottom: 12px;
`;

export const PostTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 6px;
`;

export const PostDescription = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const PostFooter = styled.View`
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.border};
  padding-top: 8px;
`;

export const AuthorInfo = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textMuted};
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