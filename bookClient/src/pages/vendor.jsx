import React, { useState } from 'react';
import axios from 'axios';

const ListingManagement = () => {
  const [propertyName, setPropertyName] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [description, setDescription] = useState('');
  const [pricing, setPricing] = useState('');
  const [roomTypes, setRoomTypes] = useState('');
  const [availability, setAvailability] = useState('Available');
  const [facilities, setFacilities] = useState([]);
  const [newFacility, setNewFacility] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const maxImages = 10;

  // Handle image uploads
  const handleImageUpload = (e) => {
    const newImages = Array.from(e.target.files);
    if (newImages.length + images.length <= maxImages) {
      setImages([...images, ...newImages]);
    } else {
      setError(`You can upload up to ${maxImages} images only.`);
    }
  };

  // Remove an image from the preview list
  const removeImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  // Add a facility to the list
  const handleAddFacility = () => {
    if (newFacility.trim()) {
      setFacilities((prev) => [...prev, newFacility.trim()]);
      setNewFacility('');
    }
  };

  // Remove a facility from the list
  const handleRemoveFacility = (index) => {
    const updatedFacilities = facilities.filter((_, i) => i !== index);
    setFacilities(updatedFacilities);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!propertyName || !address || !contact || !description || !pricing || !roomTypes) {
      setError('All fields are required.');
      return;
    }

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('propertyName', propertyName);
    formData.append('address', address);
    formData.append('contact', contact);
    formData.append('description', description);
    formData.append('pricing', pricing);
    formData.append('roomTypes', roomTypes);
    formData.append('availability', availability);
    formData.append('facilities', JSON.stringify(facilities));
    images.forEach((image, index) => {
      formData.append(`images[${index}]`, image);
    });

    try {
      const response = await axios.post('http://localhost:5000/api/listings', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Listing added successfully!');
      // Clear the form
      setPropertyName('');
      setAddress('');
      setContact('');
      setDescription('');
      setPricing('');
      setRoomTypes('');
      setFacilities([]);
      setImages([]);
    } catch (error) {
      setError('There was an error submitting the listing.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg max-w-3xl">
      <h2 className="text-2xl font-bold text-center mb-6">Add a New Listing</h2>

      {error && (
        <p className="text-red-500 text-center mb-4">{error}</p>
      )}

      <form onSubmit={handleSubmit}>
        {/* Property Name */}
        <div className="mb-4">
          <label className="block text-gray-700">Property Name</label>
          <input
            type="text"
            value={propertyName}
            onChange={(e) => setPropertyName(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Enter property name"
          />
        </div>

        {/* Address */}
        <div className="mb-4">
          <label className="block text-gray-700">Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Enter address (City, State, Zip)"
          />
        </div>

        {/* Contact */}
        <div className="mb-4">
          <label className="block text-gray-700">Contact Information</label>
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Enter contact details (email/phone)"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Enter property description"
          />
        </div>

        {/* Pricing */}
        <div className="mb-4">
          <label className="block text-gray-700">Pricing Information</label>
          <input
            type="number"
            value={pricing}
            onChange={(e) => setPricing(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Enter pricing details"
          />
        </div>

        {/* Room Types */}
        <div className="mb-4">
          <label className="block text-gray-700">Available Room Types</label>
          <input
            type="text"
            value={roomTypes}
            onChange={(e) => setRoomTypes(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Enter available room types"
          />
        </div>

        {/* Availability */}
        <div className="mb-4">
          <label className="block text-gray-700">Availability</label>
          <select
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
          >
            <option value="Available">Available</option>
            <option value="Unavailable">Unavailable</option>
          </select>
        </div>

        {/* Facilities */}
        <div className="mb-4">
          <label className="block text-gray-700">Add Facilities</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newFacility}
              onChange={(e) => setNewFacility(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Enter a facility"
            />
            <button
              type="button"
              onClick={handleAddFacility}
              className="p-3 bg-blue-500 text-white rounded-md"
            >
              Add
            </button>
          </div>
          <div className="mt-2">
            {facilities.length > 0 && (
              <ul className="list-disc pl-5">
                {facilities.map((facility, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span>{facility}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveFacility(index)}
                      className="ml-2 text-red-500"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label className="block text-gray-700">Upload Images</label>
          <input
            type="file"
            onChange={handleImageUpload}
            multiple
            accept="image/*"
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          <p className="text-gray-500 mt-2">You can upload up to {maxImages} images.</p>

          <div className="mt-4">
            {images.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`image-${index}`}
                      className="w-32 h-32 object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-0 right-0 text-white bg-red-500 rounded-full p-1"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            disabled={loading}
            className="w-full p-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300"
          >
            {loading ? (
              <span>Loading...</span>
            ) : (
              'Submit Listing'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ListingManagement;
