import { useState } from 'react';
import CardList from './components/CardList';
import Search from './components/Search';
import { useLS } from './hooks/useLS';
import { useParams } from 'react-router';
import { useAppSelector } from './store/hooks';
import Flayout from './components/Flayout';
import { STORAGE_KEY } from './constants';
import { useGetCardsQuery } from './api/cardsApi';

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
