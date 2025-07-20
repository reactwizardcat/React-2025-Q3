import { http } from 'msw';
import { mockCards } from './mockCards';

export const handlers = [
  http.get('*/cards', () => {
    return Response.json(mockCards);
  }),
];
