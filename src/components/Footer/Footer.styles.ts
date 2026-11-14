import styled from 'styled-components/native';

export const FooterContainer = styled.View`
  padding-top: 30px;
  padding-bottom: 50px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.primary};
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.border};
`;

export const FooterText = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textPrimary};
  text-align: center;
`;