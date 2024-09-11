"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Use axios or fetch for data fetching
import Link from 'next/link';

// Skeleton Component
const Skeleton = ({ width, height }) => (
  <div
    className="animate-pulse bg-gray-300 dark:bg-gray-700"
    style={{ width, height }}
  ></div>
);

const GetArticles = ({ data }) => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true); // Loading state
  const itemsPerPage = 2; // Number of items to show per page

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true); // Set loading to true before fetching
      try {
        const response = await data;
        if (Array.isArray(response)) {
          setBlogs(response); // Assuming `response.items` is the array of articles
          const totalItems = response.totalItems || response.length; // Adjust as necessary
          setTotalPages(Math.ceil(totalItems / itemsPerPage));
        } else {
          console.error('Expected `items` to be an array.');
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchBlogs();
  }, [data, currentPage]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Calculate the start and end index for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBlogs = Array.isArray(blogs) ? blogs.slice(startIndex, endIndex) : [];

  return (
    <div className="mt-10 lg:mt-14">
      {loading ? (
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2">
          {Array.from({ length: itemsPerPage }).map((_, index) => (
            <div key={index} className="relative">
              <Skeleton width="100%" height="200px" />
              <div className="mt-6">
                <Skeleton width="60%" height="24px" />
                <Skeleton width="40%" height="20px" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2">
            {currentBlogs.map((blog) => (
              <div key={blog.id}>
                <div className="relative">
                  <Link
                    href={`/articles/${blog.slug}`} // Adjust the URL as needed
                    className="group block aspect-6/4 overflow-hidden rounded-lg"
                  >
                    <img
                      src={`${blog.image}`} // Assuming `blog.image` contains the filename
                      alt={blog.title}
                      className="h-full w-full rounded-lg object-cover transition duration-700 group-hover:scale-105"
                    />
                  </Link>
                  {/* Tags */}

                  <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                    <Link
                      href={`/articles/${blog.slug}`}
                      className="inline-flex items-center justify-center gap-2 rounded bg-white px-2 py-1 text-center text-xs leading-none text-primary shadow transition hover:bg-primary hover:text-white"
                    >
                    {blog?.tag && Array.isArray(blog.tag) && blog.tag.length > 0 ? blog.tag[0] : 'Sweet Developers'}
                    </Link>
                  </div>
                </div>
                <div className="mt-6">
                  <h2 className="text-xl font-medium xl:text-2xl">
                    <a
                      href={`/articles/${blog.slug}`} // Adjust the URL as needed
                      className="inline-block text-dark transition hover:text-primary dark:text-light/70 dark:hover:text-primary"
                    >
                      {blog.title}
                    </a>
                  </h2>
                  <ul className="mt-4 flex flex-wrap items-center gap-2">
                    <li className="relative text-sm text-muted/50 before:mr-1 before:content-['\2022'] dark:text-muted">
                      By <span className="text-primary"> Sweet Developers</span>
                    </li>
                    <li className="relative text-sm text-muted/50 before:mr-1 before:content-['\2022'] dark:text-muted">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
          {/* Pagination */}
          <nav className="mt-10 flex items-center justify-center gap-1.5">
            <button
              type="button"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="inline-flex min-h-9 min-w-9 items-center justify-center rounded-lg border border-light text-center text-dark transition hover:border-primary hover:text-primary focus:outline-none focus:ring-2 disabled:pointer-events-none disabled:opacity-50 dark:border-dark dark:text-muted dark:hover:border-primary dark:hover:text-primary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                />
              </svg>
              <span aria-hidden="true" className="sr-only">
                Previous
              </span>
            </button>
            {totalPages > 1 && Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                type="button"
                onClick={() => handlePageChange(index + 1)}
                className={`inline-flex min-h-9 min-w-9 items-center justify-center rounded-lg border border-light text-center text-dark transition hover:border-primary hover:text-primary focus:outline-none focus:ring-2 disabled:pointer-events-none disabled:opacity-50 dark:border-dark dark:text-muted dark:hover:border-primary dark:hover:text-primary ${index + 1 === currentPage ? 'bg-primary text-white' : ''
                  }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              type="button"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="inline-flex min-h-9 min-w-9 items-center justify-center rounded-lg border border-light text-center text-dark transition hover:border-primary hover:text-primary focus:outline-none focus:ring-2 disabled:pointer-events-none disabled:opacity-50 dark:border-dark dark:text-muted dark:hover:border-primary dark:hover:text-primary"
            >
              <span aria-hidden="true" className="sr-only">
                Next
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </button>
          </nav>
          {/* End Pagination */}
        </>
      )}
    </div>
  );
};

export default GetArticles;
