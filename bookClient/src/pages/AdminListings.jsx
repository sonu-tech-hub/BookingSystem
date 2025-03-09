// client/src/pages/AdminListings.js
import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import ListingCard from '../components/ListingCard';
import AdminUsers from './AdminUsers';

const AdminListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await api.get('/listings');
        setListings(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch listings');
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  const handleApprove = async (listingId) => {
    try {
        console.log("Approving listingId:", listingId); // Verify listingId
        const response = await api.put(`/listings/${listingId}`, { approved: true });
        setListings(listings.map(listing => listing._id === listingId ? { ...listing, approved: true } : listing));
    } catch (err) {
        console.error("Error approving listing:", err);
        if(err.response){
            console.error("backend error", err.response);
        }
        setError('Failed to approve listing');
    }
};

const handleReject = async (listingId) => {
    try {
        console.log("Rejecting listingId:", listingId); // Verify listingId
        await api.put(`/listings/${listingId}`, { approved: false });
        setListings(listings.map(listing => listing._id === listingId ? { ...listing, approved: false } : listing));
    } catch (err) {
        console.error("Error rejecting listing:", err);
        if(err.response){
            console.error("backend error", err.response);
        }
        setError('Failed to reject listing');
        console.log("listingId", listingId);
    }
};
  
  // console.log(listing   ._id )
    

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Manage Listings</h2>
      <AdminUsers />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {listings.map((listing) => (
          <div key={listing._id} className="border p-4 rounded-lg">
            <ListingCard listing={listing} />
            <div className="mt-4">
              {listing.approved === undefined && (
                <>
                  <button onClick={() => handleApprove(listing._id)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2">
                    Approve
                  </button>
                  <button onClick={() => handleReject(listing._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    Reject
                  </button>
                </>
              )}
              {listing.approved === true && <span className="text-green-600">Approved</span>}
              {listing.approved === false && <span className="text-red-600">Rejected</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminListings;