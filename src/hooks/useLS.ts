import { useState, useEffect } from 'react';
import { STORAGE_KEY } from '../constants';

export const useLS = () => {
  const [value, setValue] = useState(localStorage.getItem(STORAGE_KEY) || '');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, value);
  }, [value]);

  return [value, setValue] as const;
};
