import { useState } from 'react';
import CardList from './components/CardList';
import Search from './components/Search';
import { useLS } from './hooks/useLS';
import { useParams } from 'react-router';
import { useAppSelector } from './store/hooks';
import Flayout from './components/Flayout';

export default function App() {
  const [query, setQuery] = useLS();
  const { search } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(Number(search) || 1);
  const countCards = useAppSelector((state) => state.cards.cardsCounter);

  const changeQuery = (str: string) => {
    setQuery(str);
    setPage(1);
  };

  return (
    <>
      <Search
        changeQuery={changeQuery}
        queryString={query}
        isLoading={isLoading}
      />
      <CardList
        query={query}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        page={page}
        setPage={setPage}
      />
      {countCards > 0 && <Flayout count={countCards} />}
    </>
  );
}
