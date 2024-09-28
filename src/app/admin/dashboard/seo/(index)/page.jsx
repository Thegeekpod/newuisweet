"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2'; // Import SweetAlert2
import { fetchSEOEntries, deleteSEOEntry } from '../function'; // Adjusted function names for SEO
import Pagination from '@/component/admin/common/Pagination';
import SearchBar from '@/component/admin/common/SearchBar';
import { unstable_noStore as noStore } from 'next/cache';
const SEOList = () => {
  noStore();
  const [seoEntries, setSEOEntries] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [seoEntriesPerPage] = useState(10); // Adjust the number of items per page
  const router = useRouter();

  useEffect(() => {
    // Fetch the SEO entries when the component mounts
    const getSEOEntries = async () => {
      try {
        const initialSEOEntries = await fetchSEOEntries(); // Fetch SEO entries
        setSEOEntries(initialSEOEntries);
      } catch (error) {
        console.error('Failed to fetch SEO entries:', error);
      }
    };

    getSEOEntries();
  }, []); // Empty dependency array ensures this runs once on mount

  // Handle Search
  const filteredSEOEntries = seoEntries.filter((seoEntry) =>
    seoEntry.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination Logic
  const indexOfLastSEOEntry = currentPage * seoEntriesPerPage;
  const indexOfFirstSEOEntry = indexOfLastSEOEntry - seoEntriesPerPage;
  const currentSEOEntries = filteredSEOEntries.slice(indexOfFirstSEOEntry, indexOfLastSEOEntry);

  const totalPages = Math.ceil(filteredSEOEntries.length / seoEntriesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleAddSEOEntry = () => {
    router.push('/admin/dashboard/seo/add'); // Adjust for SEO entry add page
  };

  const handleEditSEOEntry = (id) => {
    router.push(`/admin/dashboard/seo/edit/${id}`); // Adjust for SEO edit page
  };

  const handleDeleteSEOEntry = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      });

      if (result.isConfirmed) {
        await deleteSEOEntry(id); // Delete SEO entry
        // Remove the deleted SEO entry from the state
        setSEOEntries((prevSEOEntries) => prevSEOEntries.filter((seoEntry) => seoEntry.id !== id));
        Swal.fire('Deleted!', 'SEO entry has been deleted.', 'success');
      }
    } catch (error) {
      Swal.fire('Error!', 'Failed to delete SEO entry.', 'error');
      console.error('Delete SEO entry error:', error);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold mb-6">Admin SEO Index</h1>

        {/* Add SEO Entry Button */}
        <div className="mb-6">
          <button
            onClick={handleAddSEOEntry}
            className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
          >
            Add New SEO Entry
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* SEO Entry Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">OG Image</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Title</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Canonical URL</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Created At</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {currentSEOEntries.length > 0 ? (
              currentSEOEntries.map((seoEntry) => (
                <tr key={seoEntry?.id}>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    <img src={seoEntry?.og_image} alt={seoEntry?.title} className="w-16 h-16 object-cover rounded-md" />
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    {seoEntry?.title.length > 20 ? `${seoEntry?.title.slice(0, 20)}...` : seoEntry?.title}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{seoEntry?.canonical}</td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{new Date(seoEntry?.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    <div className="flex space-x-2">
                      <button
                        type="button"
                        onClick={() => handleEditSEOEntry(seoEntry?.id)}
                        className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteSEOEntry(seoEntry?.id)}
                        className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500" colSpan="4">
                  No SEO entries found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Component */}
      {filteredSEOEntries.length > seoEntriesPerPage && (
        <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default SEOList;
