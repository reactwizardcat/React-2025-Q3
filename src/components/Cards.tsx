import { useState, useEffect, useCallback } from 'react';
import Card from './Card';
import { SKELETON_ELEMENTS_COUNT, SPINNER_DELAY } from '../constants';
import type { CardsResponse } from '../models/cards.model';
import Loader from './Loader';
import SkeletonCard from './SkeletonCard';
import MyButton from './UI/MyButton';
import { fetchCards, abortFetchCards } from './api/fetchCards';

interface CardsProps {
  query: string;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
}

export default function Cards({ query, isLoading, setIsLoading }: CardsProps) {
  const [data, setData] = useState<CardsResponse | null>(null);
  const [isLongLoading, setIsLongLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(() => {
    const resetLoadingStates = () => {
      setIsLoading(false);
      setIsLongLoading(false);
    };
    setError(null);
    setIsLongLoading(false);
    setIsLoading(true);

    fetchCards(query)
      .then((cardsData) => {
        setData(cardsData);
        resetLoadingStates();
      })
      .catch((error) => {
        if (error instanceof Error && error.name !== 'AbortError') {
          setError(error instanceof Error ? error.message : 'Unknown error');
          resetLoadingStates();
        }
      });
  }, [query, setIsLoading]);

  useEffect(() => {
    let longLoadingTimer: number;

    const startLoading = () => {
      longLoadingTimer = window.setTimeout(() => {
        setIsLongLoading(true);
      }, SPINNER_DELAY);
      fetchData();
    };

    startLoading();

    return () => {
      abortFetchCards();
      window.clearTimeout(longLoadingTimer);
    };
  }, [query, fetchData]);

  if (isLongLoading) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center">
        <Loader />
        <p className="mt-10 max-w-3xl px-4 text-center text-2xl text-red-500">
          Please be patient. Since we use free hosting, it takes about 3 minutes
          to load the server.
        </p>
      </main>
    );
  }

  if (isLoading) {
    return (
      <main className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: SKELETON_ELEMENTS_COUNT }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center">
        <p className="mt-10 max-w-3xl px-4 text-center text-2xl text-red-500">
          {error}
        </p>
        <MyButton className="mt-4" callback={fetchData}>
          Reload
        </MyButton>
      </main>
    );
  }

  if (!data?.cards) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center">
        <p className="text-gray-500">No cards found</p>
      </main>
    );
  }

  return (
    <main className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {data?.cards.map((cardData) => (
        <Card key={cardData.id} data={cardData} />
      ))}
    </main>
  );
}
