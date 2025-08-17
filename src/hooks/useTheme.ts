'use client';

import { ThemeContext } from '@/app/[locale]/themeContext';
import { useContext } from 'react';

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === null) {
    throw new Error('useTheme must be used within a ThemeContextProvider');
  }
  return context;
};
