import { describe, it, expect, vi, beforeEach } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';

vi.mock('./components/Search', () => ({
  default: ({
    queryString,
    changeQuery,
  }: {
    queryString: string;
    changeQuery: (str: string) => void;
  }) => (
    <div>
      Search Component: <span>{queryString}</span>
      <button onClick={() => changeQuery('changed')}>Change Query</button>
    </div>
  ),
}));

vi.mock('./components/Cards', () => ({
  default: ({
    isLoading,
    toggleLoading,
  }: {
    isLoading: boolean;
    toggleLoading: (value: boolean) => void;
  }) => (
    <div>
      Cards Component: <span>{isLoading && 'isLoading'}</span>
      <button onClick={() => toggleLoading(true)}>Toggle</button>
    </div>
  ),
}));

const mockGetQuery = vi.fn();
const mockSetQuery = vi.fn();
vi.mock('./service/storageService', () => ({
  default: {
    getInstance: vi.fn(() => ({
      getQuery: mockGetQuery,
      setQuery: mockSetQuery,
    })),
  },
}));

describe('App Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetQuery.mockReturnValue('initial query');
  });

  it('renders correct loading status', async () => {
    render(<App />);
    expect(
      screen.getByRole('button', { name: /Error Boundary/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/Cards Component/)).not.toHaveTextContent(
      /isLoading/
    );

    await act(
      async () =>
        await userEvent.click(screen.getByRole('button', { name: /Toggle/i }))
    );

    expect(screen.getByText(/Cards Component/)).toHaveTextContent(/isLoading/);
  });

  it('init with correct query', () => {
    render(<App />);
    const search = screen.getByText(/Search Component/);
    expect(search).toHaveTextContent('initial query');
  });

  it('correct query change', async () => {
    render(<App />);
    const search = screen.getByText(/Search Component/);

    await act(
      async () =>
        await userEvent.click(
          screen.getByRole('button', { name: /Change Query/i })
        )
    );
    expect(search).toHaveTextContent('changed');
  });

  it('throws error when button clicked', async () => {
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(<App />);
    const button = screen.getByRole('button', { name: 'Error Boundary' });
    await expect(userEvent.click(button)).rejects.toThrow("💥 I'm error");

    consoleError.mockRestore();
  });
});
