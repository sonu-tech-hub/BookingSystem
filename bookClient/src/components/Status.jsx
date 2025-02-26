import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookingManagement = ({ listings }) => {
  const [bookings, setBookings] = useState([]);
  const [availability, setAvailability] = useState({});
  const [bookingStatuses, setBookingStatuses] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const bookingsResponse = await axios.get('/api/bookings');
        setBookings(bookingsResponse.data);

        const availabilityResponse = await axios.get('/api/availability');
        setAvailability(availabilityResponse.data);

        const bookingStatusesResponse = await axios.get('/api/bookingStatuses');
        setBookingStatuses(bookingStatusesResponse.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleUpdateAvailability = async (listingId, isAvailable) => {
    try {
      await axios.put(`/api/availability/${listingId}`, { isAvailable });
      setAvailability({ ...availability, [listingId]: isAvailable });
    } catch (err) {
      setError(err);
    }
  };

  const handleUpdateBookingStatus = async (bookingId, status) => {
    try {
      await axios.put(`/api/bookingStatuses/${bookingId}`, { status });
      setBookingStatuses({ ...bookingStatuses, [bookingId]: status });
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.id === bookingId ? { ...booking, status } : booking
        )
      );
    } catch (err) {
      setError(err);
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4">Error: {error.message}</div>;

  const pendingBookings = bookings.filter((booking) => bookingStatuses[booking.id] === 'pending');
  const confirmedBookings = bookings.filter((booking) => bookingStatuses[booking.id] === 'confirmed');
  const cancelledBookings = bookings.filter((booking) => bookingStatuses[booking.id] === 'cancelled');

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Booking Management</h2>

      <div className="mb-4 p-4 border rounded">
        <h3 className="text-lg font-semibold mb-2">Listing Availability</h3>
        <ul className="list-none p-0">
          {listings.map((listing) => (
            <li key={listing.id} className="mb-2">
              {listing.title}:{' '}
              <button
                onClick={() => handleUpdateAvailability(listing.id, true)}
                disabled={availability[listing.id]}
                className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2 ${
                  availability[listing.id] ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                Available
              </button>
              <button
                onClick={() => handleUpdateAvailability(listing.id, false)}
                disabled={!availability[listing.id]}
                className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ${
                  !availability[listing.id] ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                Unavailable
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="bookings">
        <h3 className="text-lg font-semibold mb-2">Pending Bookings</h3>
        <ul className="list-none p-0 mb-4 border rounded p-4">
          {pendingBookings.map((booking) => (
            <li key={booking.id} className="mb-2">
              Booking ID: {booking.id}, Listing: {booking.listingId}, Dates: {booking.dates}, Guest: {booking.guest}
              <button
                onClick={() => handleUpdateBookingStatus(booking.id, 'confirmed')}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Confirm
              </button>
              <button
                onClick={() => handleUpdateBookingStatus(booking.id, 'cancelled')}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
            </li>
          ))}
        </ul>

        <h3 className="text-lg font-semibold mb-2">Confirmed Bookings</h3>
        <ul className="list-none p-0 mb-4 border rounded p-4">
          {confirmedBookings.map((booking) => (
            <li key={booking.id} className="mb-2">
              Booking ID: {booking.id}, Listing: {booking.listingId}, Dates: {booking.dates}, Guest: {booking.guest}
              <button
                onClick={() => handleUpdateBookingStatus(booking.id, 'cancelled')}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
            </li>
          ))}
        </ul>

        <h3 className="text-lg font-semibold mb-2">Cancelled Bookings</h3>
        <ul className="list-none p-0 mb-4 border rounded p-4">
          {cancelledBookings.map((booking) => (
            <li key={booking.id} className="mb-2">
              Booking ID: {booking.id}, Listing: {booking.listingId}, Dates: {booking.dates}, Guest: {booking.guest}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BookingManagement;