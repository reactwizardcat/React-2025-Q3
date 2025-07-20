import { afterAll, afterEach, beforeAll } from 'vitest';
import '@testing-library/jest-dom';
import { server } from './mocks/node';

beforeAll(() => {
  server.listen({
    onUnhandledRequest: 'error',
  });
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
