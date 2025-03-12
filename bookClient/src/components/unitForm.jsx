import React, { useState, useEffect } from 'react';
import api from '../utils/api';


const UnitModal = ({ isOpen, closeModal, unitId, fetchUnits, vendorId }) => {
  
  const [unitData, setUnitData] = useState({
    listingId: '',
    type: '',
    capacity: '',
    price: '',
    availability: true,
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [listings, setListings] = useState([]); // To hold the vendor's listings

  // Fetch the listings of the vendor (only when the modal is open)
  useEffect(() => {
    if (isOpen) {
      const fetchVendorListings = async () => {
        try {
          const response = await api.get(`/listings`);
          setListings(response.data.filter(listing => listing.vendorId === JSON.parse(localStorage.getItem('user'))._id));
           // Store the listings of the vendor
        } catch (err) {
          setError('Failed to fetch listings');
        }
      };

      fetchVendorListings();

      // Fetch unit details if editing (update)
      if (unitId) {
        const fetchUnit = async () => {
          try {
            const response = await api.get(`/units/unit/${unitId}`);
            setUnitData(response.data);
          } catch (err) {
            setError('Failed to fetch unit details');
          }
        };
        fetchUnit();
      } else {
        setUnitData({
          listingId: '', // Reset the unit data when creating a new unit
          type: '',
          capacity: '',
          price: '',
          availability: true,
        });
      }
    }
  }, [isOpen, unitId]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUnitData({
      ...unitData,
      [name]: value,
    });
  };

  // Handle form submission (create or update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (unitId) {
      try {
        const response = await api.put(`/units/unit/${unitId}`, unitData);
        setSuccessMessage('Unit updated successfully!');
        fetchUnits();
        closeModal();  // Close the modal after successful update
      } catch (err) {
        setError('Failed to update unit');
      }
    } else {
      try {
        const response = await api.post('/units', unitData);
        setSuccessMessage('Unit created successfully!');
        fetchUnits();
        closeModal();  // Close the modal after successful creation
      } catch (err) {
        setError('Failed to create unit');
      }
    }
  };

  // Handle unit deletion
  const handleDelete = async () => {
    try {
      await api.delete(`/units/unit/${unitId}`);
      setSuccessMessage('Unit deleted successfully!');
      fetchUnits();
      closeModal();  // Close the modal after successful deletion
    } catch (err) {
      setError('Failed to delete unit');
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-md w-11/12 sm:w-96 relative">
          <button
            className="absolute top-2 right-2 text-xl font-bold text-gray-500"
            onClick={closeModal}
          >
            &times;
          </button>

          <h2 className="text-2xl font-semibold mb-4">{unitId ? 'Update Unit' : 'Create Unit'}</h2>
          
          {error && <div className="text-red-500 mb-4">{error}</div>}
          {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}

          <form onSubmit={handleSubmit}>
            {/* Listing ID Dropdown */}
            <div className="mb-4">
              <label htmlFor="listingId" className="block text-sm font-medium text-gray-700">Listing ID</label>
              <select
                id="listingId"
                name="listingId"
                value={unitData.listingId}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
                required
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

            {/* Other Fields */}
            <div className="mb-4">
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">Unit Type</label>
              <input
                type="text"
                id="type"
                name="type"
                value={unitData.type}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="capacity" className="block text-sm font-medium text-gray-700">Capacity</label>
              <input
                type="number"
                id="capacity"
                name="capacity"
                value={unitData.capacity}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
              <input
                type="number"
                id="price"
                name="price"
                value={unitData.price}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="availability" className="block text-sm font-medium text-gray-700">Availability</label>
              <select
                id="availability"
                name="availability"
                value={unitData.availability}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
              >
                <option value={true}>Available</option>
                <option value={false}>Not Available</option>
              </select>
            </div>

            <div className="flex justify-between mt-4">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none"
              >
                {unitId ? 'Update Unit' : 'Create Unit'}
              </button>

              {unitId && (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="px-6 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 focus:outline-none"
                >
                  Delete Unit
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default UnitModal;
