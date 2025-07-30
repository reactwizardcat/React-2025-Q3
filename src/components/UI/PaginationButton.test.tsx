import PaginationButton from './PaginationButton';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('PaginationButton component tests', () => {
  const text = '1';
  const page = 1;
  const currentPage = 1;
  const mockOnClick = vi.fn();

  it('renders the button with the correct text', () => {
    render(
      <PaginationButton
        page={page}
        currentPage={currentPage}
        onClick={mockOnClick}
      >
        {text}
      </PaginationButton>
    );
    expect(screen.getByText(text)).toBeVisible();
  });

  it('should apply additional className', () => {
    const testClass = 'test-class';
    render(
      <PaginationButton
        page={page}
        currentPage={currentPage}
        onClick={mockOnClick}
        className={testClass}
      >
        {text}
      </PaginationButton>
    );
    expect(screen.getByRole('button')).toHaveClass(testClass);
  });

  it('calls onClick handler when clicked', async () => {
    const handleClick = vi.fn();
    render(
      <PaginationButton page={2} currentPage={1} onClick={handleClick}>
        {text}
      </PaginationButton>
    );
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should be disabled and not call onClick when currentPage equals page', async () => {
    const handleClick = vi.fn();
    render(
      <PaginationButton page={1} currentPage={1} onClick={handleClick}>
        {text}
      </PaginationButton>
    );

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();

    await userEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('should have correct disabled styles when currentPage equals page', () => {
    render(
      <PaginationButton page={1} currentPage={1} onClick={mockOnClick}>
        {text}
      </PaginationButton>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveClass('disabled:cursor-not-allowed');
    expect(button).toHaveClass('disabled:opacity-60');
  });
});
