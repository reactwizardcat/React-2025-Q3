import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../constants';
import type { CardResponse, CardsResponse } from '../models/cards.model';
import { isValidCard, isValidData } from '../app/[locale]/_utils/validator';

interface querryPerems {
  searchQuery: string;
  page: number;
}

export const cardsApi = createApi({
  reducerPath: 'cardsApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ['Cards', 'Card'],
  endpoints: (build) => ({
    getCards: build.query<CardsResponse, querryPerems>({
      query: ({ searchQuery, page }) => {
        const url = new URL(`${API_URL}/cards`);
        if (searchQuery) {
          url.searchParams.set('search', searchQuery);
        }
        if (page) {
          url.searchParams.set('page', page.toString());
        }
        return url.toString();
      },
      providesTags: ['Cards'],
      transformResponse: (res: unknown) => {
        if (isValidData(res)) {
          return res;
        } else {
          throw new Error('Incorrect response data');
        }
      },
    }),
    getCardById: build.query<CardResponse | null, string>({
      query: (id) => `/cards/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Card', id }],
      transformResponse: (res: unknown) => {
        if (isValidCard(res) || res === null) {
          return res;
        } else {
          throw new Error('Incorrect response data');
        }
      },
    }),
  }),
});

export const { useGetCardsQuery, useGetCardByIdQuery } = cardsApi;
