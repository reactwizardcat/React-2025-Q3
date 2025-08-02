import Card from './Card';
import { ITEMS_PER_PAGE } from '../constants';
import Loader from './Loader';
import SkeletonCard from './SkeletonCard';
import MyButton from './UI/MyButton';
import { Pagination } from './Pagination';
import { Link, Outlet, useNavigate, useNavigation } from 'react-router';
import SideBarLayout from '../layout/SideBarLayout';
import { useFetchCards } from '../hooks/useFetchCards';
import { useAppSelector } from '../store/hooks';
import { useEffect } from 'react';

interface CardsProps {
  query: string;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  page: number;
  setPage: (page: number) => void;
}

export default function CardList({
  query,
  isLoading,
  setIsLoading,
  page,
  setPage,
}: CardsProps) {
  const navigation = useNavigation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [page]);

  const { data, isLongLoading, error } = useFetchCards({
    query,
    page,
    setIsLoading,
  });

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
          {error}
        </p>
        <MyButton className="mt-4" callback={() => navigate(-1)}>
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
            <Link key={cardData.id} to={`${cardData.id}`}>
              <Card
                data={cardData}
                isSelected={Boolean(cardsStore[cardData.id])}
              />
            </Link>
          ))}
        </div>

        {navigation.state === 'loading' && (
          <SideBarLayout>
            <Loader />
          </SideBarLayout>
        )}
        <Outlet />
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
