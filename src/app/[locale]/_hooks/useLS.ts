'use client';

import { useState, useEffect } from 'react';

export const useLS = (key: string) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(window.localStorage.getItem(key) || '');
  }, []);

  useEffect(() => {
    window.localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue] as const;
};
