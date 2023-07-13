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
          {/* {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <li key={page}>
                <button
                  className="grid w-8 h-8 border rounded-sm place-content-center"
                  disabled={currentPage === page}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              </li>
            )
          )} */}
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
