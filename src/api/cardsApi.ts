import { isValidCard, isValidData } from '@/utils/validator';
import { API_URL } from '../constants';
import type { CardResponse, CardsResponse } from '../models/cards.model';

interface QuerryPerems {
  searchQuery?: string;
  page: number;
}

type ApiResponce<T> = {
  data: T | null;
  error: {
    message: string;
  } | null;
};

export async function getCards({
  searchQuery = '',
  page,
}: QuerryPerems): Promise<ApiResponce<CardsResponse>> {
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

export async function fetchCardById(
  id: string
): Promise<ApiResponce<CardResponse>> {
  const response = await fetch(`${API_URL}/cards/${id}`);

  if (!response.ok) {
    return {
      data: null,
      error: {
        message: `Failed to fetch cards: ${response.statusText}`,
      },
    };
  }

  const data = await response.json();
  if (isValidCard(data) || data === null) {
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
