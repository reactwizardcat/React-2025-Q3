import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { myFetch } from './myFetch';
import { isValidData } from '../utils/validator';
import { abortFetchCards, fetchCards } from './fetchCards';
import { API_URL } from '../constants';

vi.mock('./myFetch');
vi.mock('../utils/validator');

const mockedMyFetch = vi.mocked(myFetch);
const mockedIsValidData = vi.mocked(isValidData);

const mockCardsResponse = {
  cards: [
    { id: 1, name: 'Card 1' },
    { id: 2, name: 'Card 2' },
  ],
  total: 2,
  page: 1,
};

describe('fetchCards', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mockedMyFetch.mockResolvedValue(mockCardsResponse);
    mockedIsValidData.mockReturnValue(true);
  });

  afterEach(() => {
    abortFetchCards();
  });

  describe('basic functionality', () => {
    it('should make a request to the correct URL without params', async () => {
      await fetchCards('', 1);
      expect(mockedMyFetch).toHaveBeenCalledWith(
        `${API_URL}/cards?page=1`,
        expect.anything(),
        expect.anything()
      );
    });

    it('should include search query in URL when provided', async () => {
      await fetchCards('test', 1);
      expect(mockedMyFetch).toHaveBeenCalledWith(
        `${API_URL}/cards?search=test&page=1`,
        expect.anything(),
        expect.anything()
      );
    });

    it('should include page number in URL', async () => {
      await fetchCards('', 2);
      expect(mockedMyFetch).toHaveBeenCalledWith(
        `${API_URL}/cards?page=2`,
        expect.anything(),
        expect.anything()
      );
    });

    it('should pass the signal from AbortController', async () => {
      await fetchCards('', 1);
      expect(mockedMyFetch).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({ aborted: false }),
        expect.anything()
      );
    });

    it('should return valid data', async () => {
      const result = await fetchCards('', 1);
      expect(result).toEqual(mockCardsResponse);
    });
  });

  describe('error handling', () => {
    it('should reject if data is invalid', async () => {
      mockedMyFetch.mockRejectedValue(new Error('Invalid data'));
      mockedIsValidData.mockReturnValue(false);
      await expect(fetchCards('', 1)).rejects.toThrow('Invalid data');
    });

    it('should reject if request fails', async () => {
      mockedMyFetch.mockRejectedValue(new Error('Network error'));
      await expect(fetchCards('', 1)).rejects.toThrow('Network error');
    });
  });

  describe('abort functionality', () => {
    it('should abort previous request when making new one', () => {
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
        fetchCards('', 1);
        fetchCards('', 2);
        expect(mockAbort).toHaveBeenCalled();
      } finally {
        global.AbortController = originalAbortController;
      }
    });

    it('should abort current request when abortFetchCards is called', () => {
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
        fetchCards('', 1);
        abortFetchCards();
        expect(mockAbort).toHaveBeenCalled();
      } finally {
        global.AbortController = originalAbortController;
      }
    });

    it('should not throw when aborting with no active request', () => {
      expect(() => abortFetchCards()).not.toThrow();
    });
  });

  describe('URL construction', () => {
    it('should correctly construct URL with both search and page params', async () => {
      await fetchCards('query', 3);
      expect(mockedMyFetch).toHaveBeenCalledWith(
        `${API_URL}/cards?search=query&page=3`,
        expect.anything(),
        expect.anything()
      );
    });

    it('should handle special characters in search query', async () => {
      await fetchCards('test query&value', 1);
      expect(mockedMyFetch).toHaveBeenCalledWith(
        `${API_URL}/cards?search=test+query%26value&page=1`,
        expect.anything(),
        expect.anything()
      );
    });
  });
});
