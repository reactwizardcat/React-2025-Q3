import { useState, useEffect } from 'react';

export const useLS = (key: string) => {
  const [value, setValue] = useState(localStorage.getItem(key) || '');

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue] as const;
};
