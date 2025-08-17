import { Link } from '@/i18n/navigation';
import { cn } from '@/utils/cn';

export default function SideBarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Link
        area-label="close popup"
        href={'.'}
        className="fixed top-0 left-0 h-full w-full cursor-pointer bg-black/30"
      ></Link>
      <aside
        className={cn(
          'group sticky top-8 my-4 mr-4 flex h-[75vh] w-full flex-col transition-all hover:grow-[1.25]',
          'justify-center self-start rounded-lg bg-white align-middle shadow-md md:w-1/4'
        )}
      >
        {children}
      </aside>
    </>
  );
}
