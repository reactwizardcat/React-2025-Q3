import { http } from 'msw';
import { mockCards } from '../mocks/mockCards';
import { server } from '../mocks/node';
import { myFetch } from './myFetch';

function isCard(data: unknown): data is typeof mockCards {
  return (
    typeof data === 'object' &&
    data !== null &&
    'total_count' in data &&
    typeof data.total_count === 'number' &&
    'total_pages' in data &&
    typeof data.total_pages === 'number' &&
    'page' in data &&
    typeof data.page === 'number'
  );
}

describe('myFetch', () => {
  const abortController = new AbortController();

  test('returns valid data when response matches expected type', async () => {
    const data = await myFetch(
      'https://api.example.com/cards',
      abortController.signal,
      isCard
    );

    expect(data).toEqual(mockCards);
  });

  test('throws error when response data does not match expected type', async () => {
    server.use(
      http.get('https://api.example.com/cards', () => {
        return new Response(JSON.stringify({ id: 2 }));
      })
    );
    await expect(
      myFetch('https://api.example.com/cards', abortController.signal, isCard)
    ).rejects.toThrow('Incorrect response data');
  });

  test('throws error when HTTP status is not OK', async () => {
    server.use(
      http.get('https://api.example.com/cards', () => {
        return new Response(null, { status: 500 });
      })
    );
    await expect(
      myFetch('https://api.example.com/cards', abortController.signal, isCard)
    ).rejects.toThrow('HTTP error! status: 500');
  });
});
