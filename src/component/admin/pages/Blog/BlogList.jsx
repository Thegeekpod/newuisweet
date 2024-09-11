"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2'; // SweetAlert2 for notifications
import SearchBar from '../../common/SearchBar';
import Pagination from '../../common/Pagination';
import { deleteBlog } from '@/app/admin/dashboard/blog/function/Add'; // Assume deleteBlog is defined
import { unstable_noStore as noStore } from 'next/cache';

export const BlogList = ({ faker }) => {
  noStore();
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 5; // Items per page
  const router = useRouter();

  // Fetch blogs when component mounts
  useEffect(() => {
    const getBlogs = async () => {
      try {
        const initialBlogs = await faker;
        setBlogs(initialBlogs);
      } catch (error) {
        console.error('Failed to fetch blogs:', error);
      }
    };
    getBlogs();
  }, [faker]); // Removed unused dependencies deleteBlog, router

  // Filter blogs based on search query
  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle add blog navigation
  const handleAddBlog = () => {
    router.push('/admin/dashboard/blog/add');
  };

  // Handle edit blog navigation
  const handleEditBlog = (id) => {
    router.push(`/admin/dashboard/blog/edit/${id}`);
  };

  // Handle delete blog
  const handleDeleteBlog = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      });

      if (result.isConfirmed) {
        await deleteBlog(id);
        setBlogs((prevBlogs) => prevBlogs.filter(blog => blog.id !== id));
        Swal.fire('Deleted!', 'Blog has been deleted.', 'success');
      }
    } catch (error) {
      Swal.fire('Error!', 'Failed to delete blog.', 'error');
      console.error('Delete blog error:', error);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Admin Blog Index</h1>
        <button
          onClick={handleAddBlog}
          className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
        >
          Add New Blog
        </button>
      </div>

      {/* Search Bar */}
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Blog Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-blue-500">Image</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-blue-500">Title</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-blue-500">Slug</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-blue-500">Status</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-blue-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentBlogs.length > 0 ? (
              currentBlogs.map((blog) => (
                <tr key={blog.id}>
                  <td className="px-6 py-4 border-b border-gray-500">
                    <img src={blog.image} alt={blog.title} className="w-16 h-16 object-cover rounded-md" />
                  </td>
                  <td className="px-6 py-4 border-b border-gray-500">{blog.title.slice(0, 20)}...</td>
                  <td className="px-6 py-4 border-b border-gray-500">{blog.slug}</td>
                  <td className="px-6 py-4 border-b border-gray-500">{blog.status}</td>
                  <td className="px-6 py-4 border-b border-gray-500">
                    <button className="text-blue-600 hover:underline mr-4" onClick={() => handleEditBlog(blog.id)}>Edit</button>
                    <button className="text-red-600 hover:underline" onClick={() => handleDeleteBlog(blog.id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">No blogs found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};
