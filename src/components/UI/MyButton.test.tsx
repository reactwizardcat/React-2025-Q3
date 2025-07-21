import MyButton from './MyButton';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('button component tests', () => {
  const text = 'Click Me';

  it('renders the button with the correct text', () => {
    render(<MyButton>{text}</MyButton>);
    expect(screen.getByText(text)).toBeVisible();
  });

  it('should apply additional className', () => {
    const testClass = 'test-class';
    render(<MyButton className={testClass}>{text}</MyButton>);
    expect(screen.getByRole('button')).toHaveClass(testClass);
  });

  it('calls the click handler when clicked', async () => {
    const handleClick = vi.fn();
    render(<MyButton callback={handleClick}>{text}</MyButton>);
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should not call callback when disabled', async () => {
    const handleClick = vi.fn();
    render(
      <MyButton disabled callback={handleClick}>
        {text}
      </MyButton>
    );
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });
});
