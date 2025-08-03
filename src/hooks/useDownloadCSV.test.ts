import { act, renderHook } from '@testing-library/react';
import { createURL } from '../utils/createURL';
import type { CardResponse } from '../models/cards.model';
import useDownloadCSV from './useDownloadCSV';

vi.mock('../utils/createURL', () => ({
  createURL: vi.fn(),
}));

describe('useDownloadCSV', () => {
  const mockCardData: Record<number, CardResponse> = {
    1: {
      element: 'fire',
      id: 1,
      images: {
        large: 'https://example.com/large1.jpg',
        small: 'https://example.com/small1.jpg',
      },
      name: 'Fire Warrior',
      region: 'North',
      weapon: 'Sword',
    },
  };

  const globalStub = {
    createObjectURL: vi.fn().mockReturnValue('mock-url'),
    revokeObjectURL: vi.fn(),
  };

  beforeAll(() => {
    vi.stubGlobal('URL', {
      ...URL,
      ...globalStub,
    });
    vi.mocked(createURL).mockReturnValue('mock-url');
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.unstubAllGlobals();
  });

  it('should initialize with empty download URL', () => {
    const { result } = renderHook(() => useDownloadCSV({}));

    expect(result.current.linkRef.current).toBeNull();
    expect(result.current.saveToCSV).toBeInstanceOf(Function);
  });

  it('should create and revoke object URLs properly', () => {
    const mockLink = {
      href: '',
      click: vi.fn(),
    };

    const { result, unmount } = renderHook(() => useDownloadCSV(mockCardData));

    act(() => {
      result.current.linkRef.current = mockLink as unknown as HTMLAnchorElement;
    });

    act(() => {
      result.current.saveToCSV();
    });

    expect(createURL).toHaveBeenCalledWith(mockCardData);
    expect(mockLink.href).toBe('mock-url');
    expect(mockLink.click).toHaveBeenCalled();

    act(() => {
      unmount();
    });
    expect(globalStub.revokeObjectURL).toHaveBeenCalledWith('mock-url');
  });

  it('should not throw when link ref is null', () => {
    const { result } = renderHook(() => useDownloadCSV(mockCardData));

    expect(result.current.linkRef.current).toBeNull();
    expect(() => result.current.saveToCSV()).not.toThrow();
    expect(createURL).toHaveBeenCalledWith(mockCardData);
  });

  it('should update internal data ref when props change', () => {
    const updatedData = {
      ...mockCardData,
      2: {
        element: 'water',
        id: 2,
        images: {
          large: 'https://example.com/large2.jpg',
          small: 'https://example.com/small2.jpg',
        },
        name: 'Water Mage',
        region: 'West',
        weapon: 'Staff',
      },
    };

    const { result, rerender } = renderHook(
      ({ data }) => useDownloadCSV(data),
      { initialProps: { data: mockCardData } }
    );

    result.current.saveToCSV();
    expect(createURL).toHaveBeenCalledWith(mockCardData);

    rerender({ data: updatedData });
    result.current.saveToCSV();
    expect(createURL).toHaveBeenCalledWith(updatedData);
  });
});
