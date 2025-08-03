import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { createURL } from '../utils/createURL';
import type { CardResponse } from '../models/cards.model';

export default function useDownloadCSV<
  T extends Record<number | string | symbol, CardResponse>,
>(data: T) {
  const [blob, setBlob] = useState('');
  const linkRef = useRef<HTMLAnchorElement>(null);
  const dataRef = useRef(data);
  useEffect(() => {
    return () => URL.revokeObjectURL(blob);
  }, [blob]);
  useLayoutEffect(() => {
    dataRef.current = data;
  });

  const saveToCSV = useCallback(() => {
    const url = createURL(dataRef.current);
    if (linkRef.current) {
      linkRef.current.href = url;
      linkRef.current.click();
      setBlob(url);
    }
  }, []);
  return { linkRef, saveToCSV };
}
