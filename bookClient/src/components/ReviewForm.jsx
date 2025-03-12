// // client/src/components/ReviewForm.js
// import React, { useState } from 'react';
// import api from '../utils/api';

// const ReviewForm = () => {
//   const [bookingId, setBookingId] = useState('');
//   const [rating, setRating] = useState(5);
//   const [comments, setComments] = useState('');
//   const [error, setError] = useState(null);

// /*************  ✨ Codeium Command ⭐  *************/
//   /**
//    * Handles the form submission of the review form. Posts a new review
//    * to the API and handles any errors that occur. If successful, refreshes
//    * the reviews list or shows a success message.
//    * @param {Event} e The form submission event
//    */
// /******  662fb135-ae16-4431-b55c-dc876dc48895  *******/
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await api.post('/reviews', { bookingId, rating, comments });
//       // Refresh reviews or show success message
//     } catch (err) {
//       setError('Failed to create review',err);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="mb-4 border p-4">
//       <h3 className="text-lg font-semibold mb-2">Create Review</h3>
//       {error && <p className="text-red-500">{error}</p>}
//       <div className="mb-2">
//         <label>Booking ID:</label>
//         <input type="text" value={bookingId} onChange={(e) => setBookingId(e.target.value)} className="border p-2 w-full" />
//       </div>
//       <div className="mb-2">
//         <label>Rating:</label>
//         <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} min="1" max="5" className="border p-2 w-full" />
//       </div>
//       <div className="mb-2">
//         <label>Comments:</label>
//         <textarea value={comments} onChange={(e) => setComments(e.target.value)} className="border p-2 w-full" />
//       </div>
//       <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//         Submit Review
//       </button>
//     </form>
//   );
// };

// export default ReviewForm;