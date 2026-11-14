import styled from 'styled-components/native';

export const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

export const BlogText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const FiapText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
`;