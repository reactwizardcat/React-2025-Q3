import { useState, useEffect, useCallback, useRef } from 'react';
import Card from './Card';
import { SKELETON_ELEMENTS_COUNT, SPINNER_DELAY } from '../constants';
import type { CardsResponse } from '../models/cards.model';
import Loader from './Loader';
import SkeletonCard from './SkeletonCard';
import MyButton from './UI/MyButton';
import { fetchCards, abortFetchCards } from '../api/fetchCards';
import { Pagination } from './Pagination';
import { Link, Outlet } from 'react-router';

interface CardsProps {
  query: string;
  isLoading: boolean;
  page: number;
  setPage: (page: number) => void;
  setIsLoading: (value: boolean) => void;
}

export default function Cards({
  query,
  isLoading,
  setIsLoading,
  page,
  setPage,
}: CardsProps) {
  const [data, setData] = useState<CardsResponse | null>(null);
  const [isLongLoading, setIsLongLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const longLoadingTimer = useRef<number | null>(null);

  const fetchData = useCallback(() => {
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

    fetchCards(query, page)
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
  }, [query, setIsLoading, page]);

  useEffect(() => {
    const startLoading = () => {
      longLoadingTimer.current = window.setTimeout(() => {
        setIsLongLoading(true);
      }, SPINNER_DELAY);
      fetchData();
    };

    startLoading();

    return () => {
      abortFetchCards();
      if (longLoadingTimer.current) {
        window.clearTimeout(longLoadingTimer.current);
        longLoadingTimer.current = null;
      }
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
    <main>
      <section className="flex flex-row">
        <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data?.cards.map((cardData) => (
            <Link key={cardData.id} to={`${cardData.id}`}>
              <Card data={cardData} />
            </Link>
          ))}
        </div>
        <Outlet />
      </section>
      <Pagination
        totalItems={data.total_count}
        totalPages={data.total_pages}
        itemsPerPage={10}
        currentPage={data.page}
        onPageChange={setPage}
      />
    </main>
  );
}
