import React, { useState, useEffect, useRef } from 'react';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { usePosts } from '../../contexts/PostContext';
import {
  Container,
  HeaderSection,
  TitleGroup,
  Title,
  Subtitle,
  SearchContainer,
  SearchInput,
  PostCard,
  PostHeader,
  PostTitle,
  PostDescription,
  PostFooter,
  AuthorInfo,
  EmptyState,
  LoadingMessage,
} from './Dashboard.styles';

export const DashboardScreen: React.FC = () => {
  const { posts, isLoading, errorMessage, searchPosts, fetchPosts } = usePosts();
  const [searchTerm, setSearchTerm] = useState('');
  const navigation = useNavigation<any>();
  
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const timer = setTimeout(() => {
      searchPosts(searchTerm);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  return (
    <Container>
      <HeaderSection>
        <TitleGroup>
          <Title>Mural de Postagens</Title>
          <Subtitle>Explore artigos e publicações da comunidade acadêmica</Subtitle>
        </TitleGroup>

        <SearchContainer>
          <SearchInput
            placeholder="Buscar por título, conteúdo ou descrição..."
            placeholderTextColor="#A1A1AA"
            value={searchTerm}
            onChangeText={setSearchTerm}
            autoCapitalize="none"
          />
        </SearchContainer>
      </HeaderSection>

      {errorMessage && <EmptyState>{errorMessage}</EmptyState>}

      {isLoading && posts.length === 0 ? (
        <LoadingMessage>Carregando postagens...</LoadingMessage>
      ) : !errorMessage && posts.length === 0 ? (
        <EmptyState>
          {searchTerm
            ? `Nenhuma postagem encontrada para "${searchTerm}".`
            : 'Nenhuma postagem disponível no momento.'}
        </EmptyState>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <PostCard 
              onPress={() => navigation.navigate('PostDetail', { postId: item.id })}
            >
              <PostHeader>
                <PostTitle>{ item.title }</PostTitle>
                <PostDescription numberOfLines={2}>
                  { item.description }
                </PostDescription>
              </PostHeader>

              <PostFooter>
                <AuthorInfo>
                  Por: {item.author?.name || 'Autor desconhecido'}
                </AuthorInfo>
              </PostFooter>
            </PostCard>
          )}
          refreshing={isLoading}
          onRefresh={fetchPosts}
          showsVerticalScrollIndicator={false}
        />
      )}
    </Container>
  );
};

export default DashboardScreen;