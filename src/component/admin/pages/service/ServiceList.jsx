"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2'; // Import SweetAlert2
import SearchBar from '../../common/SearchBar';
import Pagination from '../../common/Pagination';
import { unstable_noStore as noStore } from 'next/cache';
import { deleteService } from '@/app/admin/dashboard/services/function';
export const ServiceList = ({faker}) => {
  noStore();
  const [services, setServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [servicesPerPage] = useState(5); // Adjust the number of items per page
  const router = useRouter();

  useEffect(() => {
    // Fetch the services when the component mounts
    const getServices = async () => {
      try {
        const initialServices = await faker; // Fetch initial data
        setServices(initialServices);
      } catch (error) {
        console.error('Failed to fetch services:', error);
      }
    };

    getServices();
  }, [faker,deleteService,router]); // Empty dependency array ensures this runs once on mount

  // Handle Search
  const filteredServices = services.filter((service) =>
    service.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination Logic
  const indexOfLastService = currentPage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const currentServices = filteredServices.slice(indexOfFirstService, indexOfLastService);

  const totalPages = Math.ceil(filteredServices.length / servicesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleAddService = () => {
    router.push('/admin/dashboard/services/add');
  };
  const handleViewEnquiry = (id) =>{
    router.push(`/services/${id}`)
  }
const handleeditService = (id) =>{
  router.push(`/admin/dashboard/services/edit/${id}`)
}
  const handleDeleteService = async (id) => {
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
        await deleteService(id);
        // Remove the deleted service from the state
        setServices((prevServices) => prevServices.filter(service => service.id !== id));
        Swal.fire(
          'Deleted!',
          'service has been deleted.',
          'success'
        );
      }
    } catch (error) {
      Swal.fire(
        'Error!',
        'Failed to delete service.',
        'error'
      );
      console.error('Delete service error:', error);
    }
  };
  
  return (
    <div className="container mx-auto py-10">
      <div className='flex items-center justify-between'>
        <h1 className="text-2xl font-bold mb-6">Admin service Index</h1>

        {/* Add service Button */}
        <div className="mb-6">
          <button
            onClick={handleAddService}
            className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
          >
            Add New service
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* service Table */}
      <div className="overflow-x-auto">
    <table className="min-w-full bg-white">
        <thead>
            <tr>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Image</th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Title</th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Slug</th>
                {/* <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Status</th> */}
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Actions</th>
            </tr>
        </thead>
        <tbody className="bg-white">
            {currentServices.length > 0 ? (
                currentServices.map((service) => (
                    <tr key={service?.id}>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                            <img src={service?.image} alt={service?.title} className="w-16 h-16 object-cover rounded-md" />
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{service?.title.length > 20 ? `${service?.title.slice(0, 20)}...` : service?.title}</td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{service?.slug}</td>
                        {/* <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{service?.status}</td> */}
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                            <div className="flex space-x-2">
                                <button type="button" onClick={() => handleViewEnquiry(service?.slug)} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center">View</button>
                                <button type="button" onClick={() => handleeditService(service?.id)} className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Edit</button>
                                <button type="button" onClick={() => handleDeleteService(service?.id)} className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Delete</button>
                            </div>
                        </td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan="5" className="text-center py-4">No services found.</td>
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
