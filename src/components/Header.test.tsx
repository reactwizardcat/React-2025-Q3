import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Header from './Header';

vi.mock('../utils/cn', () => ({
  cn: vi.fn().mockImplementation((...args) => args.join(' ')),
}));

describe('Header', () => {
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

  it('applies active styles to About link when on /about', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <Header />
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
        <Header />
      </MemoryRouter>
    );

    const aboutLink = screen.getByText('About');
    const homeLink = screen.getByText('Home');

    expect(homeLink).toHaveClass('pointer-events-none');
    expect(aboutLink).not.toHaveClass('pointer-events-none');
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
