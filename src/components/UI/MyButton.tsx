import React from 'react';

interface MyButtonProps {
  className?: string;
  callback?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'submit' | 'button';
  children: React.ReactNode;
}

class MyButton extends React.PureComponent<MyButtonProps> {
  render() {
    const { className = '', callback, children, type = 'button' } = this.props;
    return (
      <button
        className={`px-5 py-2.5 rounded-xl bg-red-400 text-white md:hover:bg-red-300 md:duration-300 md:active:translate-y-0.5 shadow-lg md:shadow-red-300/50 md:active:shadow-none ${className}`}
        onClick={callback}
        type={type}
      >
        {children}
      </button>
    );
  }
}

export default MyButton;
