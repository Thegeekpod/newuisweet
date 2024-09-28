"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2'; // Import SweetAlert2
import SearchBar from '@/component/admin/common/SearchBar';
import Pagination from '@/component/admin/common/Pagination';
import { unstable_noStore as noStore } from 'next/cache';
import { deleteSpecialized, fetchSpecialized } from '@/app/admin/dashboard/specialized/function';
const SpecializedList = () => {
  noStore();
  const [specializeds, setSpecializeds] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [specializedsPerPage] = useState(10); // Adjust the number of items per page
  const router = useRouter();

  useEffect(() => {
    // Fetch the specializeds when the component mounts
    const getSpecializeds = async () => {
      try {
        const initialSpecializeds = await fetchSpecialized(); // Fetch initial data
        setSpecializeds(initialSpecializeds);
      } catch (error) {
        console.error('Failed to fetch specializeds:', error);
      }
    };

    getSpecializeds();
  }, [fetchSpecialized,deleteSpecialized,router]); // Empty dependency array ensures this runs once on mount

  // Handle Search
  const filteredSpecializeds = specializeds.filter((specialized) =>
    specialized.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination Logic
  const indexOfLastSpecialized = currentPage * specializedsPerPage;
  const indexOfFirstSpecialized = indexOfLastSpecialized - specializedsPerPage;
  const currentSpecializeds = filteredSpecializeds.slice(indexOfFirstSpecialized, indexOfLastSpecialized);

  const totalPages = Math.ceil(filteredSpecializeds.length / specializedsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleAddSpecialized = () => {
    router.push('/admin/dashboard/specialized/add');
  };
  const handleViewEnquiry = (id) =>{
    router.push(`/specialized/${id}`)
  }
const handleeditSpecialized = (id) =>{
  router.push(`/admin/dashboard/specialized/edit/${id}`)
}
  const handleDeleteSpecialized = async (id) => {
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
        await deleteSpecialized(id);
        // Remove the deleted specialized from the state
        setSpecializeds((prevSpecializeds) => prevSpecializeds.filter(specialized => specialized.id !== id));
        Swal.fire(
          'Deleted!',
          'specialized has been deleted.',
          'success'
        );
      }
    } catch (error) {
      Swal.fire(
        'Error!',
        'Failed to delete specialized.',
        'error'
      );
      console.error('Delete specialized error:', error);
    }
  };
  
  return (
    <div className="container mx-auto py-10">
      <div className='flex items-center justify-between'>
        <h1 className="text-2xl font-bold mb-6">Admin specialized Index</h1>

        {/* Add specialized Button */}
        <div className="mb-6">
          <button
            onClick={handleAddSpecialized}
            className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
          >
            Add New specialized
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* specialized Table */}
      <div className="overflow-x-auto">
    <table className="min-w-full bg-white">
        <thead>
            <tr>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Image</th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Title</th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Slug</th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Created At</th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Actions</th>
            </tr>
        </thead>
        <tbody className="bg-white">
            {currentSpecializeds.length > 0 ? (
                currentSpecializeds.map((specialized) => (
                    <tr key={specialized?.id}>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                            <img src={specialized?.image} alt={specialized?.title} className="w-16 h-16 object-cover rounded-md" />
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{specialized?.title.length > 20 ? `${specialized?.title.slice(0, 20)}...` : specialized?.title}</td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{specialized?.slug}</td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{new Date(specialized?.createdAt).toLocaleDateString()}</td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                            <div className="flex space-x-2">
                                <button type="button" onClick={() => handleViewEnquiry(specialized?.slug)} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center">View</button>
                                <button type="button" onClick={() => handleeditSpecialized(specialized?.id)} className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Edit</button>
                                <button type="button" onClick={() => handleDeleteSpecialized(specialized?.id)} className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Delete</button>
                            </div>
                        </td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan="5" className="text-center py-4">No specializeds found.</td>
                </tr>
            )}
        </tbody>
    </table>
</div>


      {/* Pagination */}
      <Pagination
       currentPage={currentPage}
       totalPages={totalPages}
       onPageChange={handlePageChange}
      />
    </div>
  );
};
export  default SpecializedList;