import { render, screen } from '@testing-library/react';
import ControlledPasswordStrength from '../ControlledPasswordStrength';

describe('ControlledPasswordStrength', () => {
  it('should return null when data is undefined', () => {
    const { container } = render(
      <ControlledPasswordStrength data={undefined} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('should return null when data is empty string', () => {
    const { container } = render(<ControlledPasswordStrength data="" />);
    expect(container.firstChild).toBeNull();
  });

  it('should show "Weak password" for passwords with only 1 condition met', () => {
    render(<ControlledPasswordStrength data="password" />);
    expect(screen.getByText('Weak password')).toBeInTheDocument();
    expect(screen.getByText('Weak password')).toHaveClass('text-orange-600');
  });

  it('should show "Medium strength" for passwords with 2 conditions met', () => {
    render(<ControlledPasswordStrength data="password123" />);
    expect(screen.getByText('Medium strength')).toBeInTheDocument();
    expect(screen.getByText('Medium strength')).toHaveClass('text-yellow-600');
  });

  it('should show "Good password" for passwords with 3 conditions met', () => {
    render(<ControlledPasswordStrength data="Password123" />);
    expect(screen.getByText('Good password')).toBeInTheDocument();
    expect(screen.getByText('Good password')).toHaveClass('text-blue-600');
  });

  it('should show "Strong password!" for passwords with all 4 conditions met', () => {
    render(<ControlledPasswordStrength data="Password123!" />);
    expect(screen.getByText('Strong password!')).toBeInTheDocument();
    expect(screen.getByText('Strong password!')).toHaveClass('text-green-600');
  });

  it('should handle edge cases and default to strong password', () => {
    const { rerender } = render(
      <ControlledPasswordStrength data="Password123!" />
    );
    const originalTest = RegExp.prototype.test;

    RegExp.prototype.test = () => true;

    rerender(<ControlledPasswordStrength data="x" />);
    expect(screen.getByText('Strong password!')).toBeInTheDocument();

    RegExp.prototype.test = originalTest;
  });
});
