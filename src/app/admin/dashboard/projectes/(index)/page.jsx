"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2'; // Import SweetAlert2
import { fetchProjects,deleteProjecte } from '../function';
import Pagination from '@/component/admin/common/Pagination';
import SearchBar from '@/component/admin/common/SearchBar';

const ProjectList = () => {
  const [projectes, setProjectes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [projectesPerPage] = useState(10); // Adjust the number of items per page
  const router = useRouter();

  useEffect(() => {
    // Fetch the projectes when the component mounts
    const getProjectes = async () => {
      try {
        const initialProjectes = await fetchProjects(); // Corrected the function call
        setProjectes(initialProjectes);
      } catch (error) {
        console.error('Failed to fetch projectes:', error);
      }
    };

    getProjectes();
  }, []); // Empty dependency array ensures this runs once on mount

  // Handle Search
  const filteredProjectes = projectes.filter((projecte) =>
    projecte.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination Logic
  const indexOfLastProjecte = currentPage * projectesPerPage;
  const indexOfFirstProjecte = indexOfLastProjecte - projectesPerPage;
  const currentProjectes = filteredProjectes.slice(indexOfFirstProjecte, indexOfLastProjecte);

  const totalPages = Math.ceil(filteredProjectes.length / projectesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleAddProjecte = () => {
    router.push('/admin/dashboard/projectes/add');
  };



  const handleEditProjecte = (id) => {
    router.push(`/admin/dashboard/projectes/edit/${id}`);
  };

  const handleDeleteProjecte = async (id) => {
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
        await deleteProjecte(id);
        // Remove the deleted projecte from the state
        setProjectes((prevProjectes) => prevProjectes.filter((projecte) => projecte.id !== id));
        Swal.fire('Deleted!', 'Projecte has been deleted.', 'success');
      }
    } catch (error) {
      Swal.fire('Error!', 'Failed to delete projecte.', 'error');
      console.error('Delete projecte error:', error);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold mb-6">Admin Projecte Index</h1>

        {/* Add Projecte Button */}
        <div className="mb-6">
          <button
            onClick={handleAddProjecte}
            className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
          >
            Add New Projecte
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Projecte Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Image</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Title</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Url</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Created At</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {currentProjectes.length > 0 ? (
              currentProjectes.map((projecte) => (
                <tr key={projecte?.id}>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    <img src={projecte?.image} alt={projecte?.title} className="w-16 h-16 object-cover rounded-md" />
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    {projecte?.title.length > 20 ? `${projecte?.title.slice(0, 20)}...` : projecte?.title}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{projecte?.url}</td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{new Date(projecte?.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    <div className="flex space-x-2">
                     
                      <button
                        type="button"
                        onClick={() => handleEditProjecte(projecte?.id)}
                        className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteProjecte(projecte?.id)}
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
                  No projectes found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Component */}
      {filteredProjectes.length > projectesPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default ProjectList;
