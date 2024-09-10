import Logout from '@/app/admin/dashboard/Logout'
import React from 'react'

export const Header = () => {
  return (
    <header className="bg-white shadow-md p-4">
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      <Logout/>
    </div>
  </header>
  )
}
