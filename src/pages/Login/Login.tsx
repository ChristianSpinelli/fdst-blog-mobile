import React, { useState } from 'react';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../contexts/AuthContext'; 
import { LoginCredentials } from '../../types/auth';
import {
  Card,
  Container,
  FormGroup,
  Input,
  Label,
  FieldError,
  ShowErrorMessage,
  SubmitButton,
  SubmitButtonText,
  Title
} from './Login.styles';
import { Alert } from 'react-native';

const loginSchema = Yup.object().shape({
  username: Yup.string()
    .trim()
    .required('O username é obrigatório.'),
  password: Yup.string()
    .required('A senha é obrigatória.')
    .min(8, 'A senha deve ter pelo menos 8 caracteres.'),
});

export const LoginScreen: React.FC = () => {
  const { login } = useAuth();
  const [globalError, setGlobalError] = useState('');
  const navigation = useNavigation<any>();

  const handleLoginSubmit = async (
    values: LoginCredentials,
    { setSubmitting }: FormikHelpers<LoginCredentials>
  ) => {
    const trimmedUsername = values.username.trim();
    const trimmedPassword = values.password.trim();

    console.log("Tentando logar com:", trimmedUsername);

    try {
      setGlobalError('');
      await login({
        username: trimmedUsername,
        password: trimmedPassword,
      });
      navigation.replace('Dashboard');
    } catch (error) {
      setGlobalError('Não foi possível realizar o login, verifique suas credenciais e tente novamente.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container>
      <Card>
        <Title>Entrar</Title>

        {!!globalError && <ShowErrorMessage>{globalError}</ShowErrorMessage>}

        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={loginSchema}
          onSubmit={handleLoginSubmit}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
            <>
              <FormGroup>
                <Label>Username</Label>
                <Input
                  placeholder="Digite seu username"
                  placeholderTextColor="#999"
                  autoCapitalize="none"
                  autoCorrect={false}
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                  value={values.username}
                />
                {touched.username && errors.username && (
                  <FieldError>{errors.username}</FieldError>
                )}
              </FormGroup>

              <FormGroup>
                <Label>Senha</Label>
                <Input
                  placeholder="Digite sua senha"
                  placeholderTextColor="#999"
                  secureTextEntry
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                />
                {touched.password && errors.password && (
                  <FieldError>{errors.password}</FieldError>
                )}
              </FormGroup>

              <SubmitButton onPress={() => handleSubmit()} disabled={isSubmitting}>
                <SubmitButtonText>
                  {isSubmitting ? 'Entrando...' : 'Entrar'}
                </SubmitButtonText>
              </SubmitButton>
            </>
          )}
        </Formik>
      </Card>
    </Container>
  );
};

export default LoginScreen;