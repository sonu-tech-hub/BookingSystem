import React, { useState, useEffect } from "react";
import api from "../utils/api";

const FilterComponent = () => {
  const [location, setLocation] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchFilteredData = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await api.get("/listings/filter", {
        params: {
          location,
          minPrice,
        },
      });

      setResults(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error:", err);
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (location || minPrice) {
      fetchFilteredData();
    }
  }, [location, minPrice]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Filters</h2>

      {/* Filter Form */}
      <div className="space-y-6">
        <div className="flex flex-wrap gap-4 justify-between">
          {/* Location Filter */}
          <div className="w-full sm:w-1/2 lg:w-1/3">
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
              <option value="mathura">Mathura</option>
              <option value="up">U.P.</option>
              <option value="Chicago">Chicago</option>
              <option value="San Francisco">San Francisco</option>
            </select>
          </div>

          {/* Min Price Filter */}
          <div className="w-full sm:w-1/2 lg:w-1/3">
            <label htmlFor="minPrice" className="block text-lg mb-2">
              Min Price
            </label>
            <input
              type="number"
              id="minPrice"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-full p-2 border rounded-md shadow-sm"
              placeholder="Min Price"
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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {results.map((item, index) => (
        <div key={index} className="border rounded-lg overflow-hidden shadow-md p-6">
          <h3 className="font-semibold text-xl mb-2">{item.name}</h3>
          <p className="text-sm text-gray-600 mb-2">{item.address.city}</p>
          <p className="font-medium text-lg text-gray-800">${item.pricing}</p>
        </div>
      ))}
    </div>
  ) : (
    !loading && (
      <p className="text-center text-gray-500">No results found.</p>
    )
  )}
</div>

    </div>
  );
};

export default FilterComponent;
