import React from 'react';

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
        className={`px-5 py-2.5 rounded-xl bg-red-600 text-white md:enabled:hover:bg-red-500 md:duration-300 md:enabled:active:translate-y-0.5 shadow-lg md:shadow-red-300/50 md:enabled:active:shadow-none ${className} disabled:bg-gray-300 disabled:text-black`}
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
