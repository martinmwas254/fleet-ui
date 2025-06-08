// src/components/UpdateVehicleModal.jsx
import React, { useState, useEffect } from 'react';

export default function UpdateVehicleModal({
  isOpen,
  onClose,
  vehicle,
  drivers,
  onUpdateVehicle,
  onUnassignDriver,
  setMessage,
  setError,
  clearMessages
}) {
  const [formData, setFormData] = useState({
    plateNumber: '',
    make: '',
    model: '',
    year: '',
    capacity: '',
    fuelType: '',
    status: '',
  });

  useEffect(() => {
    if (vehicle) {
      setFormData({
        plateNumber: vehicle.plateNumber || '',
        make: vehicle.make || '',
        model: vehicle.model || '',
        year: vehicle.year || '',
        capacity: vehicle.capacity || '',
        fuelType: vehicle.fuelType || '',
        status: vehicle.status || '',
      });
    }
  }, [vehicle]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearMessages();
    if (!vehicle) {
      setError('No vehicle selected for update.');
      return;
    }
    await onUpdateVehicle(vehicle._id, formData);
    onClose();
  };

  const handleUnassignDriver = async () => {
    clearMessages();
    if (!vehicle || !vehicle.assignedDriver) {
      setError('No driver assigned to this vehicle.');
      return;
    }
    const confirmUnassign = window.confirm(
      `Are you sure you want to unassign ${vehicle.assignedDriver.name} from ${vehicle.plateNumber}?`
    );
    if (confirmUnassign) {
      await onUnassignDriver(vehicle._id); // Pass vehicle ID to unassign
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl font-bold"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Vehicle Details</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Plate Number</label>
            <input
              type="text"
              name="plateNumber"
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              value={formData.plateNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Make</label>
            <input
              type="text"
              name="make"
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              value={formData.make}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Model</label>
            <input
              type="text"
              name="model"
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              value={formData.model}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Year</label>
            <input
              type="number"
              name="year"
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              value={formData.year}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Capacity</label>
            <input
              type="number"
              name="capacity"
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              value={formData.capacity}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Fuel Type</label>
            <select
              name="fuelType"
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              value={formData.fuelType}
              onChange={handleChange}
              required
            >
              <option value="petrol">Petrol</option>
              <option value="diesel">Diesel</option>
              <option value="electric">Electric</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              name="status"
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="active">Active</option>
              <option value="maintenance">Maintenance</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            {vehicle?.assignedDriver && (
              <button
                type="button"
                onClick={handleUnassignDriver}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors"
              >
                Unassign Driver
              </button>
            )}
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
            >
              Update Vehicle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}