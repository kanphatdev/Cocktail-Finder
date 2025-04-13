export const fetcher = (url: string, options?: RequestInit): Promise<unknown> => {
    return fetch(url, options).then((res) => res.json());
  };