import React from 'react';
import { FooterContainer, FooterText } from './Footer.styles';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <FooterText>Desenvolvido por &copy; {currentYear} Christian Spinelli</FooterText>
    </FooterContainer>
  );
};

export default Footer;