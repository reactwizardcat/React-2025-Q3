import { http } from 'msw';
import { mockCards, mockCard } from './mockCards';

export const handlers = [
  http.get('*/cards', () => {
    return Response.json(mockCards);
  }),
  http.get('*/cards/1', () => {
    return Response.json(mockCard);
  }),
];
