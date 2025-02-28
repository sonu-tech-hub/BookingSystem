import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaClock, FaPlus, FaTimes } from 'react-icons/fa';

const BookingForm = ({ listingId, setShowBookingForm }) => {
  const [listings, setListings] = useState([]);
  const [units, setUnits] = useState([]);
  const [formData, setFormData] = useState({
    customerId: '',
    listingId: listingId,
    unitId: '',
    bookingDates: [],
    bookingTime: '',
    paymentDetails: {},
  });
  const [selectedDates, setSelectedDates] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (listingId) {
      setLoading(true);
      api
        .get(`/listings/${listingId}`)
        .then((response) => {
          setListings([response.data]);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching listing:', error);
          setError('Failed to load listing. Please try again.');
          setLoading(false);
        });

      api
        .get(`/units/${listingId}`)
        .then((response) => {
          setUnits(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching units:', error);
          setError('Failed to load units. Please try again.');
          setLoading(false);
        });
    } else {
      setUnits([]);
      setFormData({ ...formData, unitId: '' });
    }
  }, [listingId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (e) => {
    const date = e.target.value;
    if (selectedDates.includes(date)) {
      setSelectedDates(selectedDates.filter((d) => d !== date));
      setFormData({
        ...formData,
        bookingDates: formData.bookingDates.filter((d) => d !== date),
      });
    } else {
      setSelectedDates([...selectedDates, date]);
      setFormData({ ...formData, bookingDates: [...formData.bookingDates, date] });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    api
      .post('/bookings', formData)
      .then((response) => {
        console.log('Booking successful:', response.data);
        alert('Booking Successful');
        navigate('/customer-dashboard');
        setFormData({
          customerId: '',
          listingId: listingId,
          unitId: '',
          bookingDates: [],
          bookingTime: '',
          paymentDetails: {},
        });
        setSelectedDates([]);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error booking:', error);
        setError('Failed to create booking. Please try again.');
        setLoading(false);
      });
  };

  const handleCancelClick = () => {
    setShowBookingForm(false); // Update state in ListingCard
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-green-200 m-2 rounded">
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      <form onSubmit={handleSubmit}>
        {/* Form content */}
        <div className="flex flex-row justify-between items-center m-3">
          <label htmlFor="unitId">Unit:</label>
          <select name="unitId" value={formData.unitId} onChange={handleChange} required>
            <option value="">Select Unit</option>
            {units.map((unit) => (
              <option key={unit._id} value={unit._id}>
                {unit.type} - Capacity: {unit.capacity} - Price: {unit.price}
              </option>
            ))}
          </select>
        </div>

        <div className=" justify-between items-center m-2">
          <label>Booking Dates: <FaCalendarAlt className="inline ml-1" /></label>
          <input type="date" onChange={handleDateChange} />
          <p className="ml-2 mt-2">Selected Dates: {selectedDates.join(', ')}</p>
        </div>

        <div className=" justify-between items-center m-2">
          <label htmlFor="bookingTime">Booking Time: <FaClock className="inline ml-1" /></label>
          <input type="datetime-local" name="bookingTime" value={formData.bookingTime} onChange={handleChange} />
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
        <button type="button" onClick={handleCancelClick} className="ml-2 bg-gray-300 px-4 py-2 rounded">
          <FaTimes className="inline mr-1" /> Cancel
        </button>
      </form>
    </div>
  );
};

export default BookingForm;