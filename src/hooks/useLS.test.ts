import { renderHook, act } from '@testing-library/react';
import { useLS } from './useLS';

describe('useLS hook', () => {
  let mockStorage: Record<string, string> = {};

  beforeEach(() => {
    mockStorage = {};

    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(
      (key: string) => mockStorage[key] || null
    );
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(
      (key: string, value: string) => {
        mockStorage[key] = value;
      }
    );
    vi.spyOn(Storage.prototype, 'clear').mockImplementation(() => {
      mockStorage = {};
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should initialize with empty string when localStorage is empty', () => {
    const testKey = 'test_key';
    const { result } = renderHook(() => useLS(testKey));

    expect(result.current[0]).toBe('');
    expect(localStorage.getItem).toHaveBeenCalledWith(testKey);
  });

  it('should initialize with value from localStorage', () => {
    const testKey = 'test_key';
    mockStorage[testKey] = 'saved_value';

    const { result } = renderHook(() => useLS(testKey));

    expect(result.current[0]).toBe('saved_value');
    expect(localStorage.getItem).toHaveBeenCalledWith(testKey);
  });

  it('should update localStorage when value changes', () => {
    const testKey = 'test_key';
    const { result } = renderHook(() => useLS(testKey));

    act(() => {
      result.current[1]('new_value');
    });

    expect(result.current[0]).toBe('new_value');
    expect(localStorage.setItem).toHaveBeenCalledWith(testKey, 'new_value');
    expect(mockStorage[testKey]).toBe('new_value');
  });

  it('should handle function updates', () => {
    const testKey = 'test_key';
    mockStorage[testKey] = 'initial';

    const { result } = renderHook(() => useLS(testKey));

    act(() => {
      result.current[1]((prev) => `${prev}_updated`);
    });

    expect(result.current[0]).toBe('initial_updated');
    expect(localStorage.setItem).toHaveBeenCalledWith(
      testKey,
      'initial_updated'
    );
  });

  it('should return stable setValue function', () => {
    const testKey = 'test_key';
    const { result, rerender } = renderHook(() => useLS(testKey));

    const firstSetValue = result.current[1];
    rerender();

    expect(result.current[1]).toBe(firstSetValue);
  });
});
