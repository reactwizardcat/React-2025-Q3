import { API_URL } from '../constants';
import type { CardResponse } from '../models/cards.model';
import { isValidCard } from '../utils/validator';
import { myFetch } from './myFetch';

let cardsAbortController: AbortController | null = null;

export function fetchCard(id: number): Promise<CardResponse> {
  abortFetchCard();
  cardsAbortController = new AbortController();

  const url = new URL(`${API_URL}/cards/${id}`);

  return myFetch(url.toString(), cardsAbortController.signal, isValidCard);
}

export function abortFetchCard() {
  if (cardsAbortController) {
    cardsAbortController.abort();
    cardsAbortController = null;
  }
}
