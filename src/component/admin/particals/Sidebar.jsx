"use client"
import React from 'react'
import { HomeIcon, NewspaperIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

export const Sidebar = () => {
  const router = useSelectedLayoutSegment()
  console.log(router)
  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
      <nav>
        <ul>
          <li className="mb-4">
            <Link href="/admin/dashboard" className={`hover:bg-gray-700 p-2 rounded block flex items-center  ${router === '(index)' ? 'bg-gray-700' : ''}`}>
              <HomeIcon className="h-6 w-6 mr-3" />
              Dashboard
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/admin/dashboard/blog" className={`hover:bg-gray-700 p-2 rounded block flex items-center ${router === 'blog' ? 'bg-gray-700' : ''}`}>
              <NewspaperIcon className="h-6 w-6 mr-3" />
              Blog
            </Link>
          </li>
          {/* Add more links here if needed */}
        </ul>
      </nav>
    </aside>
  )
}
