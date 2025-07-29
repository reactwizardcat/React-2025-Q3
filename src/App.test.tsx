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
    setIsLoading,
  }: {
    isLoading: boolean;
    setIsLoading: (value: boolean) => void;
  }) => (
    <div>
      Cards Component: <span>{isLoading && 'isLoading'}</span>
      <button onClick={() => setIsLoading(true)}>Toggle</button>
    </div>
  ),
}));

const mockUseLS = vi.hoisted(() => vi.fn());
vi.mock('./hooks/useLS', () => ({
  useLS: mockUseLS,
}));

describe('App Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseLS.mockReturnValue(['initial query', vi.fn()]);
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
    const setQueryMock = vi.fn();
    mockUseLS.mockReturnValue(['initial query', setQueryMock]);
    render(<App />);
    const search = screen.getByText(/Search Component/);
    expect(search).toHaveTextContent('initial query');

    await act(
      async () =>
        await userEvent.click(
          screen.getByRole('button', { name: /Change Query/i })
        )
    );
    expect(setQueryMock).toHaveBeenCalledWith('changed');
  });
});
