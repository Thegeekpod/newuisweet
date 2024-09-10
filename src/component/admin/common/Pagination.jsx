import React from 'react';

const Pagination = ({ totalPages, currentPage, handlePageChange }) => {
  return (
    <div className="mt-4 flex justify-center">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => handlePageChange(index + 1)}
          className={`px-3 py-1 mx-1 border rounded-md ${
            currentPage === index + 1
              ? 'bg-blue-500 text-white'
              : 'bg-white text-blue-500'
          }`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
