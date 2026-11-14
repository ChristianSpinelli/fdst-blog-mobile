import React from 'react';
import { TitleContainer, BlogText, FiapText } from './HeaderTitle.styles';

export const HeaderTitle: React.FC = () => {
  return (
    <TitleContainer>
      <BlogText>Blog</BlogText>
      <FiapText>FIAP</FiapText>
    </TitleContainer>
  );
};

export default HeaderTitle;