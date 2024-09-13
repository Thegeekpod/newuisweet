"use client";
import { useEffect, useState } from 'react';;
import { unstable_noStore as noStore } from 'next/cache';
import { ServiceList } from '@/component/admin/pages/service/ServiceList';
import { fetchServices } from '../function';

// Skeleton Loader Component
const Skeleton = ({ width, height }) => (
  <div
    className="animate-pulse bg-gray-300 dark:bg-gray-700"
    style={{ width, height }}
  ></div>
);

const AdminServicesTable = () => {
  noStore();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetchServices(); // Ensure fetchServices is called as a function
        const data = await response;
        setServices(data);
      } catch (error) {
        console.error('Error fetching services:', error);
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
          {/* Skeleton Loader for blog items */}
          <Skeleton width="100%" height="60px" />
          <Skeleton width="100%" height="60px" />
          <Skeleton width="100%" height="60px" />
          <Skeleton width="100%" height="60px" />
          <Skeleton width="100%" height="60px" />
        </div>
      ) : (
        <ServiceList faker={services} /> // Pass the fetched data to BlogList
      )}
    </div>
  );
};

export default AdminServicesTable;
