import React, { useState } from 'react';
import { FlatList, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { usePosts } from '../../contexts/PostContext';
import { ScreenLayout } from '../../components/ScreenLayout/ScreenLayout';
import {
  AdminHeader,
  TitleGroup,
  Title,
  Subtitle,
  CreateButton,
  CreateButtonText,
  AdminCard,
  CardInfo,
  PostTitle,
  PostDescription,
  AuthorText,
  CardActions,
  EditButton,
  EditButtonText,
  DeleteButton,
  DeleteButtonText,
  EmptyState,
  LoadingMessage,
} from './AdminPosts.styles';

export const AdminPostsScreen: React.FC = () => {
  const { posts, isLoading, errorMessage, deletePost, fetchPosts } = usePosts();
  const navigation = useNavigation<any>();
  const [actionError, setActionError] = useState<string | null>(null);

  const handleDelete = (id: number, title: string) => {
    Alert.alert(
      "Excluir Postagem",
      `Tem certeza que deseja excluir a postagem "${title}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              setActionError(null);
              await deletePost(id);
            } catch (err) {
              setActionError('Não foi possível excluir a postagem. Tente novamente.');
            }
          }
        }
      ]
    );
  };

  return (
    <ScreenLayout>
      <AdminHeader>
        <TitleGroup>
          <Title>Painel Administrativo</Title>
          <Subtitle>Gerencie as postagens publicadas</Subtitle>
        </TitleGroup>
        <CreateButton onPress={() => navigation.navigate('CreatePost')}>
          <CreateButtonText>+ Novo</CreateButtonText>
        </CreateButton>
      </AdminHeader>

      {(errorMessage || actionError) && (
        <EmptyState style={{ color: '#EF4444' }}>
          {errorMessage || actionError}
        </EmptyState>
      )}

      {isLoading && posts.length === 0 ? (
        <LoadingMessage>Carregando painel...</LoadingMessage>
      ) : posts.length === 0 ? (
        <EmptyState>Nenhuma postagem cadastrada no sistema.</EmptyState>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => String(item.id)}
          scrollEnabled={false} 
          renderItem={({ item }) => (
            <AdminCard>
              <CardInfo>
                <PostTitle numberOfLines={1}>{item.title}</PostTitle>
                <PostDescription numberOfLines={2}>{item.description}</PostDescription>
                <AuthorText>
                  Por: { item.author?.name || 'Autor Desconhecido' }
                </AuthorText>
              </CardInfo>

              <CardActions>
                <EditButton onPress={() => navigation.navigate('EditPost', { postId: item.id })}>
                  <EditButtonText>Editar</EditButtonText>
                </EditButton>
                <DeleteButton onPress={() => handleDelete(Number(item.id), item.title)}>
                  <DeleteButtonText>Excluir</DeleteButtonText>
                </DeleteButton>
              </CardActions>
            </AdminCard>
          )}
        />
      )}
    </ScreenLayout>
  );
};

export default AdminPostsScreen;