"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2"; // Import SweetAlert2

import { deleteCandidate, GetCandidates } from "@/app/admin/dashboard/job-post/function";
import SearchBar from "@/component/admin/common/SearchBar";
import Pagination from "@/component/admin/common/Pagination";

const CandidatesList = ({ params }) => {
  const [job, setJob] = useState([]);
  const [candidates, setCandidates] = useState([]); // Renamed to candidates
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [candidatesPerPage] = useState(5); // Adjust the number of items per page
  const [selectedCandidate, setSelectedCandidate] = useState(null); // State for the selected candidate
  const [showModal, setShowModal] = useState(false); // Modal visibility
  const router = useRouter();

  useEffect(() => {
    // Fetch the candidates when the component mounts
    const getCandidates = async () => {
      try {
        const initialCandidates = await GetCandidates(params.slug); // Fetch candidates data
        setCandidates(initialCandidates.jobApplied);
        setJob(initialCandidates)
      } catch (error) {
        console.error("Failed to fetch candidates:", error);
      }
    };

    getCandidates();
  }, [params.slug]);

  // Handle Search
  const filteredCandidates = candidates.filter((candidate) =>
    candidate.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination Logic
  const indexOfLastCandidate = currentPage * candidatesPerPage;
  const indexOfFirstCandidate = indexOfLastCandidate - candidatesPerPage;
  const currentCandidates = filteredCandidates.slice(
    indexOfFirstCandidate,
    indexOfLastCandidate
  );

  const totalPages = Math.ceil(filteredCandidates.length / candidatesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle viewing candidate details in a modal
  const handleViewCandidate = (candidate) => {
    setSelectedCandidate(candidate); // Set selected candidate
    setShowModal(true); // Show modal
  };

  // Handle deleting a candidate
  const handleDeleteCandidate = async (id) => {
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
        const response = await deleteCandidate(id); // No need to check response.status here
        if (response.message) {
          // Assuming the backend returns a successful deletion message
          setCandidates((prevCandidates) =>
            prevCandidates.filter(candidate => candidate.id !== id)
          );
          Swal.fire(
            'Deleted!',
            response.message,
            'success'
          );
        }
      }
    } catch (error) {
      Swal.fire(
        'Error!',
        'Failed to delete candidate.',
        'error'
      );
      console.error('Delete candidate error:', error);
    }
  };
  

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold mb-6">{job.title} Applyed Candidates List</h1>
      </div>

      {/* Search Bar */}
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Candidates Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                Created At
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {currentCandidates.length > 0 ? (
              currentCandidates.map((candidate) => (
                <tr key={candidate.id}>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    {candidate.name}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    {candidate.email}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    {candidate.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    {new Date(candidate.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewCandidate(candidate)}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleDeleteCandidate(candidate.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No candidates found.
                </td>
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

      {/* Modal for viewing candidate details */}
      {showModal && selectedCandidate && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <h2 className="text-2xl mb-4">Candidate Details</h2>
            <p>
              <strong>Name:</strong> {selectedCandidate.name}
            </p>
            <p>
              <strong>Email:</strong> {selectedCandidate.email}
            </p>
            <p>
              <strong>Phone:</strong> {selectedCandidate.phone}
            </p>
            <p>
              <strong>Address:</strong> {selectedCandidate.address}
            </p>
            <p>
              <strong>Created At:</strong>{" "}
              {new Date(selectedCandidate.createdAt).toLocaleDateString()}
            </p>
            <div className="mt-4">
              <a
                href={`${selectedCandidate.cvUpload}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                View CV
              </a>
            </div>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidatesList; // Use default export
