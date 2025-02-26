// client/src/pages/CustomerBookings.js
import React, { useState, useEffect } from 'react';
import api from '../utils/api';

const CustomerBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await api.get('/bookings/customer');
        setBookings(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch bookings');
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">My Bookings</h2>
      <ul>
        {bookings.map((booking) => (
          <li key={booking._id} className="border p-2 mb-2">
            <p>Listing ID: {booking.listingId}</p>
            <p>Booking Dates: {booking.bookingDates?.join(', ')}</p>
            <p>Booking Time: {booking.bookingTime ? new Date(booking.bookingTime).toLocaleString() : 'N/A'}</p>
            <p>Status: {booking.status}</p>
            {/* Add cancel/update functionality */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerBookings;