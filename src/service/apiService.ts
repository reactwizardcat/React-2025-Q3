import { API_URL } from '../constants';
import type { CardsResponse } from '../models/cards.model';
import { isValidData } from '../validator';

class ApiService {
  private static instance: ApiService;
  private abortController: AbortController | null = null;

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  public fetchCards(searchQuery: string = ''): Promise<CardsResponse> {
    this.abort();
    this.abortController = new AbortController();

    const url = new URL(`${API_URL}/cards`);
    if (searchQuery) {
      url.searchParams.set('search', searchQuery);
    }

    return fetch(url.toString(), {
      signal: this.abortController.signal,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data: unknown) => {
        if (isValidData(data)) {
          return data;
        }
        throw new Error('Incorrect response data');
      });
  }

  public abort() {
    if (this.abortController) {
      this.abortController.abort();
      this.abortController = null;
    }
  }
}

export default ApiService;
