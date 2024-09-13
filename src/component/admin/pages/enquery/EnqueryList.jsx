"use client";
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2'; // SweetAlert2 for notifications
import SearchBar from '../../common/SearchBar';
import Pagination from '../../common/Pagination';
import { unstable_noStore as noStore } from 'next/cache';
import { deleteEnquiry } from '@/app/admin/dashboard/enquiry/Function';

export const EnquiryList = ({ faker }) => {
    noStore();
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedEnquiry, setSelectedEnquiry] = useState(null);
    const dataPerPage = 5; // Items per page

    // Fetch data when component mounts
    useEffect(() => {
        const getData = async () => {
            try {
                const initialData = await faker;
                setData(initialData);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };
        getData();
    }, [faker]);

    // Filter data based on search query
    const filteredData = data.filter(enquiry =>
        enquiry.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Pagination logic
    const indexOfLastEnquiry = currentPage * dataPerPage;
    const indexOfFirstEnquiry = indexOfLastEnquiry - dataPerPage;
    const currentData = filteredData.slice(indexOfFirstEnquiry, indexOfLastEnquiry);
    const totalPages = Math.ceil(filteredData.length / dataPerPage);

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Handle delete enquiry
    const handleDeleteEnquiry = async (id) => {
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
                await deleteEnquiry(id); // Assuming deleteEnquiry handles deletion
                setData((prevData) => prevData.filter(enquiry => enquiry.id !== id));
                Swal.fire('Deleted!', 'Enquiry has been deleted.', 'success');
            }
        } catch (error) {
            Swal.fire('Error!', 'Failed to delete enquiry.', 'error');
            console.error('Delete enquiry error:', error);
        }
    };

    // Handle view enquiry
    const handleViewEnquiry = (enquiry) => {
        setSelectedEnquiry(enquiry);
        Swal.fire({
            title: `<p>Enquiry Details</p>`,
            html: `
                <table border="1" cellpadding="10" cellspacing="0" style="border-collapse: collapse;">
    <tr>
        <th>Name</th>
        <td>${enquiry.name}</td>
    </tr>
    <tr>
        <th>Phone</th>
        <td>${enquiry.phone}</td>
    </tr>
    <tr>
        <th>Email</th>
        <td>${enquiry.email || 'N/A'}</td>
    </tr>
    <tr>
        <th>Services</th>
        <td>${enquiry.services || 'N/A'}</td>
    </tr>
    <tr>
        <th>Message</th>
        <td>${enquiry.message || 'N/A'}</td>
    </tr>
</table>

            `,
            showCloseButton: true,
            showConfirmButton: false,
            width: '600px',
        });
    };

    return (
        <div className="container mx-auto py-10">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Admin Enquiry Index</h1>
            </div>

            {/* Search Bar */}
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

            {/* Enquiry Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-md">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-blue-500">Name</th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-blue-500">Phone</th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-blue-500">Email</th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-blue-500">Services</th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-blue-500">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.length > 0 ? (
                            currentData.map((enquiry) => (
                                <tr key={enquiry.id}>
                                    <td className="px-6 py-4 border-b border-gray-500">{enquiry.name}</td>
                                    <td className="px-6 py-4 border-b border-gray-500">{enquiry.phone}</td>
                                    <td className="px-6 py-4 border-b border-gray-500">{enquiry.email || 'N/A'}</td>
                                    <td className="px-6 py-4 border-b border-gray-500">{enquiry.services || 'N/A'}</td>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                                    <div className="flex space-x-2">
                                        <button
                                            type="button"
                                            onClick={() => handleViewEnquiry(enquiry)}
                                            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                        >
                                            View
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleDeleteEnquiry(enquiry.id)}
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
                                <td colSpan="5" className="text-center py-4">No data found.</td>
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
