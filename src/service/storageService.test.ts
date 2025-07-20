import { describe, it, expect, beforeEach, vi } from 'vitest';
import StorageService from './storageService';
import { STORAGE_KEY } from '../constants';

describe('StorageService', () => {
  const TEST_VALUE = 'test_value';

  const mockStorage = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  };
  beforeAll(() => {
    vi.stubGlobal('localStorage', mockStorage);
  });

  beforeEach(() => {
    StorageService.clearInstance();
    vi.clearAllMocks();

    mockStorage.getItem.mockReturnValue(null);
  });

  afterAll(() => {
    vi.unstubAllGlobals();
  });

  it('should return the same instance on multiple getInstance() calls', () => {
    const instance1 = StorageService.getInstance();
    const instance2 = StorageService.getInstance();
    expect(instance1).toBe(instance2);
  });

  it('should create new instance after clearInstance()', () => {
    const instance1 = StorageService.getInstance();
    StorageService.clearInstance();
    const instance2 = StorageService.getInstance();
    expect(instance1).not.toBe(instance2);
  });

  it('should update storage when getInstance called with new storage', () => {
    const instance = StorageService.getInstance(mockStorage);
    instance.setQuery(TEST_VALUE);
    expect(mockStorage.setItem).toHaveBeenCalledWith(STORAGE_KEY, TEST_VALUE);
  });

  it('should get query from storage', () => {
    mockStorage.getItem.mockReturnValueOnce(TEST_VALUE);
    const instance = StorageService.getInstance(mockStorage);
    const result = instance.getQuery();
    expect(result).toBe(TEST_VALUE);
    expect(mockStorage.getItem).toHaveBeenCalledWith(STORAGE_KEY);
  });

  it('should return null when query not found', () => {
    const instance = StorageService.getInstance(mockStorage);
    const result = instance.getQuery();
    expect(result).toBeNull();
  });

  it('should set query to storage', () => {
    const instance = StorageService.getInstance(mockStorage);
    instance.setQuery(TEST_VALUE);
    expect(mockStorage.setItem).toHaveBeenCalledWith(STORAGE_KEY, TEST_VALUE);
  });

  it('should remove query from storage', () => {
    const instance = StorageService.getInstance(mockStorage);
    instance.removeQuery();
    expect(mockStorage.removeItem).toHaveBeenCalledWith(STORAGE_KEY);
  });

  it('should use window.localStorage by default', () => {
    const instance = StorageService.getInstance();
    instance.setQuery(TEST_VALUE);

    expect(localStorage.setItem).toHaveBeenCalledWith(STORAGE_KEY, TEST_VALUE);
  });

  it('should allow custom storage implementation', () => {
    const customStorage = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
    };

    const instance = StorageService.getInstance(customStorage);
    instance.setQuery(TEST_VALUE);

    expect(customStorage.setItem).toHaveBeenCalledWith(STORAGE_KEY, TEST_VALUE);
    expect(window.localStorage.setItem).not.toHaveBeenCalled();
  });
});
