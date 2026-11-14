import React, { ReactNode } from 'react';
import { ScrollView } from 'react-native';
import { Footer } from '../Footer/Footer';
import { Container, Content } from './ScreenLayout.styles';

interface ScreenLayoutProps {
  children: ReactNode;
}

export const ScreenLayout: React.FC<ScreenLayoutProps> = ({ children }) => {
  return (
    <Container>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <Content>
          {children}
        </Content>
        <Footer />
      </ScrollView>
    </Container>
  );
};

export default ScreenLayout;