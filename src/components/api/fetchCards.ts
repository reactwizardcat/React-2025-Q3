import { API_URL } from '../../constants';
import type { CardsResponse } from '../../models/cards.model';
import { isValidData } from '../../validator';

let abortController: AbortController | null = null;

export function fetchCards(searchQuery: string = ''): Promise<CardsResponse> {
  abortFetchCards();
  abortController = new AbortController();

  const url = new URL(`${API_URL}/cards`);
  if (searchQuery) {
    url.searchParams.set('search', searchQuery);
  }

  return fetch(url.toString(), {
    signal: abortController.signal,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data: unknown) => {
      if (isValidData(data)) {
        return data;
      }
      throw new Error('Incorrect response data');
    });
}

export function abortFetchCards() {
  if (abortController) {
    abortController.abort();
    abortController = null;
  }
}
