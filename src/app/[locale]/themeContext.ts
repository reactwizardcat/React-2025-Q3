import { createContext } from 'react';

interface ThemeContextType {
  theme: boolean;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);
