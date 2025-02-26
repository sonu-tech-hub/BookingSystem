import React, { useState, useEffect } from "react";
import axios from "axios";

const FilterComponent = () => {
  // State variables to store filter values
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState(""); // Changed to store a single selected range value
  const [ratings, setRatings] = useState(1);  // Store a single rating value
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle fetching data based on filters
  const fetchFilteredData = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("https://your-backend-url.com/api/filter", {
        location,
        priceRange,
        ratings,
      });

      setResults(response.data);  // Assuming backend returns an array of results
      setLoading(false);
    } catch (err) {
      console.error("Error:", err);
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  // Trigger API call whenever any filter changes
  useEffect(() => {
    fetchFilteredData();
  }, [location, priceRange, ratings]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Filter Options</h2>

      {/* Filter Form */}
      <div className="space-y-6">
        <div className="flex flex-wrap gap-4 justify-between">
          {/* Location Filter */}
          <div className="w-full sm:w-1/3 lg:w-1/4">
            <label htmlFor="location" className="block text-lg mb-2">Location</label>
            <select
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-2 border rounded-md shadow-sm"
            >
              <option value="">Select Location</option>
              <option value="New York">New York</option>
              <option value="Los Angeles">Los Angeles</option>
              <option value="Chicago">Chicago</option>
              <option value="San Francisco">San Francisco</option>
            </select>
          </div>

          {/* Price Filter (Dropdown) */}
          <div className="w-full sm:w-1/3 lg:w-1/4">
            <label htmlFor="price" className="block text-lg mb-2">Price Range</label>
            <select
              id="price"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full p-2 border rounded-md shadow-sm"
            >
              <option value="">Select Price Range</option>
              <option value="0-100">$0 - $100</option>
              <option value="100-500">$100 - $500</option>
              <option value="500-1000">$500 - $1000</option>
              <option value="1000+">$1000+</option>
            </select>
          </div>

          {/* Ratings Filter (Dropdown) */}
          <div className="w-full sm:w-1/3 lg:w-1/4">
            <label htmlFor="ratings" className="block text-lg mb-2">Ratings</label>
            <select
              id="ratings"
              value={ratings}
              onChange={(e) => setRatings(Number(e.target.value))}
              className="w-full p-2 border rounded-md shadow-sm"
            >
              <option value={1}>1★</option>
              <option value={2}>2★</option>
              <option value={3}>3★</option>
              <option value={4}>4★</option>
              <option value={5}>5★</option>
            </select>
          </div>
        </div>
      </div>

      {/* Loading and Error Messages */}
      {loading && <div className="text-center text-blue-500">Loading...</div>}
      {error && <div className="text-center text-red-500"></div>}

      {/* Displaying Filtered Results */}
      <div className="mt-6">
        {results.length > 0 ? (
          <ul className="space-y-4">
            {results.map((item, index) => (
              <li key={index} className="border-b py-4">
                <h3 className="font-bold text-xl">{item.name}</h3>
                <p>{item.location}</p>
                <p>${item.price}</p>
                <p>{item.ratings}★</p>
              </li>
            ))}
          </ul>
        ) : (
          !loading && <p className="text-center text-gray-500"></p>
        )}
      </div>
    </div>
  );
};

export default FilterComponent;
