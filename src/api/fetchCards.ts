import { API_URL } from '../constants';
import type { CardsResponse } from '../models/cards.model';
import { isValidData } from '../validator';

let cardsAbortController: AbortController | null = null;

export function fetchCards(
  searchQuery: string = '',
  page: number
): Promise<CardsResponse> {
  abortFetchCards();
  cardsAbortController = new AbortController();

  const url = new URL(`${API_URL}/cards`);
  if (searchQuery) {
    url.searchParams.set('search', searchQuery);
  }
  if (page) {
    url.searchParams.set('page', page.toString());
  }

  return fetch(url.toString(), {
    signal: cardsAbortController.signal,
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
  if (cardsAbortController) {
    cardsAbortController.abort();
    cardsAbortController = null;
  }
}
