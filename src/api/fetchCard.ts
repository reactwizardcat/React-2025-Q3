import { API_URL } from '../constants';
import type { CardResponse } from '../models/cards.model';
import { isValidCard } from '../validator';

let cardsAbortController: AbortController | null = null;

export function fetchCard(id: number): Promise<CardResponse> {
  abortFetchCard();
  cardsAbortController = new AbortController();

  const url = new URL(`${API_URL}/cards/${id}`);

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
      if (isValidCard(data)) {
        return data;
      }
      throw new Error('Incorrect response data');
    });
}

export function abortFetchCard() {
  if (cardsAbortController) {
    cardsAbortController.abort();
    cardsAbortController = null;
  }
}
