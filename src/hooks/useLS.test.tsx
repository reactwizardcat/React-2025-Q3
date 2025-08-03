import { renderHook, act } from '@testing-library/react';
import { useLS } from './useLS';

vi.mock('../constants', () => ({
  STORAGE_KEY: 'test_storage_key',
}));

describe('useLS hook', () => {
  let mockStorage: Record<string, string> = {};

  beforeEach(() => {
    global.localStorage = {
      getItem: vi.fn((key: string) => mockStorage[key] || null),
      setItem: vi.fn((key: string, value: string) => {
        mockStorage[key] = value;
      }),
      clear: vi.fn(() => {
        mockStorage = {};
      }),
      length: 0,
      key: vi.fn(),
    } as unknown as Storage;
  });

  afterEach(() => {
    mockStorage = {};
    vi.clearAllMocks();
  });

  it('should initialize with empty string when localStorage is empty', () => {
    const { result } = renderHook(() => useLS());

    expect(result.current[0]).toBe('');
    expect(localStorage.getItem).toHaveBeenCalledWith('test_storage_key');
  });

  it('should initialize with value from localStorage', () => {
    mockStorage['test_storage_key'] = 'saved_value';

    const { result } = renderHook(() => useLS());

    expect(result.current[0]).toBe('saved_value');
    expect(localStorage.getItem).toHaveBeenCalledWith('test_storage_key');
  });

  it('should update localStorage when value changes', () => {
    const { result } = renderHook(() => useLS());

    act(() => {
      result.current[1]('new_value');
    });

    expect(result.current[0]).toBe('new_value');
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'test_storage_key',
      'new_value'
    );
    expect(mockStorage['test_storage_key']).toBe('new_value');
  });

  it('should handle function updates', () => {
    mockStorage['test_storage_key'] = 'initial';

    const { result } = renderHook(() => useLS());

    act(() => {
      result.current[1]((prev) => `${prev}_updated`);
    });

    expect(result.current[0]).toBe('initial_updated');
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'test_storage_key',
      'initial_updated'
    );
  });

  it('should return stable setValue function', () => {
    const { result, rerender } = renderHook(() => useLS());

    const firstSetValue = result.current[1];
    rerender();

    expect(result.current[1]).toBe(firstSetValue);
  });
});
