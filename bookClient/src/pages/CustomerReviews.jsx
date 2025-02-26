// client/src/pages/CustomerReviews.js
import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import ReviewForm from '../components/ReviewForm';

const CustomerReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await api.get('/reviews/customer');
        setReviews(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch reviews');
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">My Reviews</h2>
      <ReviewForm />
      <ul>
        {reviews.map((review) => (
          <li key={review._id} className="border p-2 mb-2">
            <p>Rating: {review.rating}</p>
            <p>Comments: {review.comments}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerReviews;