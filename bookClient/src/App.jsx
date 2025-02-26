import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ListingDetailsPage from './pages/ListingDetailsPage';
import VendorDashboard from './pages/VendorDashboard';
import CustomerDashboard from './pages/CustomerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import PrivateRoute from './components/PrivateRoute';
import VendorRoute from './components/VendorRoute';
import AdminRoute from './components/AdminRoute';
import VendorListings from './pages/VendorListings';
import CustomerBookings from './pages/CustomerBookings';
import CustomerReviews from './pages/CustomerReviews';
import AdminListings from './pages/AdminListings';
import AdminUsers from './pages/AdminUsers';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/listing/:id" element={<ListingDetailsPage />} />

        <Route
          path="/vendor-dashboard/*"
          element={
            <VendorRoute>
              <VendorDashboard />
            </VendorRoute>
          }
        >
          <Route index element={<VendorListings />} />
          <Route path="listings" element={<VendorListings />} />
        </Route>

        <Route
          path="/customer-dashboard/*"
          element={
            <PrivateRoute>
              <CustomerDashboard />
            </PrivateRoute>
          }
        >
          <Route index element={<CustomerBookings />} />
          <Route path="bookings" element={<CustomerBookings />} />
          <Route path="reviews" element={<CustomerReviews />} />
        </Route>

        <Route
          path="/admin-dashboard/*"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        >
          <Route index element={<AdminListings />} />
          <Route path="listings" element={<AdminListings />} />
          <Route path="users" element={<AdminUsers />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;