"use client";
import { useEffect, useState } from 'react';
import { BlogList } from '@/component/admin/pages/Blog/BlogList';
import { fetchBlogs } from '../function/Add';
import { unstable_noStore as noStore } from 'next/cache';

// Skeleton Loader Component
const Skeleton = ({ width, height }) => (
  <div
    className="animate-pulse bg-gray-300 dark:bg-gray-700"
    style={{ width, height }}
  ></div>
);

const AdminBlogTable = () => {
  noStore();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetchBlogs(); // Ensure fetchBlogs is called as a function
        const data = await response;
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false); // Stop loading state once the data is fetched
      }
    }
    fetchData();
  }, []);

  return (
    <div className="container mx-auto py-10">
      {loading ? (
        <div className="space-y-4">
          {/* Skeleton Loader for blog items */}
          <Skeleton width="100%" height="60px" />
          <Skeleton width="100%" height="60px" />
          <Skeleton width="100%" height="60px" />
          <Skeleton width="100%" height="60px" />
          <Skeleton width="100%" height="60px" />
        </div>
      ) : (
        <BlogList faker={blogs} /> // Pass the fetched data to BlogList
      )}
    </div>
  );
};

export default AdminBlogTable;
