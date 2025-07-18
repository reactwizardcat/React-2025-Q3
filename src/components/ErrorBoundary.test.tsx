import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';

describe('search component tests', async () => {
  vi.spyOn(console, 'error').mockImplementation(() => null);
  const errorMsg = 'mock error';
  class MockErrorComponent extends React.PureComponent {
    render() {
      throw new Error(errorMsg);
      return null;
    }
  }
  class MockGoodComponent extends React.PureComponent {
    render() {
      const text = "I'm fine";
      return <p>{text}</p>;
    }
  }
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('handle error in render', () => {
    render(
      <ErrorBoundary>
        <MockErrorComponent />
      </ErrorBoundary>
    );
    expect(console.error).toHaveBeenCalled();
    expect(screen.getByText(errorMsg)).toBeInTheDocument();
  });

  it('render childs without errors', () => {
    render(
      <ErrorBoundary>
        <MockGoodComponent />
      </ErrorBoundary>
    );
    expect(screen.getByText("I'm fine")).toBeVisible();
  });
});
