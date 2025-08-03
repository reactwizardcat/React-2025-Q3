import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ErrorButton from './ErrorButton';

describe('ErrorButton component', () => {
  beforeAll(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  const MockErrorBoundary = () => {
    try {
      return <ErrorButton />;
    } catch (e) {
      if (e instanceof Error) {
        return <div>Error caught!</div>;
      }
    }
  };

  it('renders button correctly', () => {
    render(<ErrorButton />);

    const button = screen.getByRole('button', { name: 'Error Boundary' });
    expect(button).toBeInTheDocument();
  });

  it('throws error when clicked', async () => {
    render(<MockErrorBoundary />);

    const button = screen.getByRole('button', { name: 'Error Boundary' });
    const user = userEvent.setup();

    await expect(async () => {
      await user.click(button);
    }).rejects.toThrow("💥 I'm error");
  });

  it('matches snapshot', () => {
    const { container } = render(<ErrorButton />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
