import { Formik, FormikHelpers } from 'formik';
import React, { useEffect, useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import * as Yup from 'yup';
import { useUsers } from '../../contexts/UserContext';
import { ScreenLayout } from '../../components/ScreenLayout/ScreenLayout';
import {
  ErrorText,
  FieldFooter,
  FormGroup,
  FormHeader,
  Title,
  Subtitle,
  SubmitButton,
  SubmitButtonText,
  StyledInput,
  Label,
  LoadingMessage,
} from '../../styles/AdminStyles';
import { User, UserRequest, UserRole } from '../../types/user';

interface StudentFormValues {
  name: string;
  username: string;
  email: string;
  password?: string;
}

interface CreateOrEditStudentProps {
  isEditing: boolean;
}

export const CreateOrEditStudentScreen: React.FC<CreateOrEditStudentProps> = ({ isEditing }) => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { userId } = route.params || {};
  const { createUser, updateUser, getUserById } = useUsers();
  
  const [isLoading, setIsLoading] = useState<boolean>(isEditing);
  const [serverError, setServerError] = useState<string | null>(null);
  const [initialValues, setInitialValues] = useState<StudentFormValues>({
    name: '',
    username: '',
    email: '',
    password: '',
  });

  const validationSchema = Yup.object({
    name: Yup.string().required('O nome é obrigatório.'),
    username: Yup.string().required('O username é obrigatório.').matches(
      /^[a-zA-Z0-9_-]+$/,
      'O username não pode conter espaços ou caracteres especiais.'
    ),
    email: Yup.string().email('E-mail inválido.').required('O e-mail é obrigatório.'),
    password: isEditing 
      ? Yup.string().notRequired() 
      : Yup.string().required('A senha é obrigatória.').min(8, 'A senha deve ter no mínimo 8 caracteres.'),
  });

  useEffect(() => {
    if (isEditing && userId) {
      setIsLoading(true);
      getUserById(Number(userId))
        .then((user: User) => {
           setInitialValues({
              name: user.name || '',
              username: user.username || '',
              email: user.email || '',
              password: '',
            });
        })
        .catch(() => setServerError('Usuário não encontrado.'))
        .finally(() => setIsLoading(false));
    }
  }, [isEditing, userId]);

  const handleSubmit = async (
    values: StudentFormValues,
    { setSubmitting }: FormikHelpers<StudentFormValues>
  ) => {
    try {
      setServerError(null);

      if (!isEditing) {
        await createUser({
          name: values.name,
          username: values.username,
          email: values.email,
          password: values.password || '',
          role: UserRole.ALUNO,
        });
      } else {
        const updateData: Partial<UserRequest> = {
          name: values.name,
          username: values.username,
          email: values.email,
        };
        if (values.password) {
          updateData.password = values.password;
        }
        await updateUser(updateData, Number(userId));
      }

      navigation.replace('AdminStudents');
    } catch (error) {
      setServerError(isEditing ? 'Não foi possível atualizar o aluno.' : 'Não foi possível cadastrar o aluno.');
      setSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <ScreenLayout>
        <LoadingMessage>Carregando dados do aluno...</LoadingMessage>
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout>
      <FormHeader>
        <Title>{!isEditing ? 'Cadastrar Novo Aluno' : 'Editar Aluno'}</Title>
        <Subtitle>
          {!isEditing 
            ? 'Preencha os dados abaixo para registrar um novo discente' 
            : 'Atualize os dados cadastrais do discente'}.
        </Subtitle>
      </FormHeader>

      {serverError && (
        <ErrorText style={{ marginBottom: 16 }}>{serverError}</ErrorText>
      )}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched, isSubmitting }) => (
          <>
            <FormGroup>
              <Label>Nome Completo</Label>
              <StyledInput
                placeholder="Digite o nome do aluno..."
                placeholderTextColor="#71717A"
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
                $isError={Boolean(touched.name && errors.name)}
              />
              <FieldFooter>
                {touched.name && errors.name ? <ErrorText>{errors.name}</ErrorText> : <View />}
              </FieldFooter>
            </FormGroup>

            <FormGroup>
              <Label>Username</Label>
              <StyledInput
                placeholder="Digite o nome de usuário..."
                placeholderTextColor="#71717A"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={(text) => setFieldValue('username', text.replace(/\s/g, ''))}
                onBlur={handleBlur('username')}
                value={values.username}
                $isError={Boolean(touched.username && errors.username)}
              />
              <FieldFooter>
                {touched.username && errors.username ? <ErrorText>{errors.username}</ErrorText> : <View />}
              </FieldFooter>
            </FormGroup>

            <FormGroup>
              <Label>E-mail</Label>
              <StyledInput
                placeholder="Digite o e-mail acadêmico..."
                placeholderTextColor="#71717A"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                $isError={Boolean(touched.email && errors.email)}
              />
              <FieldFooter>
                {touched.email && errors.email ? <ErrorText>{errors.email}</ErrorText> : <View />}
              </FieldFooter>
            </FormGroup>

            {!isEditing && (
              <FormGroup>
                <Label>Senha</Label>
                <StyledInput
                  placeholder="Digite a senha de acesso..."
                  placeholderTextColor="#71717A"
                  secureTextEntry
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  $isError={Boolean(touched.password && errors.password)}
                />
                <FieldFooter>
                  {touched.password && errors.password ? <ErrorText>{errors.password}</ErrorText> : <View />}
                </FieldFooter>
              </FormGroup>
            )}

            <SubmitButton onPress={() => handleSubmit()} disabled={isSubmitting}>
              <SubmitButtonText>
                {isSubmitting ? 'Salvando...' : (isEditing ? 'Atualizar Aluno' : 'Cadastrar Aluno')}
              </SubmitButtonText>
            </SubmitButton>
          </>
        )}
      </Formik>
    </ScreenLayout>
  );
};

export default CreateOrEditStudentScreen;