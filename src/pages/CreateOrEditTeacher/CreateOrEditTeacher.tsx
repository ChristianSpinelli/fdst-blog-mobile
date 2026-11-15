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
} from './CreateOrEditTeacher.styles';
import { User, UserRequest, UserRole } from '../../types/user';

interface TeacherFormValues {
  name: string;
  username: string;
  email: string;
  password?: string;
}

interface CreateOrEditTeacherProps {
  isEditing: boolean;
}

export const CreateOrEditTeacherScreen: React.FC<CreateOrEditTeacherProps> = ({ isEditing }) => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { userId } = route.params || {};
  const { createUser, updateUser, getUserById } = useUsers();
  
  const [isLoading, setIsLoading] = useState<boolean>(isEditing);
  const [serverError, setServerError] = useState<string | null>(null);
  const [initialValues, setInitialValues] = useState<TeacherFormValues>({
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
      : Yup.string().required('A senha é obrigatória.').min(6, 'A senha deve ter no mínimo 6 caracteres.'),
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
    values: TeacherFormValues,
    { setSubmitting }: FormikHelpers<TeacherFormValues>
  ) => {
    try {
      setServerError(null);

      if (!isEditing) {
        await createUser({
          name: values.name,
          username: values.username,
          email: values.email,
          password: values.password || '',
          role: UserRole.PROFESSOR,
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

      navigation.replace('AdminTeachers');
    } catch (error) {
      setServerError(isEditing ? 'Não foi possível atualizar o professor.' : 'Não foi possível cadastrar o professor.');
      setSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <ScreenLayout>
        <LoadingMessage>Carregando dados do professor...</LoadingMessage>
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout>

      <FormHeader>
        <Title>{!isEditing ? 'Cadastrar Novo Professor' : 'Editar Professor'}</Title>
        <Subtitle>
          {!isEditing 
            ? 'Preencha os dados abaixo para registrar um novo docente' 
            : 'Atualize os dados cadastrais do docente'}.
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
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
          <>
            <FormGroup>
              <Label>Nome Completo</Label>
              <StyledInput
                placeholder="Digite o nome do professor..."
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
                onChangeText={handleChange('username')}
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
                placeholder="Digite o e-mail institucional..."
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
                {isSubmitting ? 'Salvando...' : (isEditing ? 'Atualizar Professor' : 'Cadastrar Professor')}
              </SubmitButtonText>
            </SubmitButton>
          </>
        )}
      </Formik>
    </ScreenLayout>
  );
};

export default CreateOrEditTeacherScreen;