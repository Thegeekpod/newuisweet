
'use client';
import { useRouter } from 'next/navigation';
import cookie from 'cookie';
import React from 'react'

const Logout = () => {
    const router = useRouter();
    const handleLogout = () => {
        // Remove the session cookie on the client side
        document.cookie = cookie.serialize('session', '', {
          secure: process.env.NODE_ENV === 'production', // Ensure the cookie is removed over HTTPS
          maxAge: -1, // Expires the cookie immediately
          path: '/', // Ensure the cookie is removed for all paths
        });
      
        // Redirect to the login page
        router.push('/admin/login');
      };
  return (
    <button 
    onClick={handleLogout}
   className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
 >
   Logout
 </button>
  )
}

export default Logout