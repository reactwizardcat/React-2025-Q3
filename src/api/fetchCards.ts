import { API_URL } from '../constants';
import type { CardsResponse } from '../models/cards.model';
import { isValidData } from '../utils/validator';
import { myFetch } from './myFetch';

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

  return myFetch(url.toString(), cardsAbortController.signal, isValidData);
}

export function abortFetchCards() {
  if (cardsAbortController) {
    cardsAbortController.abort();
    cardsAbortController = null;
  }
}
