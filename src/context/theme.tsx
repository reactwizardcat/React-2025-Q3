import { useCallback, useState, useEffect } from 'react';
import { useLS } from '../hooks/useLS';
import { ThemeContext } from './themeContext';

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [themeLS, setThemeLS] = useLS('theme');
  const [theme, setTheme] = useState(() => {
    return (
      themeLS === 'dark' ||
      (window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    );
  });

  useEffect(() => {
    setThemeLS(theme ? 'dark' : 'light');
    if (theme) {
      document.body.setAttribute('data-theme', 'dark');
    } else {
      document.body.removeAttribute('data-theme');
    }
  }, [theme, setThemeLS]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => !prev);
  }, []);

  const value = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
