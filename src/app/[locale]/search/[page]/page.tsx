import { Link } from '@/i18n/navigation';
import { getCards } from '@/api/cardsApi';
import Card from '@/components/Card';
import { Pagination } from '@/components/Pagination';
import ErrorElement from '@/components/Error';
import EmptyData from '@/components/EmptyData';

interface AppProps {
  searchParams: Promise<{
    query?: string | undefined;
  }>;
  params: Promise<{ page: string }>;
}

export default async function CardList({ searchParams, params }: AppProps) {
  const { query: searchQuery } = await searchParams;
  const { page = '1' } = await params;
  const { data, error } = await getCards({ searchQuery, page: Number(page) });

  if (error) {
    return <ErrorElement message={error.message} />;
  }

  if (!data?.cards) {
    return <EmptyData />;
  }

  const { total_count, total_pages, page: actualPage } = data;
  return (
    <>
      <section className="flex w-full grow">
        <div className="grid w-full grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data?.cards.map((cardData) => (
            <Link
              key={cardData.id}
              href={`${page}/${cardData.id}?query=${searchQuery}`}
            >
              <Card data={cardData} />
            </Link>
          ))}
        </div>
      </section>

      <Pagination
        totalItems={total_count}
        totalPages={total_pages}
        currentPage={actualPage}
      />
    </>
  );
}
