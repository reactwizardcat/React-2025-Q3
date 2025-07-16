import React from 'react';
import MyButton from './UI/MyButton';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  reload = () => {
    this.setState({ hasError: false });
  };

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    this.setState({ error, errorInfo });
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render(): React.ReactNode {
    const { hasError, error } = this.state;
    const { children, fallback } = this.props;

    if (hasError) {
      return (
        fallback || (
          <div className="flex flex-1 flex-col gap-2.5 items-center justify-center">
            <h1 className="text-2xl">Something went wrong.</h1>
            {error && <p className="text-red-400">{error.message}</p>}
            <MyButton callback={this.reload}>Reload</MyButton>
          </div>
        )
      );
    }

    return children;
  }
}

export default ErrorBoundary;
