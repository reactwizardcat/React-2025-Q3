import type { CardResponse } from '../models/cards.model';
import { createURL } from './createURL';

describe('createURL', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'Blob',
      vi.fn().mockImplementation((content, options) => ({
        content,
        options,
      }))
    );

    vi.stubGlobal('URL', {
      createObjectURL: vi.fn().mockReturnValue('blob:mock-url'),
      revokeObjectURL: vi.fn(),
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  it('should handle empty data and return an empty Blob URL', () => {
    const result = createURL({});

    expect(Blob).toHaveBeenCalledWith([''], {
      type: 'text/csv;charset=utf-8;',
    });
    expect(URL.createObjectURL).toHaveBeenCalledWith({
      content: [''],
      options: { type: 'text/csv;charset=utf-8;' },
    });
    expect(result).toEqual('blob:mock-url');
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

    const result = createURL(singleData);

    expect(Blob).toHaveBeenCalledWith([expectedCSV], {
      type: 'text/csv;charset=utf-8;',
    });
    expect(URL.createObjectURL).toHaveBeenCalledWith({
      content: [expectedCSV],
      options: { type: 'text/csv;charset=utf-8;' },
    });
    expect(result).toEqual('blob:mock-url');
  });
});
