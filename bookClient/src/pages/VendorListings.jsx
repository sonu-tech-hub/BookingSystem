// client/src/pages/VendorListings.js
import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import ListingCard from '../components/ListingCard';
import ImageUpload from '../components/ImageUpload';
import UnitList from '../components/unitModel';
import DeleteUnit from '../components/deleteUnit';
import DeleteListing from '../components/deleteListing';

const VendorListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: 'hotel',
    address: { street: '', city: '', state: '', zip: '' },
    description: '',
    facilities: [],
    pricing: 0,
    images: [],
  });
  console.log(formData)
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await api.get('/listings');
        setListings(response.data.filter(listing => listing.vendorId === JSON.parse(localStorage.getItem('user'))._id));
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch listings');
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  const handleInputChange = (e) => {
    if (e.target.name.startsWith('address.')) {
      const addressField = e.target.name.split('.')[1];
      setFormData({
        ...formData,
        address: { ...formData.address, [addressField]: e.target.value },
      });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleFacilitiesChange = (e) => {
    const facilities = e.target.value.split(',').map(item => item.trim());
    setFormData({ ...formData, facilities });
  };

  const handleImageUpload = (images) => {
    setFormData({ ...formData, images });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: formData.name,
      type: formData.type,
      address: formData.address,
      description: formData.description,
      facilities: formData.facilities,
      pricing: formData.pricing,
      images: formData.images,
    };


    // formData.images.forEach((image) => {
    //   formDataToSend.append('images', image); // Append each image file
    //   console.log(formDataToSend.image,"hii")
    // });

    try {
      const response = await api.post('/listings', payload); // Send JSON payload
        // const listingId = response.data._id; // Get the ID of the created listing

        // Handle image uploads separately after listing creation
        // if (formData.images && formData.images.length > 0) {
        //     const imageFormData = new FormData();
        //     formData.images.forEach((image) => {
        //         imageFormData.append('images', image);
        //     });

        //     await api.post(`/listings/${listingId}/images`, imageFormData);
        // }

        setShowCreateForm(false);
        window.location.reload(); // Simple reload for now
    }
     catch (err) {
      console.log("this is the photot error", err);
      setError('Failed to create listing');
    }
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Manage  Listings</h2>
      <button onClick={() => setShowCreateForm(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
        Create Listing
      </button>
     <p className='inline-block'> <DeleteListing/></p>
      <p className='inline-block'><UnitList/> </p>
      <p className='inline-block'> <DeleteUnit/></p>
      {showCreateForm && (
        <form onSubmit={handleSubmit} className="mb-4">
          {/* Form fields */}
          <div className="mb-2">
            <label>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="border p-2 w-full" />
          </div>
          <div className="mb-2">
            <label>Type:</label>
            <select name="type" value={formData.type} onChange={handleInputChange} className="border p-2 w-full">
              <option value="hotel">Hotel</option>
              <option value="restaurant">Restaurant</option>
            </select>
          </div>
          <div className="mb-2">
            <label>Street:</label>
            <input type="text" name="address.street" value={formData.address.street} onChange={handleInputChange} className="border p-2 w-full" />
          </div>
          <div className="mb-2">
            <label>City:</label>
            <input type="text" name="address.city" value={formData.address.city} onChange={handleInputChange} className="border p-2 w-full" />
          </div>
          <div className="mb-2">
            <label>State:</label>
            <input type="text" name="address.state" value={formData.address.state} onChange={handleInputChange} className="border p-2 w-full" />
          </div>
          <div className="mb-2">
            <label>Zip:</label>
            <input type="text" name="address.zip" value={formData.address.zip} onChange={handleInputChange} className="border p-2 w-full" />
          </div>
          <div className="mb-2">
            <label>Description:</label>
            <textarea name="description" value={formData.description} onChange={handleInputChange} className="border p-2 w-full" />
          </div>
          <div className="mb-2">
            <label>Facilities (comma-separated):</label>
            <input type="text" value={formData.facilities.join(',')} onChange={handleFacilitiesChange} className="border p-2 w-full" />
          </div>
          <div className="mb-2">
            <label>Pricing:</label>
            <input type="number" name="pricing" value={formData.pricing} onChange={handleInputChange} className="border p-2 w-full" />
          </div>
          <div className="mb-2">
            <label>Images:</label>
            <ImageUpload onUpload={handleImageUpload} />
          </div>
          <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Create
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {listings.map((listing) => (
          <ListingCard key={listing._id} listing={listing} />
        ))}
      </div>
      
    </div>
  );
};

export default VendorListings;