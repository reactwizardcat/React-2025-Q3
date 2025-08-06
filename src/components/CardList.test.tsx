import { screen } from '@testing-library/react';
import {
  MemoryRouter,
  useParams,
  useNavigation,
  useNavigate,
} from 'react-router';
import CardList from './CardList';
import userEvent from '@testing-library/user-event';
import type { Navigation } from 'react-router';
import { renderWithProviders } from '../tests/RenderWithProwider';

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

describe('CardList Component', () => {
  const mockNavigate = vi.fn();
  const mockUseParams = vi.mocked(useParams);
  const mockUseNavigation = vi.mocked(useNavigation);
  const mockSetPage = vi.fn();

  beforeEach(() => {
    vi.spyOn(global, 'scrollTo').mockImplementation(() => {});
    vi.clearAllMocks();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
    mockUseParams.mockReturnValue({});
    mockUseNavigation.mockReturnValue({ state: 'idle' } as Navigation);
  });

  it('renders long loading state when isLongLoading is true', () => {
    renderWithProviders(
      <MemoryRouter>
        <CardList
          data={undefined}
          isLoading={true}
          error={undefined}
          page={1}
          setPage={mockSetPage}
        />
      </MemoryRouter>
    );

    expect(screen.getByText(/Please be patient/i)).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders skeleton cards when isLoading is true', () => {
    renderWithProviders(
      <MemoryRouter>
        <CardList
          data={undefined}
          isLoading={true}
          error={undefined}
          page={1}
          setPage={mockSetPage}
        />
      </MemoryRouter>
    );

    expect(screen.getAllByTestId('skeleton-card').length).toBeGreaterThan(0);
  });

  it('renders error message when error occurs', () => {
    const error = { status: 500, data: { message: 'Test error' } };
    renderWithProviders(
      <MemoryRouter>
        <CardList
          data={undefined}
          isLoading={false}
          error={error}
          page={1}
          setPage={mockSetPage}
        />
      </MemoryRouter>
    );

    expect(screen.getByText('Test error')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /go back/i })
    ).toBeInTheDocument();
  });

  it('renders no cards message when data has no cards', () => {
    renderWithProviders(
      <MemoryRouter>
        <CardList
          data={{ cards: null, total_count: 0, total_pages: 0, page: 1 }}
          isLoading={false}
          error={undefined}
          page={1}
          setPage={mockSetPage}
        />
      </MemoryRouter>
    );

    expect(screen.getByText(/No cards found/i)).toBeInTheDocument();
  });

  it('renders cards and pagination when data is available', () => {
    renderWithProviders(
      <MemoryRouter>
        <CardList
          data={mockCards}
          isLoading={false}
          error={undefined}
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
    const multiPageData = { ...mockCards, total_pages: 2 };
    renderWithProviders(
      <MemoryRouter>
        <CardList
          data={multiPageData}
          isLoading={false}
          error={undefined}
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
    mockUseNavigation.mockReturnValue({ state: 'loading' } as Navigation);

    renderWithProviders(
      <MemoryRouter>
        <CardList
          data={mockCards}
          isLoading={false}
          error={undefined}
          page={1}
          setPage={mockSetPage}
        />
      </MemoryRouter>
    );

    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders Outlet in normal state', () => {
    renderWithProviders(
      <MemoryRouter>
        <CardList
          data={mockCards}
          isLoading={false}
          error={undefined}
          page={1}
          setPage={mockSetPage}
        />
      </MemoryRouter>
    );

    expect(screen.getByText('Outlet')).toBeInTheDocument();
  });

  it('calls navigate(-1) when Go Back button is clicked in error state', async () => {
    const error = { status: 500, data: { message: 'Test error' } };
    renderWithProviders(
      <MemoryRouter>
        <CardList
          data={undefined}
          isLoading={false}
          error={error}
          page={1}
          setPage={mockSetPage}
        />
      </MemoryRouter>
    );

    await userEvent.click(screen.getByRole('button', { name: /go back/i }));
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  it('scrolls to top when page changes', () => {
    const { rerender } = renderWithProviders(
      <MemoryRouter>
        <CardList
          data={mockCards}
          isLoading={false}
          error={undefined}
          page={1}
          setPage={mockSetPage}
        />
      </MemoryRouter>
    );

    rerender(
      <MemoryRouter>
        <CardList
          data={mockCards}
          isLoading={false}
          error={undefined}
          page={2}
          setPage={mockSetPage}
        />
      </MemoryRouter>
    );

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    });
  });
});
