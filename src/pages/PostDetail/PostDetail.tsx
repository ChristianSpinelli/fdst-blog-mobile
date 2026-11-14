import React, { useEffect, useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Post } from '../../types/post';
import { usePosts } from '../../contexts/PostContext';
import { ScreenLayout } from '../../components/ScreenLayout/ScreenLayout';
import {
  BackButton,
  BackButtonText,
  PostHeader,
  PostTitle,
  PostMeta,
  AuthorText,
  AuthorName,
  PostBody,
  PostContentText,
  LoadingMessage,
  ErrorMessage,
} from './PostDetail.styles';

export const PostDetailScreen: React.FC = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { postId } = route.params || {};
  const { getPostById } = usePosts();

  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPostDetails = async () => {
      if (!postId) return;
      try {
        setIsLoading(true);
        setError(null);
        const data = await getPostById(Number(postId));
        setPost(data);
      } catch (err) {
        setError('Não foi possível carregar esta postagem ou ela não existe.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPostDetails();
  }, [postId, getPostById]);

  if (isLoading) {
    return (
      <ScreenLayout>
        <LoadingMessage>Carregando artigo...</LoadingMessage>
      </ScreenLayout>
    );
  }

  if (error || !post) {
    return (
      <ScreenLayout>
        <BackButton onPress={() => navigation.goBack()}>
          <BackButtonText>Voltar</BackButtonText>
        </BackButton>
        <ErrorMessage>{error || 'Post não encontrado.'}</ErrorMessage>
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout>
      <BackButton onPress={() => navigation.goBack()}>
        <BackButtonText>Voltar</BackButtonText>
      </BackButton>

      <PostHeader>
        <PostTitle>{post.title}</PostTitle>
        <PostMeta>
          <AuthorText>Por:</AuthorText>
          <AuthorName>
            { post.author?.name || 'Autor desconhecido' }
          </AuthorName>
        </PostMeta> 
      </PostHeader>

      <PostBody>
        <PostContentText>
          {post.body || 'Nenhum conteúdo disponível para esta matéria.'}
        </PostContentText>
      </PostBody>
    </ScreenLayout>
  );
};

export default PostDetailScreen;