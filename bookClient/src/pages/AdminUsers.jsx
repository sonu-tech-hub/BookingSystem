// client/src/pages/AdminUsers.js
import React, { useState, useEffect } from 'react';
import api from '../utils/api';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/users');
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch users');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, role) => {
    try {
      await api.put(`/users/${userId}`, { role });
      setUsers(users.map(user => user._id === userId ? { ...user, role } : user));
    } catch (err) {
      setError('Failed to update user role');
    }
  };

  const handleDelete = async (userId) => {
    try {
      await api.delete(`/users/${userId}`);
      setUsers(users.filter(user => user._id !== userId));
    } catch (err) {
      setError('Failed to delete user');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Manage Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id} className="border p-2 mb-2">
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
            <select value={user.role} onChange={(e) => handleRoleChange(user._id, e.target.value)}>
              <option value="customer">Customer</option>
              <option value="vendor">Vendor</option>
              <option value="admin">Admin</option>
            </select>
            <button onClick={() => handleDelete(user._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-2">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminUsers;