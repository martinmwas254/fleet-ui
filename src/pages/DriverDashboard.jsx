import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function DriverDashboard() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Welcome, Driver {user?.name}</h1>
      <button onClick={logout} className="mt-4 bg-red-600 text-white px-4 py-2 rounded">
        Logout
      </button>
    </div>
  );
}
