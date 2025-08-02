import type { CardResponse } from '../models/cards.model';
import { downloadCSV } from './downloadToCSV';

const mockData: Record<number, CardResponse> = {
  1: {
    id: 1,
    name: 'Diluc',
    element: 'Pyro',
    region: 'Mondstadt',
    weapon: 'Claymore',
    images: { large: '', small: '' },
  },
  2: {
    id: 2,
    name: 'Jean',
    element: 'Anemo',
    region: 'Mondstadt',
    weapon: 'Sword',
    images: { large: '', small: '' },
  },
};

const mockCreateObjectURL = vi.fn();
const mockRevokeObjectURL = vi.fn();

vi.stubGlobal('URL', {
  createObjectURL: mockCreateObjectURL,
  revokeObjectURL: mockRevokeObjectURL,
});

vi.stubGlobal('Blob', vi.fn());

describe('downloadCSV', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should handle empty data and return an empty Blob URL', () => {
    const mockBlob = {};
    const mockUrl = 'blob:http://example.com/empty';
    mockCreateObjectURL.mockReturnValue(mockUrl);

    const result = downloadCSV({});

    expect(Blob).toHaveBeenCalledWith([''], {
      type: 'text/csv;charset=utf-8;',
    });
    expect(mockCreateObjectURL).toHaveBeenCalledWith(mockBlob);
    expect(result).toEqual({
      url: mockUrl,
      clearUrl: expect.any(Function),
    });

    result.clearUrl();
    expect(mockRevokeObjectURL).toHaveBeenCalledWith(mockUrl);
  });

  it('should generate a CSV for non-empty data and return a Blob URL', () => {
    const expectedCSV =
      'id,name,element,region,weapon\n' +
      '1,Diluc,Pyro,Mondstadt,Claymore\n' +
      '2,Jean,Anemo,Mondstadt,Sword';
    const mockBlob = {};
    const mockUrl = 'blob:http://example.com/data';
    mockCreateObjectURL.mockReturnValue(mockUrl);

    const result = downloadCSV(mockData);

    expect(Blob).toHaveBeenCalledWith([expectedCSV], {
      type: 'text/csv;charset=utf-8;',
    });
    expect(mockCreateObjectURL).toHaveBeenCalledWith(mockBlob);
    expect(result).toEqual({
      url: mockUrl,
      clearUrl: expect.any(Function),
    });

    result.clearUrl();
    expect(mockRevokeObjectURL).toHaveBeenCalledWith(mockUrl);
  });

  it('should handle special characters in CSV correctly', () => {
    const specialData: Record<number, CardResponse> = {
      1: {
        id: 1,
        name: 'Keqing, Thunder',
        element: 'Electro',
        region: 'Liyue, Harbor',
        weapon: 'Sword',
        images: { large: '', small: '' },
      },
    };

    const expectedCSV =
      'id,name,element,region,weapon\n1,Keqing, Thunder,Electro,Liyue, Harbor,Sword';
    const mockBlob = {};
    const mockUrl = 'blob:http://example.com/special';
    mockCreateObjectURL.mockReturnValue(mockUrl);

    const result = downloadCSV(specialData);

    expect(Blob).toHaveBeenCalledWith([expectedCSV], {
      type: 'text/csv;charset=utf-8;',
    });
    expect(mockCreateObjectURL).toHaveBeenCalledWith(mockBlob);
    expect(result).toEqual({
      url: mockUrl,
      clearUrl: expect.any(Function),
    });
  });

  it('should exclude the images property in CSV', () => {
    const singleData: Record<number, CardResponse> = {
      1: {
        id: 1,
        name: 'Diluc',
        element: 'Pyro',
        region: 'Mondstadt',
        weapon: 'Claymore',
        images: { large: 'large.png', small: 'small.png' },
      },
    };

    const expectedCSV =
      'id,name,element,region,weapon\n1,Diluc,Pyro,Mondstadt,Claymore';
    const mockBlob = {};
    const mockUrl = 'blob:http://example.com/exclude';
    mockCreateObjectURL.mockReturnValue(mockUrl);

    const result = downloadCSV(singleData);

    expect(Blob).toHaveBeenCalledWith([expectedCSV], {
      type: 'text/csv;charset=utf-8;',
    });
    expect(mockCreateObjectURL).toHaveBeenCalledWith(mockBlob);
    expect(result).toEqual({
      url: mockUrl,
      clearUrl: expect.any(Function),
    });
  });
});
