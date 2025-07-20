import { API_URL } from '../constants';
import { mockCards } from '../mocks/mockCards';
import ApiService from './apiService';
import type { HttpClient } from './httpClient';

const createMockHttpClient = (): HttpClient & {
  get: ReturnType<typeof vi.fn>;
} => ({
  get: vi.fn(),
});

const mockHttpClient = createMockHttpClient();

describe('ApiService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    ApiService.clearInstance();
    mockHttpClient.get.mockResolvedValue(mockCards);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should create singleton instance', () => {
    const instance1 = ApiService.getInstance();
    const instance2 = ApiService.getInstance();
    expect(instance1).toBe(instance2);
  });

  it('should fetch cards with correct parameters', async () => {
    const service = ApiService.getInstance(mockHttpClient);
    const result = await service.fetchCards('Mondstadt');

    expect(mockHttpClient.get).toHaveBeenCalledWith(`${API_URL}/cards`, {
      signal: expect.any(AbortSignal),
      params: { search: 'Mondstadt' },
    });
    expect(result).toEqual(mockCards);
  });

  it('should return cards with correct structure', async () => {
    const service = ApiService.getInstance(mockHttpClient);
    const result = await service.fetchCards();

    expect(result.cards).toHaveLength(2);
    expect(result.total_count).toBe(2);
    expect(result.total_pages).toBe(1);
  });

  it('should abort previous request', async () => {
    const service = ApiService.getInstance(mockHttpClient);
    const abortSpy = vi.spyOn(AbortController.prototype, 'abort');

    service.fetchCards('Diluc');
    await service.fetchCards('Keqing');

    expect(abortSpy).toHaveBeenCalledTimes(1);
  });

  it('should throw error for invalid data', async () => {
    mockHttpClient.get.mockResolvedValueOnce({ invalid: 'data' });
    const service = ApiService.getInstance(mockHttpClient);

    await expect(service.fetchCards()).rejects.toThrow(
      'Incorrect response data'
    );
  });

  it('should handle empty response', async () => {
    mockHttpClient.get.mockResolvedValueOnce(null);
    const service = ApiService.getInstance(mockHttpClient);

    await expect(service.fetchCards()).rejects.toThrow(
      'Incorrect response data'
    );
  });

  it('should abort current request', () => {
    const service = ApiService.getInstance(mockHttpClient);
    const abortSpy = vi.spyOn(AbortController.prototype, 'abort');

    service.fetchCards();
    service.abort();

    expect(abortSpy).toHaveBeenCalled();
  });
});
