import { useState, useEffect, useRef } from 'react';
import { fetchCards, abortFetchCards } from '../api/fetchCards';
import { SPINNER_DELAY } from '../constants';
import type { CardsResponse } from '../models/cards.model';

interface UseFetchCardsProps {
  query: string;
  page: number;
  setIsLoading: (value: boolean) => void;
}

export const useFetchCards = ({
  query,
  page,
  setIsLoading,
}: UseFetchCardsProps) => {
  const [data, setData] = useState<CardsResponse | null>(null);
  const [isLongLoading, setIsLongLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const longLoadingTimer = useRef<number | null>(null);

  useEffect(() => {
    const resetLoadingStates = () => {
      if (longLoadingTimer.current) {
        window.clearTimeout(longLoadingTimer.current);
        longLoadingTimer.current = null;
      }
      setIsLoading(false);
      setIsLongLoading(false);
    };

    setError(null);
    setIsLongLoading(false);
    setIsLoading(true);

    longLoadingTimer.current = window.setTimeout(() => {
      setIsLongLoading(true);
    }, SPINNER_DELAY);

    fetchCards(query, page)
      .then((cardsData) => {
        setData(cardsData);
        resetLoadingStates();
      })
      .catch((error) => {
        if (error instanceof Error && error.name !== 'AbortError') {
          setError(error.message);
          resetLoadingStates();
        }
      });

    return () => {
      abortFetchCards();
      resetLoadingStates();
    };
  }, [query, page, setIsLoading]);

  return { data, isLongLoading, error };
};
