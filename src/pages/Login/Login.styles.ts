import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background };
  padding: 24px;
`;

export const Card = styled.View`
  width: 100%;
  max-width: 420px;
  background-color: ${({ theme }) => theme.colors.surface };
  border: 1px solid ${({ theme }) => theme.colors.border };
  border-radius: ${({ theme }) => theme.radii.medium };
  padding: 24px 20px;
`;

export const Title = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.textPrimary };
  margin-bottom: 20px;
  text-align: center;
`;

export const FormGroup = styled.View`
  margin-bottom: 16px;
`;

export const Label = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color:${({ theme }) => theme.colors.textPrimary };;
  margin-bottom: 6px;
`;

export const Input = styled.TextInput`
  width: 100%;
  padding: 12px 16px;
  background-color: ${({ theme }) => theme.colors.surfaceAlt};;
  border: 1px solid ${({ theme }) => theme.colors.borderLight };;
  border-radius: 8px;
  color:${({ theme }) => theme.colors.textPrimary };;
  font-size: 16px;
`;

export const FieldError = styled.Text`
  font-size: 12px;
  color:${({ theme }) => theme.colors.danger };;
  margin-top: 4px;
`;

export const SubmitButton = styled.TouchableOpacity`
  width: 100%;
  padding: 14px;
  margin-top: 10px;
  background-color:${({ theme }) => theme.colors.primary };
  border-radius: 8px;
  align-items: center;
  justify-content: center;
`;

export const SubmitButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.textPrimary };
  font-size: 16px;
  font-weight: bold;
`;

export const ShowErrorMessage = styled.Text`
  padding: 12px;
  background-color: ${({ theme }) => theme.colors.secondary };
  border: 1px solid ${({ theme }) => theme.colors.danger };
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.danger };
  font-size: 14px;
  text-align: center;
  margin-bottom: 16px;
`;