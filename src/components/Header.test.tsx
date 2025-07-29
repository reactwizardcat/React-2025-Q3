import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Header from './Header';
import { vi } from 'vitest';

vi.mock('../utils/cn', () => ({
  cn: vi.fn().mockImplementation((...args) => args.join(' ')),
}));

describe('Header', () => {
  vi.mock('react-router-dom', async (importOriginal) => {
    const actual = await importOriginal<typeof import('react-router')>();
    return {
      ...actual,
      NavLink: vi.fn().mockImplementation(({ to, className, children }) => {
        const isActive =
          typeof className === 'function'
            ? className({ isActive: to === '/about' })
            : '';
        return (
          <a href={to} className={isActive}>
            {children}
          </a>
        );
      }),
    };
  });

  it('renders correctly with children', () => {
    render(
      <MemoryRouter>
        <Header>
          <div>Test Children</div>
        </Header>
      </MemoryRouter>
    );

    expect(screen.getByText('Test Children')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('applies active styles to NavLink when route matches', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <Header />
      </MemoryRouter>
    );

    const aboutLink = screen.getByText('About');
    const homeLink = screen.getByText('Home');

    expect(aboutLink.className).toContain('pointer-events-none');

    expect(homeLink.className).not.toContain('pointer-events-none');
  });

  it('matches snapshot', () => {
    const { container } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
  });
});
