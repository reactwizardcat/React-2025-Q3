export function myFetch<T>(
  url: string,
  signal: AbortSignal,
  validatorFn: (data: unknown) => data is T
): Promise<T> {
  return fetch(url.toString(), {
    signal,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data: unknown) => {
      if (validatorFn(data)) {
        return data;
      }
      throw new Error('Incorrect response data');
    });
}
