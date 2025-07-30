import { cn } from '../../utils/cn';

export default function PaginationButton({
  children,
  page,
  currentPage,
  onClick,
  className,
}: {
  children: React.ReactNode;
  page: number;
  currentPage: number;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={currentPage === page}
      className={cn(
        'flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300',
        'transition-colors duration-300 enabled:hover:bg-blue-200 disabled:cursor-not-allowed',
        'disabled:opacity-60 dark:border-gray-600 dark:hover:bg-gray-700',
        className
      )}
    >
      {children}
    </button>
  );
}
