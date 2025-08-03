import { act, render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import ThemeProvider from './ThemeProvider';
import { useLS } from '../hooks/useLS';

vi.mock('../hooks/useLS', () => ({
  useLS: vi.fn(),
}));

let lastProvidedValue: { theme: boolean; toggleTheme: () => void } | null =
  null;

vi.mock('./themeContext', () => ({
  ThemeContext: {
    Provider: ({
      value,
      children,
    }: {
      value: { theme: boolean; toggleTheme: () => void };
      children: ReactNode;
    }) => {
      lastProvidedValue = value;
      return (
        <div
          data-testid="mock-provider"
          data-theme-value={value.theme ? 'dark' : 'light'}
        >
          {children}
        </div>
      );
    },
  },
}));

describe('ThemeProvider', () => {
  const mockUseLS = vi.mocked(useLS);
  const mockMatchMedia = vi.fn();

  beforeAll(() => {
    vi.stubGlobal('matchMedia', mockMatchMedia);
  });

  beforeEach(() => {
    vi.resetAllMocks();
    lastProvidedValue = null;
    mockMatchMedia.mockImplementation(() => ({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));
    mockUseLS.mockReturnValue(['', vi.fn()]);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with light theme when no stored theme and system prefers light', () => {
    render(
      <ThemeProvider>
        <div>Test Child</div>
      </ThemeProvider>
    );

    const mockProvider = screen.getByTestId('mock-provider');

    expect(lastProvidedValue?.theme).toBe(false);
    expect(mockProvider).toHaveAttribute('data-theme-value', 'light');
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  it('should initialize with dark theme when stored theme is dark', () => {
    mockUseLS.mockReturnValue(['dark', vi.fn()]);

    render(
      <ThemeProvider>
        <div>Test Child</div>
      </ThemeProvider>
    );

    const mockProvider = screen.getByTestId('mock-provider');

    expect(lastProvidedValue?.theme).toBe(true);
    expect(mockProvider).toHaveAttribute('data-theme-value', 'dark');
  });

  it('should update local storage when theme changes', () => {
    const mockSetThemeLS = vi.fn();
    mockUseLS.mockReturnValue(['light', mockSetThemeLS]);

    render(
      <ThemeProvider>
        <div>Test Child</div>
      </ThemeProvider>
    );

    act(() => {
      lastProvidedValue?.toggleTheme();
    });

    expect(mockSetThemeLS).toHaveBeenCalledWith('dark');
  });
});
