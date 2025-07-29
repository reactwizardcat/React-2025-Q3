import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, useNavigate } from 'react-router';
import SideBar from './SideBarLayout';

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe('SideBar Component', () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders children correctly', () => {
    render(
      <MemoryRouter>
        <SideBar>
          <div>Test Content</div>
        </SideBar>
      </MemoryRouter>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders overlay div', () => {
    render(
      <MemoryRouter>
        <SideBar>
          <div>Test Content</div>
        </SideBar>
      </MemoryRouter>
    );

    const overlay = screen.getByRole('button', {
      hidden: true,
    });
    expect(overlay).toBeInTheDocument();
    expect(overlay).toHaveClass('fixed', 'top-0', 'left-0', 'h-full', 'w-full');
  });

  it('calls navigate(-1) when overlay is clicked', async () => {
    render(
      <MemoryRouter>
        <SideBar>
          <div>Test Content</div>
        </SideBar>
      </MemoryRouter>
    );

    const overlay = screen.getByRole('button', {
      hidden: true,
    });
    await userEvent.click(overlay);
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
