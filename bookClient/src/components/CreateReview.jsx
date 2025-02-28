import React, { useState, useEffect } from 'react';
import api from '../utils/api';

const CreateReview = ({ onReviewCreated }) => {
  const [rating, setRating] = useState(5);
  const [comments, setComments] = useState('');
  const [error, setError] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [bookingId, setBookingId] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await api.get('/bookings/customer');
        setBookings(response.data);
      } catch (error) {
        setError('Failed to fetch bookings');
      }
    };
    fetchBookings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/reviews', { bookingId, rating, comments });
      if (onReviewCreated) {
        onReviewCreated();
      }
      setRating(5);
      setComments('');
      setBookingId('');
    } catch (err) {
      setError('Failed to create review');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 border p-4">
      <h3 className="text-lg font-semibold mb-2">Create Review</h3>
      {error && <p className="text-red-500">{error}</p>}
      <div className="mb-2">
        <label>Booking:</label>
        <select value={bookingId} onChange={(e) => setBookingId(e.target.value)} className="border p-2 w-full">
          <option value="">Select Booking</option>
          {bookings.map((booking) => (
            <option key={booking._id} value={booking._id}>
              {booking._id}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-2">
        <label>Rating:</label>
        <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} min="1" max="5" className="border p-2 w-full" />
      </div>
      <div className="mb-2">
        <label>Comments:</label>
        <textarea value={comments} onChange={(e) => setComments(e.target.value)} className="border p-2 w-full" />
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Submit Review
      </button>
    </form>
  );
};

export default CreateReview;