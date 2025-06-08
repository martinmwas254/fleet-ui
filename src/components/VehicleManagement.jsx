// src/components/VehicleManagement.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function VehicleManagement({
  onCreateVehicle,
  vehicles,
  drivers,
  onAssignDriver,
  setMessage,
  setError,
  clearMessages,
}) {
  const navigate = useNavigate();

  const [vehicleForm, setVehicleForm] = useState({
    plateNumber: '',
    make: '',
    model: '',
    year: '',
    capacity: '',
    fuelType: 'petrol',
  });

  const [selectedVehicleToAssign, setSelectedVehicleToAssign] = useState('');
  const [selectedDriverForAssignment, setSelectedDriverForAssignment] = useState(null); // Initialize with null

  const handleSubmitVehicle = async (e) => {
    e.preventDefault();
    clearMessages();
    await onCreateVehicle(vehicleForm);
    setVehicleForm({
      plateNumber: '',
      make: '',
      model: '',
      year: '',
      capacity: '',
      fuelType: 'petrol',
    });
  };

  const handleAssignSubmit = async (e) => {
    e.preventDefault();
    clearMessages();
    if (selectedVehicleToAssign) { // Only require vehicle selection
      await onAssignDriver(selectedVehicleToAssign, selectedDriverForAssignment);
      setSelectedVehicleToAssign('');
      setSelectedDriverForAssignment(null); // Reset to null
    } else {
      setError('Please select a vehicle.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Create Vehicle Form */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Add Vehicle</h2>
        <form onSubmit={handleSubmitVehicle} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Plate Number</label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              value={vehicleForm.plateNumber}
              onChange={(e) => setVehicleForm({ ...vehicleForm, plateNumber: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Make</label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              value={vehicleForm.make}
              onChange={(e) => setVehicleForm({ ...vehicleForm, make: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Model</label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              value={vehicleForm.model}
              onChange={(e) => setVehicleForm({ ...vehicleForm, model: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Year</label>
            <input
              type="number"
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              value={vehicleForm.year}
              onChange={(e) => setVehicleForm({ ...vehicleForm, year: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Capacity</label>
            <input
              type="number"
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              value={vehicleForm.capacity}
              onChange={(e) => setVehicleForm({ ...vehicleForm, capacity: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Fuel Type</label>
            <select
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              value={vehicleForm.fuelType}
              onChange={(e) => setVehicleForm({ ...vehicleForm, fuelType: e.target.value })}
            >
              <option value="petrol">Petrol</option>
              <option value="diesel">Diesel</option>
              <option value="electric">Electric</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
            >
              Add Vehicle
            </button>
          </div>
        </form>
      </div>

      {/* Assign Driver to Vehicle */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Assign Driver to Vehicle</h2>
        <form onSubmit={handleAssignSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Select Vehicle</label>
            <select
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              value={selectedVehicleToAssign}
              onChange={(e) => setSelectedVehicleToAssign(e.target.value)}
              required
            >
              <option value="">Select Vehicle</option>
              {vehicles.map((vehicle) => (
                <option key={vehicle._id} value={vehicle._id}>
                  {vehicle.plateNumber} - {vehicle.make} {vehicle.model}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Select Driver</label>
            <select
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              value={selectedDriverForAssignment === null ? "null" : selectedDriverForAssignment} // Handle null for display
              onChange={(e) =>
                setSelectedDriverForAssignment(e.target.value === "null" ? null : e.target.value)
              }
            >
              <option value="">Select Driver</option>
              <option value="null">None</option> {/* Visible 'null' option */}
              {drivers.map((driver) => (
                <option key={driver._id} value={driver._id}>
                  {driver.name} ({driver.email})
                </option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors"
            >
              Assign Driver
            </button>
          </div>
        </form>
      </div>

      {/* Vehicle List */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium">Vehicle Fleet</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Plate Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vehicle
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Capacity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assigned Driver
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {vehicles.map((vehicle) => (
                <tr key={vehicle._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {vehicle.plateNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {vehicle.make} {vehicle.model} ({vehicle.year})
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {vehicle.capacity} passengers
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {vehicle.assignedDriver?.name || 'Unassigned'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        vehicle.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : vehicle.status === 'maintenance'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {vehicle.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => navigate(`/vehicles/edit/${vehicle._id}`)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit
                    </button>
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