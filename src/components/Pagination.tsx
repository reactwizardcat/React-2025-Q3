import { getVisiblePages } from '../utils/linksArray';

interface PaginationProps {
  totalItems: number;
  totalPages: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  totalItems,
  totalPages,
  itemsPerPage,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
      <div className="text-sm text-gray-600">
        Показано {(currentPage - 1) * itemsPerPage + 1}-
        {Math.min(currentPage * itemsPerPage, totalItems)} из {totalItems}
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          className="rounded border p-2 disabled:opacity-50"
        >
          &laquo;
        </button>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="rounded border p-2 disabled:opacity-50"
        >
          &lsaquo;
        </button>

        {getVisiblePages(currentPage, totalPages).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`w-10 rounded border p-2 ${currentPage === page ? 'bg-blue-500 text-white' : ''}`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="rounded border p-2 disabled:opacity-50"
        >
          &rsaquo;
        </button>
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="rounded border p-2 disabled:opacity-50"
        >
          &raquo;
        </button>
      </div>
    </div>
  );
};
