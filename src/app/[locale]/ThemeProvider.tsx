'use client';

import { useCallback, useState, useEffect } from 'react';
import { useLS } from './_hooks/useLS';
import { ThemeContext } from './themeContext';

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [themeLS, setThemeLS] = useLS('theme');
  const [theme, setTheme] = useState(false);

  useEffect(() => {
    setTheme(
      themeLS === 'dark' ||
        (window.matchMedia &&
          window.matchMedia('(prefers-color-scheme: dark)').matches)
    );
  }, []);

  useEffect(() => {
    setThemeLS(theme ? 'dark' : 'light');
  }, [theme, setThemeLS]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => !prev);
  }, []);

  const value = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      <div data-theme={theme ? 'dark' : ''} className="bg-white dark:bg-black">
        <div className="m-auto flex min-h-screen max-w-7xl flex-col">
          {children}
        </div>
      </div>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
