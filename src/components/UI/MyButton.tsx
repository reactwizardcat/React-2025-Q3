import React from 'react';
import { cn } from '../../utils/cn';

interface MyButtonProps {
  className?: string;
  callback?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'submit' | 'button';
  disabled?: boolean;
  children: React.ReactNode;
}

class MyButton extends React.PureComponent<MyButtonProps> {
  render() {
    const {
      className = '',
      callback,
      children,
      type = 'button',
      disabled,
    } = this.props;
    return (
      <button
        className={cn(
          'rounded-xl bg-red-600 px-5 py-2.5 text-white',
          'md:duration-300 md:enabled:hover:bg-red-500 md:enabled:active:translate-y-0.5',
          'shadow-lg md:enabled:shadow-red-300/50 md:enabled:active:shadow-none md:disabled:shadow-gray-300/50',
          className,
          'disabled:bg-gray-300 disabled:text-black'
        )}
        onClick={callback}
        type={type}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }
}

export default MyButton;
