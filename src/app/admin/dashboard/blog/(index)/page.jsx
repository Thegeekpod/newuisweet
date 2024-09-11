"use client";
import { useEffect, useState } from 'react';
import { BlogList } from '@/component/admin/pages/Blog/BlogList';
import { fetchBlogs } from '../function/Add';
import { unstable_noStore as noStore } from 'next/cache';
const AdminBlogTable = () => {
  noStore();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetchBlogs;
        const data = await response;
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    }
    fetchData();
  }, []);

  return <BlogList faker={blogs} />;
};

export default AdminBlogTable;
