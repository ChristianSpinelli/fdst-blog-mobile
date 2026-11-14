import styled from 'styled-components/native';

export const FormHeader = styled.View`
  margin-bottom: 20px;
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

export const FormGroup = styled.View`
  margin-bottom: 16px;
`;

export const Label = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 6px;
`;

export const StyledInput = styled.TextInput<{ $isError?: boolean }>`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme, $isError }) => $isError ? theme.colors.danger : theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.medium};
  padding: 12px;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 14px;
`;

export const StyledTextArea = styled.TextInput<{ $isError?: boolean }>`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme, $isError }) => $isError ? theme.colors.danger : theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.medium};
  padding: 12px;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 14px;
  height: 150px;
`;

export const FieldFooter = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 4px;
`;

export const ErrorText = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.danger};
  flex: 1;
`;

export const CharCount = styled.Text<{ $isLimitExceeded?: boolean }>`
  font-size: 12px;
  color: ${({ theme, $isLimitExceeded }) => $isLimitExceeded ? theme.colors.danger : theme.colors.textMuted};
  margin-left: 8px;
`;

export const SubmitButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.radii.medium};
  padding: 14px;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 30px;
`;

export const SubmitButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 16px;
  font-weight: bold;
`;

export const LoadingMessage = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.textPrimary};
  text-align: center;
  margin-top: 40px;
`;