// client/src/pages/VendorDashboard.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

const VendorDashboard = () => {
  return (
    <div>
      <Header />
      <div className="p-4">
        <h1 className="text-3xl font-semibold mb-4">Vendor Dashboard</h1>
        {/* Navigation for vendor dashboard */}
        <nav className="mb-4">
          {/* Add links to manage listings, bookings, etc. */}
        </nav>
        <Outlet /> {/* To render nested routes */}
      </div>
    </div>
  );
};

export default VendorDashboard;