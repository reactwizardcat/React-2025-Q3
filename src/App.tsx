import { useState } from 'react';
import Cards from './components/Cards';
import Search from './components/Search';
import ErrorButton from './components/UI/ErrorButton';
import { useLS } from './hooks/useLS';

export default function App() {
  const [query, setQuery] = useLS();
  const [isLoading, setIsLoading] = useState(false);

  const changeQuery = (str: string) => {
    setQuery(str);
  };

  return (
    <>
      <Search
        changeQuery={changeQuery}
        queryString={query}
        isLoading={isLoading}
      />
      <Cards query={query} isLoading={isLoading} setIsLoading={setIsLoading} />
      <ErrorButton />
    </>
  );
}
