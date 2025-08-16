'use client';

import { useDispatch } from 'react-redux';
import { cardsApi, useGetCardsQuery } from '@/api/cardsApi';
import { useAppSelector } from '@/lib/hooks';
import { useState } from 'react';
import { useLS } from '../_hooks/useLS';
import { STORAGE_KEY } from '@/constants';
import { useParams } from 'next/navigation';
import Search from '@/app/[locale]/_components/Search';
import CardList from '@/app/[locale]/_components/CardList';
import Flayout from '@/app/[locale]/_components/Flayout';

export default function App() {
  const [query, setQuery] = useLS(STORAGE_KEY);
  const { search } = useParams();
  const [page, setPage] = useState(Number(search) || 1);
  const countCards = useAppSelector((state) => state.cards.cardsCounter);

  const changeQuery = (str: string) => {
    setQuery(str);
    setPage(1);
  };

  const { data, error, isLoading } = useGetCardsQuery({
    searchQuery: query,
    page,
  });

  return (
    <>
      <Search
        changeQuery={changeQuery}
        queryString={query}
        isLoading={isLoading}
      />
      <CardList
        isLoading={isLoading}
        data={data}
        error={error}
        page={page}
        setPage={setPage}
      />
      {countCards > 0 && <Flayout count={countCards} />}
    </>
  );
}
