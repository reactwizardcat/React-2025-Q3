import { describe, it, expect, beforeEach, vi } from 'vitest';
import { server } from '../mocks/node';
import FetchHttpClient from './httpClient';
import { mockCards } from '../mocks/mockCards';
import { http, HttpResponse } from 'msw';

describe('FetchHttpClient tests', () => {
  const httpClient = new FetchHttpClient();
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('make GET request and return correct data', async () => {
    const response = await httpClient.get('http://localhost/cards');

    expect(response).toEqual(mockCards);
  });

  it('throw error when response is not ok', async () => {
    server.use(
      http.get('https://api.example.com/error', () => {
        return new Response(null, { status: 404 });
      })
    );

    await expect(
      httpClient.get('https://api.example.com/error')
    ).rejects.toThrow('HTTP error! status: 404');
  });

  it('add query params to URL when provided', async () => {
    const mockResponse = { data: 'test' };
    let requestUrl = '';

    server.use(
      http.get('https://api.example.com/search', ({ request }) => {
        requestUrl = request.url;
        return HttpResponse.json(mockResponse);
      })
    );

    const params = { q: 'test', page: '1' };
    await httpClient.get('https://api.example.com/search', { params });

    expect(requestUrl).toContain('q=test');
    expect(requestUrl).toContain('page=1');
  });

  it('skip undefined or empty params', async () => {
    let requestUrl = '';

    server.use(
      http.get('https://api.example.com/search', ({ request }) => {
        requestUrl = request.url;
        return HttpResponse.json({});
      })
    );

    const params = { q: 'test', empty: '' };
    await httpClient.get('https://api.example.com/search', { params });

    expect(requestUrl).toContain('q=test');
    expect(requestUrl).not.toContain('empty=');
  });

  it('pass AbortSignal to fetch when provided', async () => {
    let receivedSignal: AbortSignal | undefined;

    const abortController = new AbortController();
    const testSignal = abortController.signal;

    server.use(
      http.get('https://api.example.com/data', ({ request }) => {
        receivedSignal = request.signal;
        return HttpResponse.json(mockCards);
      })
    );

    await httpClient.get('https://api.example.com/data', {
      signal: testSignal,
    });

    expect(receivedSignal).toBeInstanceOf(AbortSignal);
    expect(receivedSignal?.aborted).toBe(false);
  });

  it('handle network errors', async () => {
    server.use(
      http.get('https://api.example.com/network-error', () => {
        return HttpResponse.error();
      })
    );

    await expect(
      httpClient.get('https://api.example.com/network-error')
    ).rejects.toThrow();
  });
});
