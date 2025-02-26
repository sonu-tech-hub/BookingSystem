// client/src/components/VendorRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const VendorRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return user && (user.role === 'vendor' || user.role === 'admin') ? <Outlet /> : <Navigate to="/login" />;
};

export default VendorRoute;