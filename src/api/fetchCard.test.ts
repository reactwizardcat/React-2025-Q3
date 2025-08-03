import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { myFetch } from './myFetch';
import { isValidCard } from '../utils/validator';
import { abortFetchCard, fetchCard } from './fetchCard';

vi.mock('./myFetch');
vi.mock('../utils/validator');

const mockedMyFetch = vi.mocked(myFetch);
const mockedIsValidCard = vi.mocked(isValidCard);

const mockCardResponse = {
  id: 1,
  title: 'Test Card',
  description: 'Test Description',
};

describe('cardsApi', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mockedMyFetch.mockResolvedValue(mockCardResponse);
    mockedIsValidCard.mockReturnValue(true);
  });

  afterEach(() => {
    abortFetchCard();
  });

  describe('fetchCard', () => {
    it('should make a request to the correct URL', async () => {
      await fetchCard(1);
      expect(mockedMyFetch).toHaveBeenCalledWith(
        expect.stringContaining('/cards/1'),
        expect.anything(),
        expect.anything()
      );
    });

    it('should pass the signal from AbortController', async () => {
      await fetchCard(1);
      expect(mockedMyFetch).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({ aborted: false }),
        expect.anything()
      );
    });

    it('should return valid data', async () => {
      const result = await fetchCard(1);
      expect(result).toEqual(mockCardResponse);
    });

    it('should reject the promise if data is invalid', async () => {
      mockedMyFetch.mockRejectedValue(new Error('Invalid card data'));
      mockedIsValidCard.mockReturnValue(false);
      await expect(fetchCard(1)).rejects.toThrow('Invalid card data');
    });

    it('should reject the promise if request fails', async () => {
      mockedMyFetch.mockRejectedValue(new Error('Network error'));
      await expect(fetchCard(1)).rejects.toThrow('Network error');
    });
  });

  describe('abortFetchCard', () => {
    it('should cancel the current request', async () => {
      const mockAbort = vi.fn();
      const mockController = {
        abort: mockAbort,
        signal: { aborted: false },
      };
      const originalAbortController = global.AbortController;

      global.AbortController = vi.fn(
        () => mockController
      ) as unknown as typeof AbortController;

      try {
        fetchCard(1);
        abortFetchCard();
        expect(mockAbort).toHaveBeenCalled();
      } finally {
        global.AbortController = originalAbortController;
      }
    });

    it('should not throw when no active request', () => {
      expect(() => abortFetchCard()).not.toThrow();
    });
  });

  it('should abort previous request when making new one', async () => {
    const mockAbort = vi.fn();
    const mockController = {
      abort: mockAbort,
      signal: { aborted: false },
    };
    const originalAbortController = global.AbortController;

    global.AbortController = vi.fn(
      () => mockController
    ) as unknown as typeof AbortController;

    try {
      fetchCard(1);
      fetchCard(2);
      expect(mockAbort).toHaveBeenCalled();
    } finally {
      global.AbortController = originalAbortController;
    }
  });
});
