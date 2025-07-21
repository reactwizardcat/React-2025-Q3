import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, cleanup, act } from '@testing-library/react';
import Cards from './Cards';
import type { CardsResponse } from '../models/cards.model';
import { mockCards, mockEmptyResponse } from '../mocks/mockCards';

const mockApiService = {
  fetchCards: vi
    .fn<(_?: string) => Promise<CardsResponse>>()
    .mockResolvedValue(mockCards),
  abort: vi.fn(),
};

vi.mock('../service/apiService', () => {
  return {
    default: {
      getInstance: vi.fn(() => {
        return mockApiService;
      }),
    },
  };
});

vi.mock('./Card', () => ({
  default: ({
    data,
  }: {
    data: { id: number; name: string; description: string };
  }) => <div data-testid="card">{data.name}</div>,
}));

vi.mock('./Loader', () => ({
  default: () => <div data-testid="loader">Loading...</div>,
}));

vi.mock('./SceletonCard', () => ({
  default: () => <div data-testid="skeleton-card">Skeleton Card</div>,
}));

vi.mock('./UI/MyButton', () => ({
  default: ({
    callback,
    children,
  }: {
    callback: () => void;
    children: React.ReactNode;
  }) => (
    <button data-testid="reload-button" onClick={callback}>
      {children}
    </button>
  ),
}));

vi.mock('../constants', () => ({
  SKELETON_ELEMENTS_COUNT: 4,
  SPINNER_DELAY: 1000,
}));

describe('Cards component test', () => {
  const mockToggleLoading = vi.fn();
  const defaultProps = {
    query: 'test',
    isLoading: false,
    toggleLoading: mockToggleLoading,
  };

  beforeEach(() => {
    vi.useFakeTimers();
    mockToggleLoading.mockReset();
    mockApiService.fetchCards.mockReset();
    mockApiService.abort.mockReset();
  });

  afterEach(async () => {
    await vi.runAllTimersAsync();
    vi.useRealTimers();
    cleanup();
  });

  it('displays skeleton cards when isLoading is true', async () => {
    mockApiService.fetchCards.mockResolvedValue(mockCards);

    await act(async () => {
      render(<Cards {...defaultProps} isLoading={true} />);
    });

    const skeletonCards = screen.getAllByTestId('skeleton-card');
    expect(skeletonCards).toHaveLength(4);

    expect(screen.queryByTestId('real-card')).not.toBeInTheDocument();
  });

  it("displays Loader if don't get response while SPINNER_DELAY", async () => {
    mockApiService.fetchCards.mockImplementation(
      () =>
        new Promise<CardsResponse>((resolve) =>
          setTimeout(() => resolve(mockCards), 2000)
        )
    );

    await act(async () => {
      render(<Cards {...defaultProps} isLoading={true} />);
    });
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(screen.queryByTestId('loader')).toBeVisible();
  });

  it('shows error message when fetch fails', async () => {
    const errorMessage = 'Network error';
    mockApiService.fetchCards.mockRejectedValue(new Error(errorMessage));

    await act(async () => {
      render(<Cards {...defaultProps} />);
    });

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(screen.getByTestId('reload-button')).toBeInTheDocument();
  });

  it('shows "No cards found" when data is empty', async () => {
    mockApiService.fetchCards.mockResolvedValue(mockEmptyResponse);

    await act(async () => {
      render(<Cards {...defaultProps} />);
    });
    expect(screen.getByText(/No cards found/)).toBeInTheDocument();
  });
});
