import { useNavigate } from 'react-router';
import { ITEMS_PER_PAGE } from '../constants';
import { getVisiblePages } from '../utils/linksArray';
import PaginationButton from './UI/PaginationButton';

interface PaginationProps {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  totalItems,
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  const navigate = useNavigate();
  if (totalPages <= 1) return null;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
      navigate(`/search/${page}`);
    }
  };

  return (
    <div className="my-4 flex flex-col items-center gap-4 px-4 py-3">
      <div className="text-sm text-gray-600 dark:text-gray-300">
        Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}-
        {Math.min(currentPage * ITEMS_PER_PAGE, totalItems)} of {totalItems}
      </div>

      <div className="flex items-center gap-2">
        <PaginationButton
          isDisabled={1 === currentPage}
          onClick={() => handlePageChange(1)}
        >
          &laquo;
        </PaginationButton>

        <PaginationButton
          isDisabled={1 === currentPage}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          &lsaquo;
        </PaginationButton>

        {getVisiblePages(currentPage, totalPages).map((page) => (
          <PaginationButton
            key={page}
            isDisabled={page === currentPage}
            onClick={() => handlePageChange(page)}
            className={
              currentPage === page
                ? 'border-blue-700 bg-blue-700 text-white shadow-md dark:border-white dark:bg-blue-100/20'
                : 'hidden sm:block'
            }
          >
            {page}
          </PaginationButton>
        ))}

        <PaginationButton
          isDisabled={totalPages === currentPage}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          &rsaquo;
        </PaginationButton>

        <PaginationButton
          isDisabled={totalPages === currentPage}
          onClick={() => handlePageChange(totalPages)}
        >
          &raquo;
        </PaginationButton>
      </div>
    </div>
  );
};
