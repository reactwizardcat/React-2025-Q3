import { API_URL } from '../constants';
import type { CardResponse, CardsResponse } from '../models/cards.model';
import { isValidCard, isValidData } from '../utils/validator';

interface QuerryPerems {
  searchQuery?: string;
  page: number;
}

interface ApiResponce {
  data: CardsResponse | null;
  error: {
    message: string;
  } | null;
}

export async function getCards({
  searchQuery = '',
  page,
}: QuerryPerems): Promise<ApiResponce> {
  const url = new URL(`${API_URL}/cards`);
  if (searchQuery) {
    url.searchParams.set('search', searchQuery);
  }
  if (page) {
    url.searchParams.set('page', page.toString());
  }
  const response = await fetch(url.toString());

  if (!response.ok) {
    return {
      data: null,
      error: {
        message: `Failed to fetch cards: ${response.statusText}`,
      },
    };
  }

  const data = await response.json();
  if (isValidData(data)) {
    return {
      data,
      error: null,
    };
  } else {
    return {
      data: null,
      error: {
        message: 'Incorrect response data',
      },
    };
  }
}

export async function fetchCardById(id: string): Promise<CardResponse | null> {
  const response = await fetch(`${API_URL}/cards/${id}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch card: ${response.statusText}`);
  }

  const data = await response.json();
  if (isValidCard(data) || data === null) {
    return data;
  } else {
    throw new Error('Incorrect response data');
  }
}
