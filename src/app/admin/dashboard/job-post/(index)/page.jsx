"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2'; // Import SweetAlert2
import SearchBar from '@/component/admin/common/SearchBar';
import Pagination from '@/component/admin/common/Pagination';
import { unstable_noStore as noStore } from 'next/cache';
import { deleteJobPost, fetchJobPost } from '@/app/admin/dashboard/job-post/function';

const JobPostsList = () => {
  noStore();
  const [jobPosts, setJobPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [jobPostsPerPage] = useState(10); // Adjust the number of items per page
  const router = useRouter();

  useEffect(() => {
    // Fetch the jobPosts when the component mounts
    const getJobPosts = async () => {
      try {
        const initialJobPosts = await fetchJobPost(); // Fetch initial data
        setJobPosts(initialJobPosts);
      } catch (error) {
        console.error('Failed to fetch jobPosts:', error);
      }
    };

    getJobPosts();
  }, [fetchJobPost,deleteJobPost,router]); // Empty dependency array ensures this runs once on mount

  // Handle Search
  const filteredJobPosts = jobPosts.filter((jobPost) =>
    jobPost.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination Logic
  const indexOfLastJobPost = currentPage * jobPostsPerPage;
  const indexOfFirstJobPost = indexOfLastJobPost - jobPostsPerPage;
  const currentJobPosts = filteredJobPosts.slice(indexOfFirstJobPost, indexOfLastJobPost);

  const totalPages = Math.ceil(filteredJobPosts.length / jobPostsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleAddJobPost = () => {
    router.push('/admin/dashboard/job-post/add');
  };
  const handleViewEnquiry = (id) =>{
    router.push(`/admin/dashboard/job-post/applyed/${id}`)
  }
const handleeditJobPost = (id) =>{
  router.push(`/admin/dashboard/job-post/edit/${id}`)
}
  const handleDeleteJobPost = async (id) => {
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
        await deleteJobPost(id);
        // Remove the deleted jobPost from the state
        setJobPosts((prevJobPosts) => prevJobPosts.filter(jobPost => jobPost.id !== id));
        Swal.fire(
          'Deleted!',
          'jobPost has been deleted.',
          'success'
        );
      }
    } catch (error) {
      Swal.fire(
        'Error!',
        'Failed to delete jobPost.',
        'error'
      );
      console.error('Delete jobPost error:', error);
    }
  };
  
  return (
    <div className="container mx-auto py-10">
      <div className='flex items-center justify-between'>
        <h1 className="text-2xl font-bold mb-6">Admin jobPost Index</h1>

        {/* Add jobPost Button */}
        <div className="mb-6">
          <button
            onClick={handleAddJobPost}
            className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
          >
            Add New jobPost
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* jobPost Table */}
      <div className="overflow-x-auto">
    <table className="min-w-full bg-white">
        <thead>
            <tr>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Image</th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Title</th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Slug</th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Created by</th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider text-center">Actions</th>
            </tr>
        </thead>
        <tbody className="bg-white">
            {currentJobPosts.length > 0 ? (
                currentJobPosts.map((jobPost) => (
                    <tr key={jobPost?.id}>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                            <img src={jobPost?.image} alt={jobPost?.title} className="w-16 h-16 object-cover rounded-md" />
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{jobPost?.title.length > 20 ? `${jobPost?.title.slice(0, 20)}...` : jobPost?.title}</td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{jobPost?.slug}</td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{new Date(jobPost.createdAt).toLocaleDateString()}</td>

                        {/* <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{jobPost?.status}</td> */}
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                            <div className="flex space-x-2">
                                <button type="button" onClick={() => handleViewEnquiry(jobPost?.slug)} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Candidate ({jobPost?.jobApplied.length})</button>
                                <button type="button" onClick={() => handleeditJobPost(jobPost?.id)} className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Edit</button>
                                <button type="button" onClick={() => handleDeleteJobPost(jobPost?.id)} className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Delete</button>
                            </div>
                        </td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan="5" className="text-center py-4">No jobPosts found.</td>
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
export default JobPostsList;