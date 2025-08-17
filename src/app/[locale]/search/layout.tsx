import Search from '@/components/Search';
import Flayout from '@/components/Flayout';

export default async function Home({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Search />
      {children}
      <Flayout />
    </>
  );
}
