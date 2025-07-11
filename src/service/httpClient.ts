export interface HttpClient {
  get<T>(url: string, config?: RequestConfig): Promise<T>;
}

interface RequestConfig {
  signal?: AbortSignal;
  params?: Record<string, string>;
}

class FetchHttpClient implements HttpClient {
  public get<T>(searchQuery: string, config?: RequestConfig): Promise<T> {
    const url = new URL(searchQuery);
    if (config?.params) {
      Object.entries(config.params).forEach(([key, value]) => {
        if (value) {
          url.searchParams.set(key, value);
        }
      });
    }

    return fetch(url.toString(), {
      signal: config?.signal,
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    });
  }
}

export default FetchHttpClient;
