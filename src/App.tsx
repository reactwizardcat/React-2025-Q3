import { useState } from 'react';
import Cards from './components/Cards';
import Search from './components/Search';
import ErrorButton from './components/UI/ErrorButton';
import { useLS } from './hooks/useLS';
import { useParams } from 'react-router';

export default function App() {
  const [query, setQuery] = useLS();
  const { search } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(Number(search) || 1);

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
      <Cards
        query={query}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        page={page}
        setPage={setPage}
      />
      <ErrorButton />
    </>
  );
}
