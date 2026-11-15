import React, { useEffect, useState } from 'react';
import { FlatList, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUsers } from '../../contexts/UserContext';
import { ScreenLayout } from '../../components/ScreenLayout/ScreenLayout';
import {
  AdminHeader,
  TitleGroup,
  Title,
  Subtitle,
  CreateButton,
  CreateButtonText,
  UserCard,
  CardInfo,
  UserName,
  UserEmail,
  UserRoleBadge,
  CardActions,
  EditButton,
  EditButtonText,
  DeleteButton,
  DeleteButtonText,
  EmptyState,
  LoadingMessage,
} from '../../styles/AdminStyles';
import { UserRole } from '../../types/user';

export const AdminStudentsScreen: React.FC = () => {
  const { users, isLoading, errorMessage, fetchUsersByRole, deleteUser } = useUsers();
  const navigation = useNavigation<any>();
  const [actionError, setActionError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsersByRole(UserRole.ALUNO);
  }, [fetchUsersByRole]);

  const handleDelete = (id: number, name: string) => {
    Alert.alert(
      "Excluir Aluno",
      `Tem certeza que deseja excluir o aluno "${name}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              setActionError(null);
              await deleteUser(id);
            } catch (err) {
              setActionError('Não foi possível excluir o usuário. Tente novamente.');
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
          <Title>Gerenciar Alunos</Title>
          <Subtitle>Corpo discente cadastrado no sistema</Subtitle>
        </TitleGroup>
        <CreateButton onPress={() => navigation.navigate('CreateStudent')}>
          <CreateButtonText>+ Novo</CreateButtonText>
        </CreateButton>
      </AdminHeader>

      {(errorMessage || actionError) && (
        <EmptyState style={{ color: '#EF4444' }}>
          {errorMessage || actionError}
        </EmptyState>
      )}

      {isLoading && users?.length === 0 ? (
        <LoadingMessage>Carregando alunos...</LoadingMessage>
      ) : users?.length === 0 ? (
        <EmptyState>Nenhum aluno cadastrado no sistema.</EmptyState>
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => String(item.id)}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <UserCard>
              <CardInfo>
                <UserName numberOfLines={1}>{item.name}</UserName>
                <UserEmail numberOfLines={1}>{item.email}</UserEmail>
                <UserRoleBadge>Cargo: {item.role}</UserRoleBadge>
              </CardInfo>

              <CardActions>
                <EditButton onPress={() => navigation.navigate('EditStudent', { userId: item.id })}>
                  <EditButtonText>Editar</EditButtonText>
                </EditButton>
                <DeleteButton onPress={() => handleDelete(Number(item.id), item.name)}>
                  <DeleteButtonText>Excluir</DeleteButtonText>
                </DeleteButton>
              </CardActions>
            </UserCard>
          )}
        />
      )}
    </ScreenLayout>
  );
};

export default AdminStudentsScreen;