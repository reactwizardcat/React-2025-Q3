import SceletonCard from '@/components/SkeletonCard';
import { ITEMS_PER_PAGE } from '@/constants';

export default function Loading() {
  return (
    <main className="grid w-full grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
        <SceletonCard key={index} />
      ))}
    </main>
  );
}
