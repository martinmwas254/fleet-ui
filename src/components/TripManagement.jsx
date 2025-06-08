// src/components/TripManagement.jsx
import React, { useState } from 'react';

export default function TripManagement({ onCreateTrip, trips, drivers, vehicles, routes, setMessage, setError, clearMessages }) {
  const [tripForm, setTripForm] = useState({
    driverId: '',
    vehicleId: '',
    routeId: '',
    scheduledStartTime: '',
    scheduledEndTime: '',
    passengerCount: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearMessages();
    await onCreateTrip(tripForm);
    setTripForm({
      driverId: '',
      vehicleId: '',
      routeId: '',
      scheduledStartTime: '',
      scheduledEndTime: '',
      passengerCount: ''
    });
  };

  return (
    <div className="space-y-6">
      {/* Create Trip Form */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Schedule Trip</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Driver</label>
            <select
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              value={tripForm.driverId}
              onChange={(e) => setTripForm({ ...tripForm, driverId: e.target.value })}
              required
            >
              <option value="">Select Driver</option>
              {/* Use the 'drivers' prop directly, not filtered by assignedDriver on vehicles */}
              {drivers.map(driver => (
                <option key={driver._id} value={driver._id}>
                  {driver.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Vehicle</label>
            <select
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              value={tripForm.vehicleId}
              onChange={(e) => setTripForm({ ...tripForm, vehicleId: e.target.value })}
              required
            >
              <option value="">Select Vehicle</option>
              {vehicles.map(vehicle => (
                <option key={vehicle._id} value={vehicle._id}>
                  {vehicle.plateNumber} - {vehicle.make} {vehicle.model}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Route</label>
            <select
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              value={tripForm.routeId}
              onChange={(e) => setTripForm({ ...tripForm, routeId: e.target.value })}
              required
            >
              <option value="">Select Route</option>
              {routes.map(route => (
                <option key={route._id} value={route._id}>
                  {route.name} ({route.startLocation} → {route.endLocation})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Passenger Count</label>
            <input
              type="number"
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              value={tripForm.passengerCount}
              onChange={(e) => setTripForm({ ...tripForm, passengerCount: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Start Time</label>
            <input
              type="datetime-local"
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              value={tripForm.scheduledStartTime}
              onChange={(e) => setTripForm({ ...tripForm, scheduledStartTime: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">End Time</label>
            <input
              type="datetime-local"
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              value={tripForm.scheduledEndTime}
              onChange={(e) => setTripForm({ ...tripForm, scheduledEndTime: e.target.value })}
              required
            />
          </div>
          <div className="md:col-span-2">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
            >
              Schedule Trip
            </button>
          </div>
        </form>
      </div>

      {/* Trips List (Remains the same) */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium">Scheduled Trips</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Driver
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vehicle
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Route
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Scheduled Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {trips.map((trip) => (
                <tr key={trip._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {trip.driver?.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {trip.vehicle?.plateNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {trip.route?.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(trip.scheduledStartTime).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        trip.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : trip.status === 'in_progress'
                          ? 'bg-blue-100 text-blue-800'
                          : trip.status === 'accepted'
                          ? 'bg-yellow-100 text-yellow-800'
                          : trip.status === 'rejected'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {trip.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}