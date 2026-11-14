import React from 'react';
import { AuthProvider } from './src/contexts/AuthContext';
import { PostProvider } from './src/contexts/PostContext';
import { Routes } from './src/routes/AppRoutes';
import { ThemeProvider } from 'styled-components';
import { theme } from './src/styles/theme';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <PostProvider>
          <Routes />
        </PostProvider>
      </AuthProvider>
    </ThemeProvider>
    
  );
}