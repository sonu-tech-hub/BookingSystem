// client/src/pages/AdminDashboard.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

const AdminDashboard = () => {
  return (
    <div>
      <Header />
      <div className="p-4">
        <h1 className="text-3xl font-semibold mb-4">Admin Dashboard</h1>
        {/* Navigation for admin dashboard */}
        <nav className="mb-4">
          {/* Add links to manage listings, users, etc. */}
        </nav>
        {/* <Outlet /> To render nested routes */}
      </div>
    </div>
  );
};

export default AdminDashboard;