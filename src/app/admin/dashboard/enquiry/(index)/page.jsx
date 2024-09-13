"use client";
import { useEffect, useState } from 'react';
import { unstable_noStore as noStore } from 'next/cache';
import { EnquiryList } from '@/component/admin/pages/enquery/EnqueryList';
import { fetchEnquiry } from '../Function';

// Skeleton Loader Component
const Skeleton = ({ width, height }) => (
  <div
    className="animate-pulse bg-gray-300 dark:bg-gray-700"
    style={{ width, height }}
  ></div>
);

const AdminEnqueryTable = () => {
  noStore();
  const [enquiry, setEnquiry] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetchEnquiry(); // Call the function to get the data
        setEnquiry(response || []); // Handle case where response might be null or undefined
      } catch (error) {
        console.error('Error fetching enquiry:', error);
      } finally {
        setLoading(false); // Stop loading state once the data is fetched
      }
    }
    fetchData();
  }, []);

  return (
    <div className="container mx-auto py-10">
      {loading ? (
        <div className="space-y-4">
          {/* Skeleton Loader */}
          <Skeleton width="100%" height="40px" />
          <Skeleton width="100%" height="40px" />
          <Skeleton width="100%" height="40px" />
          <Skeleton width="100%" height="40px" />
          <Skeleton width="100%" height="40px" />
        </div>
      ) : (
        <EnquiryList faker={enquiry} /> // Pass the fetched data to EnquiryList
      )}
    </div>
  );
};

export default AdminEnqueryTable;
