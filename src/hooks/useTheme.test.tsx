import { renderHook } from '@testing-library/react';
import { useTheme } from './useTheme';
import { ThemeContext } from '../context/themeContext';

describe('useTheme hook', () => {
  it('should return theme context when used within ThemeContextProvider', () => {
    const mockTheme = {
      theme: true,
      toggleTheme: vi.fn(),
    };

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeContext.Provider value={mockTheme}>
        {children}
      </ThemeContext.Provider>
    );

    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current).toEqual(mockTheme);
  });

  it('should throw an error when used outside ThemeContextProvider', () => {
    const consoleError = console.error;
    console.error = vi.fn();

    expect(() => {
      renderHook(() => useTheme());
    }).toThrow('useTheme must be used within a ThemeContextProvider');

    console.error = consoleError;
  });

  it('should provide access to theme boolean value', () => {
    const mockTheme = {
      theme: false,
      toggleTheme: vi.fn(),
    };

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeContext.Provider value={mockTheme}>
        {children}
      </ThemeContext.Provider>
    );

    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current.theme).toBe(false);
  });

  it('should provide toggleTheme function', () => {
    const toggleMock = vi.fn();
    const mockTheme = {
      theme: true,
      toggleTheme: toggleMock,
    };

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeContext.Provider value={mockTheme}>
        {children}
      </ThemeContext.Provider>
    );

    const { result } = renderHook(() => useTheme(), { wrapper });

    result.current.toggleTheme();
    expect(toggleMock).toHaveBeenCalledTimes(1);
  });
});
