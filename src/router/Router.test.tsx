import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter, Outlet } from 'react-router';
import { router } from './Router';
import { fetchCard } from '../api/fetchCard';
import type { CardResponse } from '../models/cards.model';

vi.mock('../api/fetchCard');
vi.mock('../App.tsx', () => ({
  default: vi.fn().mockImplementation(() => (
    <div>
      <div>App Component</div>
      <Outlet />
    </div>
  )),
}));
vi.mock('../components/DetailCard.tsx', () => ({
  default: () => <div>DetailCard Component</div>,
}));
vi.mock('../pages/NotFoundPage.tsx', () => ({
  default: () => <div>NotFoundPage Component</div>,
}));
vi.mock('../pages/AboutPage.tsx', () => ({
  default: () => <div>AboutPage Component</div>,
}));

const mockImage = 'https://example.com/image.jpg';

const mockCardData: CardResponse = {
  id: 1,
  name: 'Diluc',
  element: 'Pyro',
  region: 'Mondstadt',
  weapon: 'Claymore',
  images: {
    large: mockImage,
    small: '',
  },
};

describe('Router Configuration', () => {
  it('should redirect root path to /search/1', async () => {
    const memoryRouter = createMemoryRouter(router.routes, {
      initialEntries: ['/'],
    });

    render(<RouterProvider router={memoryRouter} />);

    expect(memoryRouter.state.location.pathname).toBe('/search/1');
  });

  it('should redirect /search to /search/1', async () => {
    const memoryRouter = createMemoryRouter(router.routes, {
      initialEntries: ['/search'],
    });

    render(<RouterProvider router={memoryRouter} />);

    expect(memoryRouter.state.location.pathname).toBe('/search/1');
  });

  it('should render App component for /search/:search', async () => {
    const memoryRouter = createMemoryRouter(router.routes, {
      initialEntries: ['/search/test'],
    });

    render(<RouterProvider router={memoryRouter} />);

    expect(screen.getByText('App Component')).toBeInTheDocument();
  });

  it('should render DetailCard with loader for /search/:search/:id', async () => {
    vi.mocked(fetchCard).mockResolvedValue(mockCardData);

    const memoryRouter = createMemoryRouter(router.routes, {
      initialEntries: ['/search/test/1'],
    });

    render(<RouterProvider router={memoryRouter} />);

    expect(await screen.findByText('DetailCard Component')).toBeInTheDocument();
    expect(fetchCard).toHaveBeenCalledWith(1);
  });

  it('should render AboutPage for /about', async () => {
    const memoryRouter = createMemoryRouter(router.routes, {
      initialEntries: ['/about'],
    });

    render(<RouterProvider router={memoryRouter} />);

    expect(screen.getByText('AboutPage Component')).toBeInTheDocument();
  });

  it('should render NotFoundPage for unknown routes', async () => {
    const memoryRouter = createMemoryRouter(router.routes, {
      initialEntries: ['/unknown'],
    });

    render(<RouterProvider router={memoryRouter} />);

    expect(screen.getByText('NotFoundPage Component')).toBeInTheDocument();
  });
});
