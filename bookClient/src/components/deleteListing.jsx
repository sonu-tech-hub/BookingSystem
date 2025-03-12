import React, { useState, useEffect } from 'react';
import api from '../utils/api';

const DeleteListing = () => {
  const [listings, setListings] = useState([]); // To hold the available listings
  const [selectedListingId, setSelectedListingId] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch all listings of the vendor
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await api.get('/listings');
        setListings(response.data.filter(listing => listing.vendorId === JSON.parse(localStorage.getItem('user'))._id));
      } catch (err) {
        setError('Error fetching listings');
        console.error('Error fetching listings:', err);
      }
    };

    fetchListings();
  }, []);

  // Handle deletion of listing and all associated units
  const handleDelete = async () => {
    if (!selectedListingId) {
      setError('Please select a listing to delete');
      return;
    }

    try {
      // Delete the listing and all associated units
      const response = await api.delete(`/listings/${selectedListingId}`);

      if (response.status === 200) {
        setSuccessMessage('Listing and all associated units deleted successfully!');
        setSelectedListingId(''); // Clear selected listing
        setError(''); // Clear any errors
      } else {
        setError('Failed to delete listing');
      }
    } catch (err) {
      setError('Error deleting listing');
      console.error('Error deleting listing:', err);
    }
  };

  return (
    <div>
      {/* Error Message */}
      {error && <div className="text-red-500 mb-4">{error}</div>}

      {/* Success Message */}
      {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}

      {/* Listing Dropdown */}
      <div className="mb-4">
        <label htmlFor="listingId" className="block text-sm font-medium text-gray-700">Delete Listing </label>
        <select
          id="listingId"
          value={selectedListingId}
          onChange={(e) => setSelectedListingId(e.target.value)}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
        >
          <option value="">Select Listing</option>
          {listings.length > 0 ? (
            listings.map((listing) => (
              <option key={listing._id} value={listing._id}>
                {listing.name} - {listing.address.city}
              </option>
            ))
          ) : (
            <option>No listings available</option>
          )}
        </select>
      </div>

      {/* Delete Button */}
      {selectedListingId && (
        <button
          onClick={handleDelete}
          className="text-white py-2 px-6 hover:underline bg-red-500 rounded-md"
        >
          Delete Listing 
        </button>
      )}
    </div>
  );
};

export default DeleteListing;
