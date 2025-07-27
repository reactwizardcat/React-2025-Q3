import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, cleanup, act } from '@testing-library/react';
import Cards from './Cards';
import type { CardsResponse } from '../models/cards.model';
import { mockCards, mockEmptyResponse } from '../mocks/mockCards';

const mockfetchCards = vi
  .fn<(_?: string) => Promise<CardsResponse>>()
  .mockResolvedValue(mockCards);

vi.mock('../api/fetchCards', () => {
  return {
    mockfetchCards,
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

vi.mock('./SkeletonCard', () => ({
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
    page: 1,
    setPage: vi.fn(),
    setIsLoading: mockToggleLoading,
  };

  beforeEach(() => {
    vi.useFakeTimers();
    mockToggleLoading.mockReset();
    mockfetchCards.mockReset();
  });

  afterEach(async () => {
    await vi.runAllTimersAsync();
    vi.useRealTimers();
    cleanup();
  });

  it('displays skeleton cards when isLoading is true', () => {
    mockfetchCards.mockResolvedValue(mockCards);

    render(<Cards {...defaultProps} isLoading={true} />);

    const skeletonCards = screen.getAllByTestId('skeleton-card');
    expect(skeletonCards).toHaveLength(4);

    expect(screen.queryByTestId('card')).not.toBeInTheDocument();
  });

  it("displays Loader if don't get response while SPINNER_DELAY", async () => {
    mockfetchCards.mockImplementation(
      () =>
        new Promise<CardsResponse>((resolve) =>
          setTimeout(() => resolve(mockCards), 2000)
        )
    );

    render(<Cards {...defaultProps} isLoading={true} />);

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(screen.queryByTestId('loader')).toBeVisible();
  });

  it('shows error message when fetch fails', async () => {
    const errorMessage = 'Network error';

    mockfetchCards.mockRejectedValue(new Error(errorMessage));
    await act(async () => {
      render(<Cards {...defaultProps} />);
    });
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(screen.getByTestId('reload-button')).toBeInTheDocument();
  });

  it('shows "No cards found" when data is empty', () => {
    mockfetchCards.mockResolvedValue(mockEmptyResponse);

    render(<Cards {...defaultProps} />);
    expect(screen.getByText(/No cards found/)).toBeInTheDocument();
  });
});
