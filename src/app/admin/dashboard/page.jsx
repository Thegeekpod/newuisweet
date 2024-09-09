import { cookies } from 'next/headers';
import Logout from './Logout';
import { getUserFromToken } from '../../../../lib/auth';

export default async function Dashboard() {
  const cookieStore = cookies();
  const token = cookieStore.get('session')?.value || '';

  const { user, error } = await getUserFromToken(token);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white min-h-screen p-4">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav>
          <ul>
            <li className="mb-4">
              <a href="/admin/dashboard" className="hover:bg-gray-700 p-2 rounded block">Dashboard</a>
            </li>
            {/* Add more links here if needed */}
          </ul>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="bg-white shadow-md p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            <Logout/>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {error ? (
            <p className="text-red-600">{error}</p>
          ) : user ? (
            <>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Welcome, {user.email}!</h2>
              <p className="text-gray-600">User ID: {user.id}</p>
              <p className="text-gray-600">Email: {user.email}</p>
              {/* Add more details as needed */}
            </>
          ) : (
            <p className="text-gray-600">No user data available</p>
          )}
        </main>
      </div>
    </div>
  );
}
