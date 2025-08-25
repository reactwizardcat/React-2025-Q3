import { render, screen } from '@testing-library/react';
import UncontrolledPasswordStrength from '../UncontrolledPasswordStrength';

describe('UncontrolledPasswordStrength', () => {
  it('should show "Good password" with blue color when length is 1', () => {
    render(<UncontrolledPasswordStrength length={1} />);

    const strengthText = screen.getByText(/Strength:/);
    expect(strengthText).toBeInTheDocument();

    const goodPasswordElement = screen.getByText('Good password');
    expect(goodPasswordElement).toBeInTheDocument();
    expect(goodPasswordElement).toHaveClass('text-blue-600');
    expect(goodPasswordElement).toHaveClass('font-medium');
  });

  it('should show "Medium strength" with yellow color when length is 2', () => {
    render(<UncontrolledPasswordStrength length={2} />);

    const mediumStrengthElement = screen.getByText('Medium strength');
    expect(mediumStrengthElement).toBeInTheDocument();
    expect(mediumStrengthElement).toHaveClass('text-yellow-600');
    expect(mediumStrengthElement).toHaveClass('font-medium');
  });

  it('should show "Weak password" with orange color when length is 3', () => {
    render(<UncontrolledPasswordStrength length={3} />);

    const weakPasswordElement = screen.getByText('Weak password');
    expect(weakPasswordElement).toBeInTheDocument();
    expect(weakPasswordElement).toHaveClass('text-orange-600');
    expect(weakPasswordElement).toHaveClass('font-medium');
  });

  it('should show "Strong password!" with green color when length is 0', () => {
    render(<UncontrolledPasswordStrength length={0} />);

    const strongPasswordElement = screen.getByText('Strong password!');
    expect(strongPasswordElement).toBeInTheDocument();
    expect(strongPasswordElement).toHaveClass('text-green-600');
    expect(strongPasswordElement).toHaveClass('font-medium');
  });

  it('should show "Strong password!" with green color when length is 4', () => {
    render(<UncontrolledPasswordStrength length={4} />);

    const strongPasswordElement = screen.getByText('Strong password!');
    expect(strongPasswordElement).toBeInTheDocument();
    expect(strongPasswordElement).toHaveClass('text-green-600');
  });

  it('should show "Strong password!" with green color when length is greater than 3', () => {
    render(<UncontrolledPasswordStrength length={10} />);

    const strongPasswordElement = screen.getByText('Strong password!');
    expect(strongPasswordElement).toBeInTheDocument();
    expect(strongPasswordElement).toHaveClass('text-green-600');
  });

  it('should show "Strong password!" with green color when length is negative', () => {
    render(<UncontrolledPasswordStrength length={-5} />);

    const strongPasswordElement = screen.getByText('Strong password!');
    expect(strongPasswordElement).toBeInTheDocument();
    expect(strongPasswordElement).toHaveClass('text-green-600');
  });
});
