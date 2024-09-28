"use client";
import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [...Array(totalPages).keys()].map((_, index) => index + 1);

  return (
    <div className="flex justify-center space-x-2 mt-6">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 ${page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'} rounded-md`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
