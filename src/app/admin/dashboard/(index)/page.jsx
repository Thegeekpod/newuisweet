import { getUserFromToken } from "../../../../../lib/auth";



const Dashboard = async() => {
    const { user, error } = await getUserFromToken();
    return (
  
        <>
  
          {/* Main Content */}
          
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
       
          </>
      
    );
}

export default Dashboard