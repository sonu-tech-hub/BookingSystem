// client/src/components/FilterComponent.js
import React, { useState, useEffect } from "react";
import api from "../utils/api";

const FilterComponent = () => {
  const [location, setLocation] = useState("");
  const [minPrice, setMinPrice] = useState(""); // Changed to minPrice
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  console.log(location, minPrice);

  const fetchFilteredData = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await api.get("/listings/filter", {
        params: {
          location,
          minPrice, // Only location and minPrice
        },
      });

      setResults(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error:", err);
      setError("Something went wrong. Please try again.");
      console.log("this is the error", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFilteredData();
  }, [location, minPrice]); // Only location and minPrice

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Filter Options</h2>

      {/* Filter Form */}
      <div className="space-y-6">
        <div className="flex flex-wrap gap-4 justify-between">
          {/* Location Filter */}
          <div className="w-full sm:w-1/3 lg:w-1/4">
            <label htmlFor="location" className="block text-lg mb-2">
              Location
            </label>
            <select
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-2 border rounded-md shadow-sm"
            >
              <option value="">Select Location</option>
              <option value="mathura">mathura</option>
              <option value="up">up</option>
              <option value="Chicago">Chicago</option>
              <option value="San Francisco">San Francisco</option>
            </select>
          </div>

          {/* Min Price Filter (Input) */}
          <div className="w-full sm:w-1/3 lg:w-1/4">
            <label htmlFor="minPrice" className="block text-lg mb-2">
              Min Price
            </label>
            <input
              type="number"
              id="minPrice"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-full p-2 border rounded-md shadow-sm"
              placeholder="Enter minimum price"
            />
          </div>
        </div>
      </div>

      {/* Loading and Error Messages */}
      {loading && <div className="text-center text-blue-500">Loading...</div>}
      {error && <div className="text-center text-red-500">{error}</div>}

      {/* Displaying Filtered Results */}
      <div className="mt-6">
        {results.length > 0 ? (
          <ul className="space-y-4">
            {results.map((item, index) => (
              <li key={index} className="border-b py-4">
                <h3 className="font-bold text-xl">{item.name}</h3>
                <p>{item.address.city}</p>
                <p>${item.pricing}</p>
              </li>
            ))}
          </ul>
        ) : (
          !loading && <p className="text-center text-gray-500">No results found.</p>
        )}
      </div>
    </div>
  );
};

export default FilterComponent;