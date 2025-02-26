// client/src/components/ListingCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const ListingCard = ({ listing }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-md">
      <img
        src={listing.images[0]} // Assuming the first image is the main image
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
      </div>
    </div>
  );
};

export default ListingCard;