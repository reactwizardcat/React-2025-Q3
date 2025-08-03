import { cn } from '../../utils/cn';

export default function PaginationButton({
  children,
  isDisabled,
  onClick,
  className,
}: {
  children: React.ReactNode;
  isDisabled: boolean;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={cn(
        'flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300',
        'transition-colors duration-300 enabled:hover:bg-blue-200 disabled:cursor-not-allowed',
        'disabled:opacity-60 dark:border-gray-600 dark:enabled:hover:bg-gray-700',
        className
      )}
    >
      {children}
    </button>
  );
}
