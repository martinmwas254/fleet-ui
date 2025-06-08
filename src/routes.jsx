// AppRoutes.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import DriverDashboard from './pages/DriverDashboard';
import UpdateVehiclePage from './pages/UpdateVehiclePage'; // Import the new page component
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

export default function AppRoutes() {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/admin"
          element={user?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/" />}
        />
        {/* New route for updating a specific vehicle */}
        <Route
          path="/vehicles/edit/:id" // Dynamic segment for vehicle ID
          element={user?.role === 'admin' ? <UpdateVehiclePage /> : <Navigate to="/" />}
        />
        <Route
          path="/driver"
          element={user?.role === 'driver' ? <DriverDashboard /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
}