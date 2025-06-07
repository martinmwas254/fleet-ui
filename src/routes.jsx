import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import DriverDashboard from './pages/DriverDashboard';
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
        <Route
          path="/driver"
          element={user?.role === 'driver' ? <DriverDashboard /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
}
