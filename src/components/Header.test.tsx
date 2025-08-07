import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Header from './Header';
import { useTheme } from '../hooks/useTheme';
import userEvent from '@testing-library/user-event';

vi.mock('../utils/cn', () => ({
  cn: vi.fn().mockImplementation((...args) => args.join(' ')),
}));

vi.mock('../hooks/useTheme', () => ({
  useTheme: vi.fn(() => ({
    theme: false,
    toggleTheme: vi.fn(),
  })),
}));

describe('Header', () => {
  it('renders correctly with children', () => {
    render(
      <MemoryRouter>
        <Header refresh={vi.fn()}>
          <div>Test Children</div>
        </Header>
      </MemoryRouter>
    );

    expect(screen.getByText('Test Children')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('applies active styles to About link when on /about', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <Header refresh={vi.fn()} />
      </MemoryRouter>
    );

    const aboutLink = screen.getByText('About');
    const homeLink = screen.getByText('Home');

    expect(aboutLink).toHaveClass('pointer-events-none');
    expect(homeLink).not.toHaveClass('pointer-events-none');
  });

  it('applies active styles to Home link when on /search', () => {
    render(
      <MemoryRouter initialEntries={['/search']}>
        <Header refresh={vi.fn()} />
      </MemoryRouter>
    );

    const aboutLink = screen.getByText('About');
    const homeLink = screen.getByText('Home');

    expect(homeLink).toHaveClass('pointer-events-none');
    expect(aboutLink).not.toHaveClass('pointer-events-none');
  });

  it('toggles theme when checkbox is clicked', async () => {
    const mockToggleTheme = vi.fn();
    vi.mocked(useTheme).mockReturnValue({
      theme: false,
      toggleTheme: mockToggleTheme,
    });

    render(
      <MemoryRouter>
        <Header refresh={vi.fn()} />
      </MemoryRouter>
    );

    const toggle = screen.getByRole('checkbox');
    await userEvent.click(toggle);
    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });

  it('displays correct theme toggle icon based on theme', () => {
    vi.mocked(useTheme).mockReturnValue({
      theme: false,
      toggleTheme: vi.fn(),
    });

    const { rerender } = render(
      <MemoryRouter>
        <Header refresh={vi.fn()} />
      </MemoryRouter>
    );

    expect(screen.getByRole('checkbox')).not.toBeChecked();

    vi.mocked(useTheme).mockReturnValue({
      theme: true,
      toggleTheme: vi.fn(),
    });

    rerender(
      <MemoryRouter>
        <Header refresh={vi.fn()} />
      </MemoryRouter>
    );

    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('matches snapshot', () => {
    const { container } = render(
      <MemoryRouter>
        <Header refresh={vi.fn()} />
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
  });
});
