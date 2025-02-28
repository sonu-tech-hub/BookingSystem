import React, { useState, useEffect } from "react";
// import axios from "axios";
import api from "../utils/api"; 

const Browser = () => {
  const [query, setQuery] = useState("");  // Store search input
  const [results, setResults] = useState([]);  // Store search results
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Debouncing the search input
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500); // Adjust debounce time (500ms)

    return () => clearTimeout(timer);  // Cleanup on query change
  }, [query]);

  // Fetch data from backend when debouncedQuery changes
  useEffect(() => {
    if (debouncedQuery.length === 0) {
      setResults([]);
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await api.get("/listings/search", {
          params: { query: debouncedQuery },
        });

        setResults(response.data);  // Assuming backend returns an array of results
        setLoading(false);
      } catch (err) {
        console.error("Error:", err);
        setError("Something went wrong. Please try again.");
        console.log("this is the error bro", err);
        setLoading(false);
      }
    };

    fetchResults();
  }, [debouncedQuery]);

   
  return (
    <div className="max-w-4xl mx-auto p-4">
      
      
      <div className="mb-4 flex items-center">
        <div className="flex-1">
          <label htmlFor="search" className="block text-lg mb-2"> </label>
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
          onClick={() => setQuery(query)} // Optional: You can trigger a search with this button if needed
          className="ml-2 bg-blue-500 text-white py-2 px-8 mt-4 rounded-md hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      {loading && (
        <div className="text-center text-blue-500">Searching...</div>
      )}

      {error && (
        <div className="text-red-500 text-center mt-4">
          <p>{error}</p>
        </div>
      )}

      {/* Displaying search results */}
      <div className="mt-4">
        {results.length > 0 ? (
          <ul className="space-y-2">
            {results.map((item, index) => (
              <li key={index} className="border-b py-2">{item.name}</li> // Assuming 'name' is the field in the response
            ))}
          </ul>
        ) : (
          !loading && <p className="text-center text-gray-500"></p>
        )}
      </div>
    </div>
  );
};

export default Browser;
