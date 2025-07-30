import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import SideBarLayout from './SideBarLayout';

vi.mock('react-router', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router')>();
  return {
    ...actual,
    Link: vi.fn().mockImplementation(({ to, children, ...props }) => (
      <a href={to} {...props}>
        {children}
      </a>
    )),
  };
});

describe('SideBar Component', () => {
  it('renders children correctly', () => {
    render(
      <MemoryRouter>
        <SideBarLayout>
          <div>Test Content</div>
        </SideBarLayout>
      </MemoryRouter>
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders overlay link with correct attributes', () => {
    render(
      <MemoryRouter>
        <SideBarLayout>
          <div>Test Content</div>
        </SideBarLayout>
      </MemoryRouter>
    );

    const overlay = screen.getByRole('link');
    expect(overlay).toBeInTheDocument();
    expect(overlay).toHaveClass(
      'fixed top-0 left-0 h-full w-full cursor-pointer bg-black/30'
    );
  });

  it('renders aside element with correct classes', () => {
    render(
      <MemoryRouter>
        <SideBarLayout>
          <div>Test Content</div>
        </SideBarLayout>
      </MemoryRouter>
    );

    const aside = screen.getByRole('complementary');
    expect(aside).toBeInTheDocument();
    expect(aside).toHaveClass(
      'group sticky top-4 my-4 mr-4 flex h-[75vh] w-full flex-col transition-all hover:grow-[1.25]',
      'justify-center self-start rounded-lg bg-white align-middle shadow-md md:w-1/4'
    );
  });
});
