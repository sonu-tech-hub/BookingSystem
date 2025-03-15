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
      {loading && <div className="text-center text-blue-500">Loading...</div>}
      {error && <div className="text-center text-red-500">{error}</div>}
      <form onSubmit={handleSubmit}>
        {/* Unit Selection */}
        <div className="flex flex-wrap gap-4 justify-between items-center mb-4">
          <label htmlFor="unitId" className="w-full sm:w-1/3">Unit:</label>
          <select
            name="unitId"
            value={formData.unitId}
            onChange={handleChange}
            required
            className="w-full sm:w-2/3 p-2 border rounded-md shadow-sm"
          >
            <option value="">Select Unit</option>
            {units.map((unit) => (
              <option key={unit._id} value={unit._id}>
                {unit.type} - Capacity: {unit.capacity} - Price: ${unit.price}
              </option>
            ))}
          </select>
        </div>

        {/* Date Selection */}
        <div className="mb-4">
          <label className="block text-lg">Booking Dates: <FaCalendarAlt className="inline ml-1" /></label>
          <input
            type="date"
            onChange={handleDateChange}
            className="w-full p-2 border rounded-md shadow-sm"
          />
          <p className="mt-2">Selected Dates: {selectedDates.join(', ')}</p>
        </div>

        {/* Time Selection */}
        <div className="mb-4">
          <label htmlFor="bookingTime" className="block text-lg">Booking Time: <FaClock className="inline ml-1" /></label>
          <input
            type="datetime-local"
            name="bookingTime"
            value={formData.bookingTime}
            onChange={handleChange}
            className="w-full p-2 border rounded-md shadow-sm"
          />
        </div>

        {/* Submit and Cancel Buttons */}
        <div className="flex justify-between gap-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded w-full sm:w-auto"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={handleCancelClick}
            className="ml-2 bg-gray-300 px-4 py-2 rounded w-full sm:w-auto"
          >
            <FaTimes className="inline mr-1" /> Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
