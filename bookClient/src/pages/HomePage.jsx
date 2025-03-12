// client/src/pages/HomePage.js
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import ListingCard from '../components/ListingCard';
import api from '../utils/api';
// import Browser from '../components/Browser';
// import FilterComponent from '../components/Filter';
import CombinedSearchFilter from '../components/combine';


const HomePage = () => {
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
        setError('Failed to fetch listings',err);
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

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

  return (
    <div>
      <Header />
      {/* <Browser />
      <FilterComponent/> */}
      <CombinedSearchFilter/>
      <div className="p-4">
        <h1 className="text-3xl font-semibold mb-4">Welcome to Hotel &  Restaurant Booking</h1>
        <p>Explore our listings and book your next stay or meal.</p>
       
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {listings.map((listing) => (
            <ListingCard key={listing._id} listing={listing} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;