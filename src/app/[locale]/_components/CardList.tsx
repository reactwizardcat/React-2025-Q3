import Card from './Card';
import { ITEMS_PER_PAGE, SPINNER_DELAY } from '../../../constants';
import Loader from './Loader';
import SkeletonCard from './SkeletonCard';
import MyButton from './UI/MyButton';
import { useAppSelector } from '../../../lib/hooks';
import { useEffect, useRef, useState } from 'react';
import type { CardsResponse } from '../../../models/cards.model';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { SerializedError } from '@reduxjs/toolkit';
import { getErrorMessage } from '../_utils/getErrorMessage';
import { Link } from '@/i18n/navigation';
import { Pagination } from './Pagination';

interface CardsProps {
  data: CardsResponse | undefined;
  isLoading: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
  page: number;
  setPage: (page: number) => void;
}

export default function CardList({
  data,
  isLoading,
  error,
  page,
  setPage,
}: CardsProps) {
  const [isLongLoading, setIsLongLoading] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [page]);

  useEffect(() => {
    if (isLoading) {
      timeoutRef.current = window.setTimeout(
        () => setIsLongLoading(true),
        SPINNER_DELAY
      );
    } else {
      setIsLongLoading(false);
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    }
    return () => {
      if (timeoutRef.current) {
        return window.clearTimeout(timeoutRef.current);
      }
    };
  }, [isLoading]);

  const cardsStore = useAppSelector((state) => state.cards.cardsStore);

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
        {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center">
        <p className="mt-10 max-w-3xl px-4 text-center text-2xl text-red-500">
          {getErrorMessage(error)}
        </p>
        <MyButton className="mt-4" callback={() => console.log('back')}>
          Go Back
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

  const { total_count, total_pages, page: actualPage } = data;
  return (
    <main>
      <section className="flex w-full grow">
        <div className="grid w-full grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data?.cards.map((cardData) => (
            <Link key={cardData.id} href={`${cardData.id}`}>
              <Card
                data={cardData}
                isSelected={Boolean(cardsStore[cardData.id])}
              />
            </Link>
          ))}
        </div>
      </section>

      <Pagination
        totalItems={total_count}
        totalPages={total_pages}
        currentPage={actualPage}
        onPageChange={setPage}
      />
    </main>
  );
}
