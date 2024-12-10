import React from "react";

interface PaginationProps {
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
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers: any[] = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li
          key={i}
          onClick={() => handlePageChange(i)}
          className={`cursor-pointer px-3 py-2 ${
            i === currentPage ? "bg-blue-500 text-white" : "hover:bg-gray-200"
          }`}
        >
          {i}
        </li>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="flex justify-center mt-4">
      <ul className="flex space-x-2">{renderPageNumbers()}</ul>
    </div>
  );
};

export default Pagination;
