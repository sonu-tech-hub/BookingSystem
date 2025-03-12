import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BookingForm from "./BookingForm";

const ListingCard = ({ listing }) => {
  const [showBookingForm, setShowBookingForm] = useState(false);

  return (
    <div className="border rounded-lg overflow-hidden shadow-md relative"> {/* Added relative positioning */}
      <img
        src={listing.images[0]}
        alt={listing.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{listing.name}</h3>
        <p className="text-gray-600 mb-2">{listing.address.city}, {listing.address.state}</p>
        <p className="text-gray-700">{listing.description.substring(0, 100)}...</p>
        <Link to={`/listing/${listing._id}`} className="mt-4 inline-block text-indigo-600 hover:text-indigo-800">
          View Details
        </Link>
        <button
          onClick={() => setShowBookingForm(true)}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 m-8"
        >
          Book Now
        </button>
        {showBookingForm && (
          <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-80 flex items-center justify-center">
            <BookingForm listingId={listing._id} setShowBookingForm={setShowBookingForm} />
          </div>
        )}
      </div>
     
    </div>
  );
};

export default ListingCard;