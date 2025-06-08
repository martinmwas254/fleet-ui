// src/components/Notification.jsx
import React from 'react';

export default function Notification({ message, error }) {
  if (!message && !error) return null;

  return (
    <div className="mb-4">
      {message && (
        <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          {message}
        </div>
      )}
      {error && (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
    </div>
  );
}