import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import API from '../utils/api';

export default function AdminDashboard() {
  const { user, logout } = useContext(AuthContext);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleCreateDriver = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/drivers', form);
      setMessage(res.data.msg);
      setError('');
      setForm({ name: '', email: '', password: '' });
    } catch (err) {
      setError(err.response?.data?.msg || 'Error creating driver');
      setMessage('');
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Welcome, Admin {user?.name}</h1>
        <button onClick={logout} className="bg-red-600 text-white px-4 py-2 rounded">
          Logout
        </button>
      </div>

      <div className="bg-white shadow p-6 rounded max-w-md">
        <h2 className="text-xl font-semibold mb-4">Create Driver</h2>
        {message && <p className="text-green-600 mb-2">{message}</p>}
        {error && <p className="text-red-600 mb-2">{error}</p>}
        <form onSubmit={handleCreateDriver}>
          <input
            type="text"
            placeholder="Driver Name"
            className="w-full p-2 border rounded mb-3"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Driver Email"
            className="w-full p-2 border rounded mb-3"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Driver Password"
            className="w-full p-2 border rounded mb-3"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">
            Create Driver
          </button>
        </form>
      </div>
    </div>
  );
}
