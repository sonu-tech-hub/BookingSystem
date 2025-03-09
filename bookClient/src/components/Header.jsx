// client/src/components/Header.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Hotel & Restaurant Booking
        </Link>
        <div>
          {user ? (
            <>
              {user.role === 'vendor' && <Link to="/vendor-dashboard" className="mr-4">Vendor  Dashboard</Link>}
              {user.role === 'customer' && <Link to="/customer-dashboard" className="mr-4">Customer Dashboard</Link>}
              {user.role === 'admin' && <Link to="/admin-dashboard" className="mr-4">Admin Dashboard</Link>}
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="mr-4">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;