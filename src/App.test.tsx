import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';

vi.mock('./components/Search', () => ({
  default: ({ queryString }: { queryString: string }) => (
    <div>
      Search Component: <span>{queryString}</span>
    </div>
  ),
}));

vi.mock('./components/Cards', () => ({
  default: ({ isLoading }: { isLoading: boolean }) => (
    <div>
      Cards Component: <span>{isLoading && 'isLoading'}</span>
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

  it('renders without crashing', () => {
    render(<App />);
    expect(
      screen.getByRole('button', { name: /Error Boundary/i })
    ).toBeInTheDocument();
  });

  it('init with correct querry', () => {
    render(<App />);
    const search = screen.getByText(/Search Component/);
    expect(search).toHaveTextContent('initial query');
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
