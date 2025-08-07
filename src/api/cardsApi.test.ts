import { mockCard, mockCards } from '../mocks/mockCards';
import { server } from '../mocks/node';
import { store } from '../store/store';
import { cardsApi } from './cardsApi';
import { HttpResponse, http } from 'msw';

describe('cardsApi', () => {
  afterEach(() => {
    server.resetHandlers();
    store.dispatch(cardsApi.util.resetApiState());
  });

  test('getCards returns correct data', async () => {
    const result = await store.dispatch(
      cardsApi.endpoints.getCards.initiate({ searchQuery: '', page: 1 })
    );

    expect(result.data).toEqual(mockCards);
    expect(result.isSuccess).toBe(true);
  });

  test('getCardById returns card data', async () => {
    const result = await store.dispatch(
      cardsApi.endpoints.getCardById.initiate('1')
    );

    expect(result.data).toEqual(mockCard);
    expect(result.isSuccess).toBe(true);
  });

  test('getCardById returns null for non-existent card', async () => {
    server.use(
      http.get('*/cards/999', () => {
        return HttpResponse.json(null);
      })
    );
    const result = await store.dispatch(
      cardsApi.endpoints.getCardById.initiate('999')
    );

    expect(result.data).toBeNull();
    expect(result.isSuccess).toBe(true);
  });

  test('handles server error for getCards', async () => {
    server.use(
      http.get('*/cards', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    const result = await store.dispatch(
      cardsApi.endpoints.getCards.initiate({ searchQuery: '', page: 1 })
    );

    expect(result.error).toBeDefined();
    expect(result.isError).toBe(true);
  });

  test('handles invalid data response for getCards', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    server.use(
      http.get('*/cards', () => {
        return HttpResponse.json({ invalid: 'data' });
      })
    );

    const result = await store.dispatch(
      cardsApi.endpoints.getCards.initiate({ searchQuery: '', page: 1 })
    );

    expect(result.error).toBeDefined();
    expect(result.isError).toBe(true);
    if ('error' in result) {
      expect(result.error).toMatchObject({
        message: 'Incorrect response data',
      });
    }
  });
});
