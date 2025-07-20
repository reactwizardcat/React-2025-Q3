import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ErrorBoundary from './ErrorBoundary';

describe('error boundary component tests', () => {
  beforeAll(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

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

  it('handle error in render', async () => {
    render(
      <ErrorBoundary>
        <MockErrorComponent />
      </ErrorBoundary>
    );
    expect(console.error).toHaveBeenCalled();
    expect(screen.getByText(errorMsg)).toBeInTheDocument();
    const restoreBtn = screen.getByRole('button', { name: 'Reload' });
    await userEvent.click(restoreBtn);
    render(
      <ErrorBoundary>
        <MockGoodComponent />
      </ErrorBoundary>
    );
    expect(screen.getByText(/I'm fine/)).toBeVisible();
  });
});
