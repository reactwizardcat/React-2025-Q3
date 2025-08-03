import { screen } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from './tests/RenderWithProwider';

vi.mock('./components/Search', () => ({
  default: ({
    queryString,
    changeQuery,
    isLoading,
  }: {
    queryString: string;
    changeQuery: (str: string) => void;
    isLoading: boolean;
  }) => (
    <div>
      Search Component: <span>{queryString}</span>
      <button onClick={() => changeQuery('changed')}>Change Query</button>
      {isLoading && <span>Search Loading</span>}
    </div>
  ),
}));

vi.mock('./components/CardList', () => ({
  default: ({
    isLoading,
    setIsLoading,
  }: {
    isLoading: boolean;
    setIsLoading: (value: boolean) => void;
  }) => (
    <div>
      CardList Component: <span>{isLoading && 'isLoading'}</span>
      <button onClick={() => setIsLoading(true)}>Toggle Loading</button>
    </div>
  ),
}));

vi.mock('./components/Flayout', () => ({
  default: ({ count }: { count: number }) => (
    <div>Flayout Component: {count}</div>
  ),
}));

const mockUseLS = vi.hoisted(() => vi.fn());
vi.mock('./hooks/useLS', () => ({
  useLS: mockUseLS,
}));

vi.mock('react-router', () => ({
  useParams: vi.fn(() => ({ search: undefined })),
}));

describe('App Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseLS.mockReturnValue(['initial query', vi.fn()]);
  });

  it('renders correct loading status', async () => {
    renderWithProviders(<App />);
    expect(screen.getByText(/CardList Component/)).not.toHaveTextContent(
      /isLoading/
    );

    await userEvent.click(
      screen.getByRole('button', { name: /Toggle Loading/i })
    );

    expect(screen.getByText(/CardList Component/)).toHaveTextContent(
      /isLoading/
    );
  });

  it('init with correct query', () => {
    renderWithProviders(<App />);
    const search = screen.getByText(/Search Component/);
    expect(search).toHaveTextContent('initial query');
  });

  it('correct query change', async () => {
    const setQueryMock = vi.fn();
    mockUseLS.mockReturnValue(['initial query', setQueryMock]);
    renderWithProviders(<App />);
    const search = screen.getByText(/Search Component/);
    expect(search).toHaveTextContent('initial query');

    await userEvent.click(
      screen.getByRole('button', { name: /Change Query/i })
    );

    expect(setQueryMock).toHaveBeenCalledWith('changed');
  });

  it('does not render Flayout when count is 0', () => {
    renderWithProviders(<App />);
    expect(screen.queryByText(/Flayout Component/)).not.toBeInTheDocument();
  });

  it('renders Flayout when count is greater than 0', () => {
    renderWithProviders(<App />, {
      preloadedState: {
        cards: {
          cardsCounter: 5,
          cards: [],
          status: 'idle',
          error: null,
        },
      },
    });
    expect(screen.getByText(/Flayout Component: 5/)).toBeInTheDocument();
  });
});
