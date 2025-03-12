import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import CreateReview from '../components/CreateReview';
import { MdPreview } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai"; // Close icon

const CustomerBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showReview, setShowReview] = useState(false); // State to toggle CreateReview visibility

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

  // Toggle the CreateReview component visibility
  const handleReviewToggle = () => {
    setShowReview(!showReview);
  };

  // Close the modal
  const handleCloseModal = () => {
    setShowReview(false);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <>
      <div className="relative flex flex-col sm:flex-row sm:gap-10 p-4">
        {/* Bookings List */}
        <div className="w-full sm:w-3/5">
          <h2 className="text-2xl font-semibold mb-4">My Bookings</h2>
          <ul>
            {bookings.map((booking) => (
              <li key={booking._id} className="border p-4 mb-4 rounded-lg shadow-md">
                <p><strong>Listing ID:</strong> {booking.listingId}</p>
                <p><strong>Booking Dates:</strong> {booking.bookingDates?.join(', ')}</p>
                <p><strong>Booking Time:</strong> {booking.bookingTime ? new Date(booking.bookingTime).toLocaleString() : 'N/A'}</p>
                <p><strong>Status:</strong> {booking.status}</p>
                {/* Add cancel/update functionality here */}
              </li>
            ))}
          </ul>
        </div>

        {/* Create Review Section */}
        <div className="w-full sm:w-2/5 flex justify-center items-center">
          <div className="relative">
            {/* Toggle button (MdPreview Icon) */}
            <MdPreview
              onClick={handleReviewToggle}
              className="cursor-pointer w-14 h-14 text-green-700 hover:text-green-500 transition-colors duration-300"
            />

            {/* Modal (CreateReview) */}
            {showReview && (
              <>
                {/* Modal Background with blur effect */}
                <div
                  className="fixed inset-0 bg-black opacity-50 z-20 backdrop-blur-sm"
                  onClick={handleCloseModal} // Close modal when clicking outside
                ></div>

                {/* Modal Content */}
                <div className="fixed inset-0 flex justify-center items-center z-30">
                  <div className="relative bg-white p-6 rounded-lg shadow-xl w-11/12 sm:w-1/3">
                    {/* Close Icon */}
                    <AiOutlineClose
                      onClick={handleCloseModal}
                      className="absolute top-2 right-2 cursor-pointer text-xl text-gray-600 hover:text-red-600"
                    />

                    <CreateReview />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerBookings;
