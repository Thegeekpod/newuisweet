"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2'; // Import SweetAlert2
import SearchBar from '../../common/SearchBar';
import Pagination from '../../common/Pagination';
import {  deleteBlog } from '@/app/admin/dashboard/blog/function/Add'; // Assume fetchBlogs is defined

export const BlogList = ({faker}) => {
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage] = useState(5); // Adjust the number of items per page
  const router = useRouter();

  useEffect(() => {
    // Fetch the blogs when the component mounts
    const getBlogs = async () => {
      try {
        const initialBlogs = await faker; // Fetch initial data
        setBlogs(initialBlogs);
      } catch (error) {
        console.error('Failed to fetch blogs:', error);
      }
    };

    getBlogs();
  }, [faker,deleteBlog]); // Empty dependency array ensures this runs once on mount

  // Handle Search
  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination Logic
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleAddBlog = () => {
    router.push('/admin/dashboard/blog/add');
  };

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
        // Remove the deleted blog from the state
        setBlogs((prevBlogs) => prevBlogs.filter(blog => blog.id !== id));
        Swal.fire(
          'Deleted!',
          'Blog has been deleted.',
          'success'
        );
      }
    } catch (error) {
      Swal.fire(
        'Error!',
        'Failed to delete blog.',
        'error'
      );
      console.error('Delete blog error:', error);
    }
  };
  
  return (
    <div className="container mx-auto py-10">
      <div className='flex items-center justify-between'>
        <h1 className="text-2xl font-bold mb-6">Admin Blog Index</h1>

        {/* Add Blog Button */}
        <div className="mb-6">
          <button
            onClick={handleAddBlog}
            className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
          >
            Add New Blog
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Blog Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Image</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Title</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Slug</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Status</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {currentBlogs.length > 0 ? (
              currentBlogs.map((blog) => (
                <tr key={blog.id}>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    <img src={blog.image} alt={blog.title} className="w-16 h-16 object-cover rounded-md" />
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{blog.title.slice(0, 20)}...</td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{blog.slug}</td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{blog.status}</td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    <button className="text-blue-600 hover:underline mr-4">Edit</button>
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
