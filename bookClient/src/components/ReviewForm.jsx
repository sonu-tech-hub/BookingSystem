import React, { useState, useEffect } from 'react';
import api from '../utils/api';

const Reviews = ({ listingId }) => {
  const [reviews, setReviews] = useState([]);  // State is initialized as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showReviews, setShowReviews] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // Initiate the API request
        const response = await api.get(`/reviews/${listingId}`);
        
        // Log the response to inspect it
        console.log("API Response:", response.data);
    
        // Check if the response is an array
        if (Array.isArray(response.data)) {
          // If data is in the correct format, update the state
          setReviews(response.data);
        } else if (response.data && response.data.reviews && Array.isArray(response.data.reviews)) {
          // If the data structure has a "reviews" key, update the state accordingly
          setReviews(response.data.reviews);
        } else {
          // Handle the case where data format is unexpected
          setReviews([]);
          setError('The reviews data is not in the expected format.');
        }
        setLoading(false);
      } catch (err) {
        // Handle the error in case the request fails
        console.error("Error fetching reviews:", err);
        
        // Set the error message based on the error
        setError(err.response ? err.response.data.message : err.message);
        setLoading(false);
      }
    };
    
    if (listingId) {
      fetchReviews();
    }
  }, [listingId]);

  if (loading) {
    return <div className="text-lg text-gray-600">Loading reviews...</div>;
  }

  if (error) {
    return <div className="text-lg text-red-600">Error: {error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <button
        className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-400 transition duration-200 mb-4"
        onClick={() => setShowReviews(!showReviews)}
      >
        {showReviews ? 'Hide Reviews' : 'Show Reviews'}
      </button>

      {showReviews && (
        <div className="space-y-4">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review._id} className="bg-gray-50 p-4 rounded-lg shadow-md hover:shadow-lg transition">
                <p className="font-semibold text-xl text-gray-800">
                  {review.customerId ? review.customerId.name : 'Unknown User'} {/* Show name here */}
                </p>
                <p className="text-gray-600 mt-2">
                  {review.comments.length > 100 ? review.comments.slice(0, 100) + '...' : review.comments}
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  <em>Rating: {review.rating}</em>
                </p>
              </div>
            ))
          ) : (
            <p>No reviews available for this listing.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Reviews;
