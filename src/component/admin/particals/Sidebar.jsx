"use client";
import React from 'react';
import { FaHome, FaNewspaper, FaConciergeBell, FaEnvelope } from 'react-icons/fa'; // Import the appropriate icons from react-icons
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';

export const Sidebar = () => {
  const router = useSelectedLayoutSegment();
  
  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
      <nav>
        <ul>
          <li className="mb-4">
            <Link href="/admin/dashboard" className={`hover:bg-gray-700 p-2 rounded block flex items-center ${router === '(index)' ? 'bg-gray-700' : ''}`}>
              <FaHome className="h-6 w-6 mr-3" />
              Dashboard
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/admin/dashboard/blog" className={`hover:bg-gray-700 p-2 rounded block flex items-center ${router === 'blog' ? 'bg-gray-700' : ''}`}>
              <FaNewspaper className="h-6 w-6 mr-3" />
              Blog
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/admin/dashboard/services" className={`hover:bg-gray-700 p-2 rounded block flex items-center ${router === 'services' ? 'bg-gray-700' : ''}`}>
              <FaConciergeBell className="h-6 w-6 mr-3" />
              Services
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/admin/dashboard/enquiry" className={`hover:bg-gray-700 p-2 rounded block flex items-center ${router === 'enquiry' ? 'bg-gray-700' : ''}`}>
              <FaEnvelope className="h-6 w-6 mr-3" />
              Enquiry Form
            </Link>
          </li>
          {/* Add more links here if needed */}
        </ul>
      </nav>
    </aside>
  );
};
