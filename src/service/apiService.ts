import { API_URL } from '../constants';
import type { CardsResponse } from '../models/cards.model';
import { isValidData } from '../validator';
import type { HttpClient } from './httpClient';
import FetchHttpClient from './httpClient';

class ApiService {
  private static instance: ApiService | null = null;
  private httpClient: HttpClient;
  private abortController: AbortController | null = null;

  private constructor(httpClient: HttpClient = new FetchHttpClient()) {
    this.httpClient = httpClient;
  }

  public static getInstance(httpClient?: HttpClient): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService(httpClient);
    } else if (httpClient) {
      ApiService.instance.setHttpClient(httpClient);
    }
    return ApiService.instance;
  }

  public static clearInstance(): void {
    ApiService.instance = null;
  }

  public fetchCards(searchQuery: string = ''): Promise<CardsResponse> {
    this.abort();
    this.abortController = new AbortController();

    return this.httpClient
      .get(`${API_URL}/cards`, {
        signal: this.abortController.signal,
        params: { search: searchQuery },
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

  private setHttpClient(httpClient: HttpClient): void {
    this.httpClient = httpClient;
  }
}

export default ApiService;
