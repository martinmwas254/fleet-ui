// src/pages/AdminDashboard.jsx
import React, { useContext, useState, useEffect, useCallback } from 'react';
import { AuthContext } from '../context/AuthContext';
import API from '../utils/api';
import Header from '../components/Header';
import TabNavigation from '../components/TabNavigation';
import Notification from '../components/Notification';
import DriverManagement from '../components/DriverManagement';
import VehicleManagement from '../components/VehicleManagement';
import RouteManagement from '../components/RouteManagement';
import TripManagement from '../components/TripManagement';

export default function AdminDashboard() {
  const { user, logout } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('drivers');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [trips, setTrips] = useState([]);

  const clearMessages = () => {
    setMessage('');
    setError('');
  };

  const fetchDrivers = useCallback(async () => {
    try {
      const res = await API.get('/drivers'); // This should hit your backend's /drivers endpoint
      setDrivers(res.data.drivers); // Assuming your backend returns { drivers: [...] }
    } catch (err) {
      console.error('Error fetching drivers:', err);
      setError(err.response?.data?.msg || 'Error fetching drivers');
    }
  }, []);

  const fetchVehicles = useCallback(async () => {
    try {
      const res = await API.get('/vehicles');
      setVehicles(res.data); // Adjust if your vehicle endpoint also wraps in { vehicles: [...] }
    } catch (err) {
      console.error('Error fetching vehicles:', err);
      setError(err.response?.data?.msg || 'Error fetching vehicles');
    }
  }, []);

  const fetchRoutes = useCallback(async () => {
    try {
      const res = await API.get('/routes');
      setRoutes(res.data); // Adjust similarly
    } catch (err) {
      console.error('Error fetching routes:', err);
      setError(err.response?.data?.msg || 'Error fetching routes');
    }
  }, []);

  const fetchTrips = useCallback(async () => {
    try {
      const res = await API.get('/trips');
      setTrips(res.data); // Adjust similarly
    } catch (err) {
      console.error('Error fetching trips:', err);
      setError(err.response?.data?.msg || 'Error fetching trips');
    }
  }, []);

  useEffect(() => {
    fetchDrivers(); // Fetch drivers when component mounts
    fetchVehicles();
    fetchRoutes();
    fetchTrips();
  }, [fetchDrivers, fetchVehicles, fetchRoutes, fetchTrips]);

  const handleCreateDriver = async (driverData) => {
    try {
      const res = await API.post('/drivers', driverData);
      setMessage(res.data.msg);
      setError('');
      fetchDrivers(); // Refresh drivers list after creation
    } catch (err) {
      setError(err.response?.data?.msg || 'Error creating driver');
      setMessage('');
    }
  };

  const handleCreateVehicle = async (vehicleData) => {
    try {
      const res = await API.post('/vehicles', vehicleData);
      setMessage(res.data.msg);
      setError('');
      fetchVehicles(); // Refresh vehicles list after creation
    } catch (err) {
      setError(err.response?.data?.msg || 'Error creating vehicle');
      setMessage('');
    }
  };

  const handleCreateRoute = async (routeData) => {
    try {
      const res = await API.post('/routes', routeData);
      setMessage(res.data.msg);
      setError('');
      fetchRoutes(); // Refresh routes list after creation
    } catch (err) {
      setError(err.response?.data?.msg || 'Error creating route');
      setMessage('');
    }
  };

  const handleCreateTrip = async (tripData) => {
    try {
      const res = await API.post('/trips', tripData);
      setMessage(res.data.msg);
      setError('');
      fetchTrips(); // Refresh trips list after creation
    } catch (err) {
      setError(err.response?.data?.msg || 'Error creating trip');
      setMessage('');
    }
  };

  const handleAssignDriver = async (vehicleId, driverId) => {
    try {
      const res = await API.put('/vehicles/assign-driver', { vehicleId, driverId })
       
      setMessage(res.data.msg);
      setError('');
      fetchVehicles(); // Refresh vehicles list after assignment
    } catch (err) {
      setError(err.response?.data?.msg || 'Error assigning driver');
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header user={user} logout={logout} />

      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} clearMessages={clearMessages} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <Notification message={message} error={error} />

        {activeTab === 'drivers' && (
          <DriverManagement
            onCreateDriver={handleCreateDriver}
            drivers={drivers} // Pass drivers to DriverManagement
            setMessage={setMessage}
            setError={setError}
            clearMessages={clearMessages}
          />
        )}

        {activeTab === 'vehicles' && (
          <VehicleManagement
            onCreateVehicle={handleCreateVehicle}
            vehicles={vehicles}
            drivers={drivers} // Pass drivers to VehicleManagement
            onAssignDriver={handleAssignDriver}
            setMessage={setMessage}
            setError={setError}
            clearMessages={clearMessages}
          />
        )}

        {activeTab === 'routes' && (
          <RouteManagement
            onCreateRoute={handleCreateRoute}
            routes={routes}
            setMessage={setMessage}
            setError={setError}
            clearMessages={clearMessages}
          />
        )}

        {activeTab === 'trips' && (
          <TripManagement
            onCreateTrip={handleCreateTrip}
            trips={trips}
            drivers={drivers}
            vehicles={vehicles}
            routes={routes}
            setMessage={setMessage}
            setError={setError}
            clearMessages={clearMessages}
          />
        )}
      </div>
    </div>
  );
}