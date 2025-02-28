// client/src/pages/CustomerDashboard.js
import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Header from '../components/Header';
import CustomerReviews from './CustomerReviews';
const CustomerDashboard = () => {
  return (
    <div>
      <Header />
      <CustomerReviews/>
      <div className="p-4">
        <h1 className="text-3xl font-semibold mb-4">Customer Dashboard</h1>
        <nav className="mb-4">
          <Link to="/customer-dashboard/bookings" className="mr-4">My Bookings</Link>
          <Link to="/customer-dashboard/reviews" className="mr-4">My Reviews</Link>
        </nav>
        <Outlet />
      </div>
    </div>
  );
};

export default CustomerDashboard;