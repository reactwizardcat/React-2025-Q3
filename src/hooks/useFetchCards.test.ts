import { renderHook, act } from '@testing-library/react';
import { useFetchCards } from './useFetchCards';
import { fetchCards, abortFetchCards } from '../api/fetchCards';
import { SPINNER_DELAY } from '../constants';
import { mockCards } from '../mocks/mockCards';

vi.mock('../api/fetchCards', () => ({
  fetchCards: vi.fn(),
  abortFetchCards: vi.fn(),
}));

describe('useFetchCards', () => {
  const mockSetIsLoading = vi.fn();
  const props = {
    query: 'test',
    page: 1,
    setIsLoading: mockSetIsLoading,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should set loading states correctly on successful fetch', async () => {
    const mockData = { cards: [], total_count: 0, total_pages: 1, page: 1 };
    vi.mocked(fetchCards).mockResolvedValue(mockData);

    const { result } = renderHook(() => useFetchCards(props));

    expect(result.current.isLongLoading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(mockSetIsLoading).toHaveBeenCalledWith(true);

    await act(async () => {
      vi.advanceTimersByTime(SPINNER_DELAY + 100);
      await Promise.resolve();
    });

    expect(result.current.data).toEqual(mockData);
    expect(mockSetIsLoading).toHaveBeenCalledWith(false);
    expect(result.current.isLongLoading).toBe(false);
  });

  it('should set isLongLoading if fetch takes too long', async () => {
    vi.mocked(fetchCards).mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(() => resolve(mockCards), SPINNER_DELAY + 100)
        )
    );

    const { result } = renderHook(() => useFetchCards(props));

    expect(result.current.isLongLoading).toBe(false);
    expect(mockSetIsLoading).toHaveBeenCalledWith(true);

    act(() => {
      vi.advanceTimersByTime(SPINNER_DELAY);
    });

    expect(result.current.isLongLoading).toBe(true);
  });

  it('should handle errors correctly', async () => {
    const errorMessage = 'Test error';
    vi.mocked(fetchCards).mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useFetchCards(props));

    await act(async () => {
      vi.advanceTimersByTime(SPINNER_DELAY + 100);
      await Promise.resolve();
    });

    expect(result.current.error).toBe(errorMessage);
    expect(mockSetIsLoading).toHaveBeenCalledWith(false);
  });

  it('should abort fetch on unmount', () => {
    vi.mocked(fetchCards).mockImplementation(() => new Promise(() => {}));

    const { unmount } = renderHook(() => useFetchCards(props));
    unmount();

    expect(abortFetchCards).toHaveBeenCalled();
    expect(mockSetIsLoading).toHaveBeenCalledWith(false);
  });

  it('should reset states immediately when query changes', async () => {
    const mockData = { cards: null, total_count: 0, total_pages: 1, page: 1 };
    vi.mocked(fetchCards).mockResolvedValue(mockData);

    const { result, rerender } = renderHook((props) => useFetchCards(props), {
      initialProps: props,
    });

    await act(async () => {
      vi.advanceTimersByTime(SPINNER_DELAY + 100);
      await Promise.resolve();
    });

    expect(result.current.data).toEqual(mockData);

    act(() => {
      rerender({ ...props, query: 'new-query' });
    });

    expect(mockSetIsLoading).toHaveBeenCalledWith(true);
  });
});
