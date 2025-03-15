import React, { useState, useEffect } from "react";
import api from "../utils/api";
import ListingCard from "./ListingCard"; // Assuming ListingCard is in the same directory

const CombinedSearchFilter = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [debouncedQuery, setDebouncedQuery] = useState(query);

  const [location, setLocation] = useState("");
  const [minPrice, setMinPrice] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (debouncedQuery.length === 0 && location === "" && minPrice === "") {
      setResults([]);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError("");

      try {
        let response;
        if (debouncedQuery.length > 0) {
          response = await api.get("/listings/search", {
            params: { query: debouncedQuery },
          });
        } else if (location || minPrice) {
          response = await api.get("/listings/filter", {
            params: { location, minPrice },
          });
        } else {
          setResults([]); // No search or filter criteria
          setLoading(false);
          return;
        }

        setResults(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error:", err);
        setError("Something went wrong. Please try again.");
        console.log("this is the error", err);
        setLoading(false);
      }
    };

    fetchData();
  }, [debouncedQuery, location, minPrice]);

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Search Input and Button */}
      <div className="mb-4 flex flex-col sm:flex-row items-center">
        <div className="flex-1 mb-4 sm:mb-0 sm:mr-4">
          <input
            type="text"
            id="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full p-2 border rounded-md shadow-sm"
            placeholder="Search for items..."
            aria-label="Search for items"
          />
        </div>
        <button
          onClick={() => setQuery(query)}
          className="bg-blue-500 text-white py-2 px-8 rounded-md hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      {/* Filter Options */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
          <select
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-2 border rounded-md shadow-sm"
          >
            <option value="">Select Location</option>
            <option value="mathura">Mathura</option>
            <option value="up">UP</option>
            <option value="Chicago">Chicago</option>
            <option value="San Francisco">San Francisco</option>
          </select>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
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

      {/* Loading/Error Messages */}
      {loading && <div className="text-center text-blue-500">Loading...</div>}
      {error && <div className="text-center text-red-500">{error}</div>}

      {/* Listings */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {results.map((item) => (
          <ListingCard key={item._id} listing={item} />
        ))}
      </div>

      {/* No results found */}
      {results.length === 0 && !loading && (query || location || minPrice) && (
        <p className="text-center text-gray-500">No results found.</p>
      )}
    </div>
  );
};

export default CombinedSearchFilter;
