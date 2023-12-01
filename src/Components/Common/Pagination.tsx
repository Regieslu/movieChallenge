import React from 'react';

interface PaginationProps {
  setPage: (page: number) => void;
  page: number;
}

const Pagination: React.FC<PaginationProps> = ({ setPage, page }) => {
  
  const handlePrevClick = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextClick = () => {
    setPage(page + 1);
  };

  return (
    <div className="pagination">
      <button onClick={handlePrevClick}>&lt; Prev</button>
      <span>Page {page}</span>
      <button onClick={handleNextClick}>Next &gt;</button>
    </div>
  );
};

export default Pagination;
