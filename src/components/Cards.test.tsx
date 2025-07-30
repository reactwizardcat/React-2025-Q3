import { render, screen } from '@testing-library/react';
import {
  MemoryRouter,
  useParams,
  useNavigation,
  useNavigate,
} from 'react-router';
import Cards from './Cards';
import { useFetchCards } from '../hooks/useFetchCards';
import userEvent from '@testing-library/user-event';
import type { Navigation } from 'react-router';

vi.mock('react-router', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router')>();
  return {
    ...actual,
    useNavigate: vi.fn(),
    useNavigation: vi.fn(),
    useParams: vi.fn(),
    Outlet: vi.fn().mockImplementation(() => <div>Outlet</div>),
    Link: vi
      .fn()
      .mockImplementation(({ to, children }) => <a href={to}>{children}</a>),
  };
});

vi.mock('../hooks/useFetchCards');
vi.mock('./Card', () => ({ default: () => <div>Card Component</div> }));
vi.mock('./Loader', () => ({
  default: () => <div role="progressbar">Loading...</div>,
}));
vi.mock('./SkeletonCard', () => ({
  default: () => <div data-testid="skeleton-card" />,
}));
vi.mock('./UI/MyButton', () => ({
  default: ({
    children,
    callback,
  }: {
    children: React.ReactNode;
    callback: () => void;
  }) => <button onClick={callback}>{children}</button>,
}));
vi.mock('./Pagination', () => ({
  Pagination: ({
    totalItems,
    totalPages,
    currentPage,
    onPageChange,
  }: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
  }) => (
    <div data-testid="pagination">
      <span>Total: {totalItems}</span>
      <span>Pages: {totalPages}</span>
      <span>Current: {currentPage}</span>
      <button onClick={() => onPageChange(currentPage + 1)}>Next</button>
      <button onClick={() => onPageChange(currentPage - 1)}>Prev</button>
    </div>
  ),
}));
vi.mock('../layout/SideBarLayout', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sidebar">{children}</div>
  ),
}));

const mockCards = {
  cards: [
    {
      id: 1,
      name: 'Diluc',
      element: 'Pyro',
      region: 'Mondstadt',
      weapon: 'Claymore',
      images: { large: 'diluc.jpg', small: '' },
    },
    {
      id: 2,
      name: 'Keqing',
      element: 'Electro',
      region: 'Liyue',
      weapon: 'Sword',
      images: { large: 'keqing.jpg', small: '' },
    },
  ],
  total_count: 2,
  total_pages: 1,
  page: 1,
};

describe('Cards Component', () => {
  const mockNavigate = vi.fn();
  const mockUseFetchCards = vi.mocked(useFetchCards);
  const mockUseParams = vi.mocked(useParams);
  const mockUseNavigation = vi.mocked(useNavigation);
  const mockSetPage = vi.fn();
  const mockSetIsLoading = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
    mockUseParams.mockReturnValue({ search: '1' });
    mockUseNavigation.mockReturnValue({ state: 'idle' } as Navigation);
  });

  it('renders loading state when isLongLoading is true', () => {
    mockUseFetchCards.mockReturnValue({
      isLongLoading: true,
      error: null,
      data: null,
    });

    render(
      <MemoryRouter>
        <Cards
          query="test"
          isLoading={false}
          setIsLoading={mockSetIsLoading}
          page={1}
          setPage={mockSetPage}
        />
      </MemoryRouter>
    );

    expect(screen.getByText(/Please be patient/i)).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders skeleton cards when isLoading is true', () => {
    mockUseFetchCards.mockReturnValue({
      isLongLoading: false,
      error: null,
      data: null,
    });

    render(
      <MemoryRouter>
        <Cards
          query="test"
          isLoading={true}
          setIsLoading={mockSetIsLoading}
          page={1}
          setPage={mockSetPage}
        />
      </MemoryRouter>
    );

    expect(screen.getAllByTestId('skeleton-card').length).toBeGreaterThan(0);
  });

  it('renders error message when error occurs', () => {
    const errorMessage = 'Test error';
    mockUseFetchCards.mockReturnValue({
      isLongLoading: false,
      error: errorMessage,
      data: null,
    });

    render(
      <MemoryRouter>
        <Cards
          query="test"
          isLoading={false}
          setIsLoading={mockSetIsLoading}
          page={1}
          setPage={mockSetPage}
        />
      </MemoryRouter>
    );

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /go back/i })
    ).toBeInTheDocument();
  });

  it('renders no cards message when data is empty', () => {
    mockUseFetchCards.mockReturnValue({
      isLongLoading: false,
      error: null,
      data: { cards: null, total_count: 0, total_pages: 0, page: 1 },
    });

    render(
      <MemoryRouter>
        <Cards
          query="test"
          isLoading={false}
          setIsLoading={mockSetIsLoading}
          page={1}
          setPage={mockSetPage}
        />
      </MemoryRouter>
    );

    expect(screen.getByText(/No cards found/i)).toBeInTheDocument();
  });

  it('renders cards and pagination when data is available', async () => {
    mockUseFetchCards.mockReturnValue({
      isLongLoading: false,
      error: null,
      data: mockCards,
    });

    render(
      <MemoryRouter>
        <Cards
          query="test"
          isLoading={false}
          setIsLoading={mockSetIsLoading}
          page={1}
          setPage={mockSetPage}
        />
      </MemoryRouter>
    );

    expect(screen.getAllByText('Card Component').length).toBe(
      mockCards.cards.length
    );
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });

  it('calls setPage when pagination changes', async () => {
    mockUseFetchCards.mockReturnValue({
      isLongLoading: false,
      error: null,
      data: { ...mockCards, total_pages: 2 },
    });

    render(
      <MemoryRouter>
        <Cards
          query="test"
          isLoading={false}
          setIsLoading={mockSetIsLoading}
          page={1}
          setPage={mockSetPage}
        />
      </MemoryRouter>
    );

    expect(screen.getByText('Total: 2')).toBeInTheDocument();
    expect(screen.getByText('Pages: 2')).toBeInTheDocument();
    expect(screen.getByText('Current: 1')).toBeInTheDocument();

    await userEvent.click(screen.getByText('Next'));
    expect(mockSetPage).toHaveBeenCalledWith(2);

    await userEvent.click(screen.getByText('Prev'));
    expect(mockSetPage).toHaveBeenCalledWith(0);
  });

  it('shows loading sidebar when navigation is in progress', () => {
    mockUseFetchCards.mockReturnValue({
      isLongLoading: false,
      error: null,
      data: mockCards,
    });

    mockUseNavigation.mockReturnValue({ state: 'loading' } as Navigation);

    render(
      <MemoryRouter>
        <Cards
          query="test"
          isLoading={false}
          setIsLoading={mockSetIsLoading}
          page={1}
          setPage={mockSetPage}
        />
      </MemoryRouter>
    );

    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders Outlet in normal state', () => {
    mockUseFetchCards.mockReturnValue({
      isLongLoading: false,
      error: null,
      data: mockCards,
    });

    render(
      <MemoryRouter>
        <Cards
          query="test"
          isLoading={false}
          setIsLoading={mockSetIsLoading}
          page={1}
          setPage={mockSetPage}
        />
      </MemoryRouter>
    );

    expect(screen.getByText('Outlet')).toBeInTheDocument();
  });

  it('calls navigate(-1) when Go Back button is clicked in error state', async () => {
    mockUseFetchCards.mockReturnValue({
      isLongLoading: false,
      error: 'Test error',
      data: null,
    });

    render(
      <MemoryRouter>
        <Cards
          query="test"
          isLoading={false}
          setIsLoading={mockSetIsLoading}
          page={1}
          setPage={mockSetPage}
        />
      </MemoryRouter>
    );

    await userEvent.click(screen.getByRole('button', { name: /go back/i }));
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
