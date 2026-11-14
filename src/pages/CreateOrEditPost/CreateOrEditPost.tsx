import { Formik, FormikHelpers } from 'formik';
import React, { useEffect, useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';
import { useAuth } from '../../contexts/AuthContext';
import { usePosts } from '../../contexts/PostContext';
import { Post, PostRequest } from '../../types/post';
import { ScreenLayout } from '../../components/ScreenLayout/ScreenLayout';
import {
  CharCount,
  ErrorText,
  FieldFooter,
  FormGroup,
  FormHeader,
  Title,
  Subtitle,
  SubmitButton,
  SubmitButtonText,
  StyledInput,
  StyledTextArea,
  Label,
  LoadingMessage,
} from './CreateOrEditPost.styles';
import { View } from 'react-native';

interface PostFormValues {
  title: string;
  description: string;
  content: string;
}

interface CreateOrEditProps {
  isEditing: boolean;
}

const validationSchema = Yup.object({
  title: Yup.string()
    .required('O título é obrigatório.')
    .max(255, 'O título deve ter no máximo 255 caracteres.'),
  description: Yup.string()
    .required('A descrição é obrigatória.')
    .max(255, 'A descrição deve ter no máximo 255 caracteres.'),
  content: Yup.string()
    .required('O corpo do blog é obrigatório.')
    .max(10000, 'O conteúdo deve ter no máximo 10000 caracteres.'),
});

export const CreateOrEditPostScreen: React.FC<CreateOrEditProps> = ({ isEditing }) => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { postId } = route.params || {};
  const { createPost, updatePost, getPostById, isLoading } = usePosts();
  const { user } = useAuth();
  const [serverError, setServerError] = useState<string | null>(null);
  const [initialValues, setInitialValues] = useState<PostFormValues>({
    title: '',
    description: '',
    content: '',
  });

  const handleSubmit = async (
    values: PostFormValues,
    { setSubmitting }: FormikHelpers<PostFormValues>
  ) => {
    try {
      setServerError(null);
      
      if (!user) {
        setServerError("Não foi possível identificar o autor da publicação.");
        setSubmitting(false);
        return;
      }
        
      const postRequest: PostRequest = { 
        body: values.content, 
        description: values.description,
        title: values.title 
      };
      
      await createPost(postRequest);
      navigation.navigate('AdminPosts');
    } catch (error) {
      setServerError('Não foi possível salvar a postagem. Tente novamente.');
      setSubmitting(false);
    }
  };

  const handleSubmitEditing = async (
    values: PostFormValues,
    { setSubmitting }: FormikHelpers<PostFormValues>
  ) => {
    try {
      setServerError(null);
      if (!postId) return;

      const updatedData = {
        title: values.title,
        description: values.description,
        body: values.content,
      };

      await updatePost(updatedData, Number(postId));
      navigation.navigate('AdminPosts');
    } catch (error) {
      setServerError('Não foi possível atualizar a postagem. Tente novamente.');
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (postId) {
      getPostById(Number(postId)).then((post: Post) => {
        setInitialValues({
          title: post.title || '',
          description: post.description || '',
          content: post.body || '',
        });
      }).catch(() => {
        setServerError('Postagem não encontrada.');
      });
    }
  }, [postId]);

  if (isLoading && postId && !initialValues.title) {
    return (
      <ScreenLayout>
        <LoadingMessage>Carregando dados da postagem...</LoadingMessage>
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout>
      <FormHeader>
        <Title>{!isEditing ? 'Criar Nova Postagem' : 'Editar Postagem'}</Title>
        <Subtitle>
          {!isEditing 
            ? 'Preencha os campos abaixo para publicar um novo artigo no blog acadêmico' 
            : 'Atualize os campos abaixo para modificar o artigo no blog acadêmico'}.
        </Subtitle>
      </FormHeader>

      {serverError && (
        <ErrorText style={{ marginBottom: 16 }}>{serverError}</ErrorText>
      )}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={!isEditing ? handleSubmit : handleSubmitEditing}
        enableReinitialize={true}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
          <>
            <FormGroup>
              <Label>Título</Label>
              <StyledInput
                placeholder="Digite o título da postagem..."
                placeholderTextColor="#71717A"
                onChangeText={handleChange('title')}
                onBlur={handleBlur('title')}
                value={values.title}
                $isError={Boolean(touched.title && errors.title)}
              />
              <FieldFooter>
                {touched.title && errors.title ? <ErrorText>{errors.title}</ErrorText> : <View />}
                <CharCount $isLimitExceeded={values.title.length > 255}>
                  {values.title.length}/255
                </CharCount>
              </FieldFooter>
            </FormGroup>

            <FormGroup>
              <Label>Descrição</Label>
              <StyledInput
                placeholder="Digite um resumo ou descrição breve..."
                placeholderTextColor="#71717A"
                onChangeText={handleChange('description')}
                onBlur={handleBlur('description')}
                value={values.description}
                $isError={Boolean(touched.description && errors.description)}
              />
              <FieldFooter>
                {touched.description && errors.description ? <ErrorText>{errors.description}</ErrorText> : <View />}
                <CharCount $isLimitExceeded={values.description.length > 255}>
                  {values.description.length}/255
                </CharCount>
              </FieldFooter>
            </FormGroup>

            <FormGroup>
              <Label>Corpo do Blog</Label>
              <StyledTextArea
                placeholder="Escreva o conteúdo completo do artigo acadêmico..."
                placeholderTextColor="#71717A"
                multiline
                numberOfLines={6}
                onChangeText={handleChange('content')}
                onBlur={handleBlur('content')}
                value={values.content}
                $isError={Boolean(touched.content && errors.content)}
              />
              <FieldFooter>
                {touched.content && errors.content ? <ErrorText>{errors.content}</ErrorText> : <View />}
                <CharCount $isLimitExceeded={values.content.length > 10000}>
                  {values.content.length}/10000
                </CharCount>
              </FieldFooter>
            </FormGroup>

            <SubmitButton onPress={() => handleSubmit()} disabled={isSubmitting}>
              <SubmitButtonText>
                {isSubmitting ? 'Salvando...' : (isEditing ? 'Atualizar Postagem' : 'Publicar Postagem')}
              </SubmitButtonText>
            </SubmitButton>
          </>
        )}
      </Formik>
    </ScreenLayout>
  );
};

export default CreateOrEditPostScreen;