import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex justify-center mt-4">
      <nav>
        <ul className="flex gap-1">
          <li>
            <button
              className="grid w-8 h-8 border rounded-sm place-content-center"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              <FaChevronLeft size={16} />
            </button>
          </li>
          {currentPage > 2 && (
            <li>
              <button
                className="grid w-8 h-8 border rounded-sm place-content-center"
                onClick={() => handlePageChange(1)}
              >
                1
              </button>
            </li>
          )}
          {currentPage > 3 && (
            <li>
              <span className="px-2">...</span>
            </li>
          )}
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => {
              if (
                page === currentPage ||
                (page === currentPage - 1 && currentPage === 2) ||
                (page === currentPage + 1 && currentPage === totalPages - 1) ||
                (page > currentPage - 2 && page < currentPage + 2)
              ) {
                return (
                  <li key={page}>
                    <button
                      className="grid w-8 h-8 border rounded-sm place-content-center"
                      disabled={currentPage === page}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </button>
                  </li>
                );
              }
              return null;
            }
          )}
          {currentPage < totalPages - 2 && (
            <li>
              <span className="px-2">...</span>
            </li>
          )}
          {currentPage < totalPages - 1 && (
            <li>
              <button
                className="grid h-8 border rounded-sm min-w-[32px] place-content-center"
                onClick={() => handlePageChange(totalPages)}
              >
                {totalPages}
              </button>
            </li>
          )}
          <li>
            <button
              className="grid w-8 h-8 border rounded-sm place-content-center"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              <FaChevronRight size={16} />
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
