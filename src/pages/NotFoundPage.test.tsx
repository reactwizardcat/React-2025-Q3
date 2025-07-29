import { render, screen } from '@testing-library/react';
import NotFoundPage from './NotFoundPage';
import { vi } from 'vitest';
import { MemoryRouter, useLocation } from 'react-router';

vi.mock('react-router', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router')>();
  const mockUseLocation = vi.fn();
  const MockLink = vi
    .fn()
    .mockImplementation(({ to, children }) => <a href={to}>{children}</a>);

  return {
    ...actual,
    useLocation: mockUseLocation,
    Link: MockLink,
  };
});

describe('NotFoundPage', () => {
  const mockUseLocation = vi.mocked(useLocation);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const createMockLocation = (state: unknown) => ({
    state,
    pathname: '/test',
    key: 'test-key',
    search: '',
    hash: '',
  });

  it('should render correctly with default back link', () => {
    mockUseLocation.mockReturnValue(createMockLocation(null));

    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

    expect(screen.getByText('This page does not exist.')).toBeInTheDocument();
    const backLink = screen.getByRole('link', { name: 'Go back' });
    expect(backLink).toBeInTheDocument();
    expect(backLink).toHaveAttribute('href', '/');
  });

  it('should use the from state when available', () => {
    mockUseLocation.mockReturnValue(
      createMockLocation({ from: '/previous-page' })
    );

    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

    const backLink = screen.getByRole('link', { name: 'Go back' });
    expect(backLink).toHaveAttribute('href', '/previous-page');
  });

  it('should match snapshot', () => {
    mockUseLocation.mockReturnValue(createMockLocation(null));

    const { container } = render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
  });
});
