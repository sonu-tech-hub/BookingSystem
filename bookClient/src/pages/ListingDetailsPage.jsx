// client/src/pages/ListingDetailsPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import api from '../utils/api';
import Reviews from '../components/ReviewForm';


const ListingDetailsPage = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await api.get(`/listings/${id}`);
        setListing(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch listing');
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  if (loading) {
    return (
      <div>
        <Header />
        <div className="p-4">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Header />
        <div className="p-4 text-red-500">{error}</div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div>
        <Header />
        <div className="p-4">Listing not found.</div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="p-4">
        <h1 className="text-3xl font-semibold mb-4">{listing.name}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            {listing.images.map((image, index) => (
              <img key={index} src={image} alt={listing.name} className="w-full mb-2 rounded-lg" />
            ))}
          </div>
          <div>
            <p className="text-gray-600 mb-2">{listing.address.street}, {listing.address.city}, {listing.address.state} {listing.address.zip}</p>
            <p className="text-gray-700 mb-4">{listing.description}</p>
            <h2 className="text-xl font-semibold mb-2">Facilities</h2>
            <ul className="list-disc list-inside mb-4">
              {listing.facilities.map((facility, index) => (
                <li key={index}>{facility}</li>
              ))}
            </ul>
            <p className="text-lg font-semibold">Price: ${listing.pricing}</p>
            <p className='text-lg font-semibold'><Reviews/> </p>
            {/* Add booking functionality here */}
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default ListingDetailsPage;