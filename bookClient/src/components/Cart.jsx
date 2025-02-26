import React, { useState, useEffect } from "react";
import { FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Importing icons from React Icons

const ViewDetails = ({ listingId }) => {
  const [listingDetails, setListingDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // For opening the modal
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // For navigating images
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false); // For opening the booking modal
  const [bookingDetails, setBookingDetails] = useState({
    checkInDate: "",
    checkOutDate: "",
    numberOfPeople: 1,
    numberOfRooms: 1,
  });

  // Dummy data for testing purposes
  const dummyListingDetails = {
    name: "Luxury Oceanfront Villa",
    description: "A stunning oceanfront villa with panoramic views of the coastline. Perfect for a relaxing vacation.",
    price: 500,
    availability: "Available Now",
    images: [
      "https://via.placeholder.com/600x400?text=Image+1",
      "https://via.placeholder.com/600x400?text=Image+2",
      "https://via.placeholder.com/600x400?text=Image+3",
      "https://via.placeholder.com/600x400?text=Image+4",
      "https://via.placeholder.com/600x400?text=Image+5",
      "https://via.placeholder.com/600x400?text=Image+6",
      "https://via.placeholder.com/600x400?text=Image+7",
      "https://via.placeholder.com/600x400?text=Image+8",
      "https://via.placeholder.com/600x400?text=Image+9",
      "https://via.placeholder.com/600x400?text=Image+10"
    ],
    facilities: [
      "Wi-Fi",
      "Swimming Pool",
      "Air Conditioning",
      "Free Parking",
      "Gym",
      "Beachfront Access",
      "Pet Friendly"
    ]
  };

  // Simulating a data fetch (useEffect)
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setListingDetails(dummyListingDetails); // Simulate loading dummy data
      setLoading(false);
    }, 1000); // Simulate a delay of 1 second
  }, [listingId]);

  if (loading) {
    return <div className="text-center text-blue-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!listingDetails) {
    return null;
  }

  const { name, description, price, availability, images, facilities } = listingDetails;

  // Handle opening and closing modal for images
  const openModal = (index) => {
    setIsModalOpen(true);
    setCurrentImageIndex(index);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Handle image navigation
  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  // Handle opening and closing booking modal
  const openBookingModal = () => {
    setIsBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    // Simulate backend submission
    console.log("Booking Details:", bookingDetails);
    alert("Booking successfully made!");
    closeBookingModal(); // Close the booking modal after submission
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Listing Title */}
      <div className="text-center">
        <h2 className="text-3xl font-bold">{name}</h2>
      </div>

      {/* Listing Description */}
      <div className="space-y-4">
        <p className="text-lg">{description}</p>
        <div className="flex flex-wrap gap-4">
          <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full">{availability}</span>
          <span className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full">${price} / night</span>
        </div>
      </div>

      {/* Images Section */}
      <div className="space-y-4">
        <h3 className="text-2xl font-semibold">Images</h3>
        <div className="flex overflow-x-auto gap-4">
          {images.slice(0, 10).map((image, index) => (
            <div
              key={index}
              className="w-64 h-48 flex-shrink-0 cursor-pointer"
              onClick={() => openModal(index)}
            >
              <img
                src={image}
                alt={`Listing Image ${index + 1}`}
                className="w-full h-full object-cover rounded-lg shadow-md"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Facilities Section */}
      <div className="space-y-4">
        <h3 className="text-2xl font-semibold">Facilities</h3>
        <ul className="list-disc pl-5 space-y-2">
          {facilities.map((facility, index) => (
            <li key={index} className="text-lg">{facility}</li>
          ))}
        </ul>
      </div>

      {/* Booking Button */}
      <div className="text-center">
        <button
          onClick={openBookingModal}
          className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          Book Now
        </button>
      </div>

      {/* Modal for Viewing Image */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative bg-white p-6 rounded-lg">
            <button
              className="absolute top-2 right-2 text-black font-bold text-xl"
              onClick={closeModal}
            >
              <FaTimes />
            </button>
            <div className="flex justify-center items-center space-x-4">
              <button
                onClick={goToPreviousImage}
                className="text-3xl text-black hover:text-gray-500"
              >
                <FaChevronLeft />
              </button>
              <img
                src={images[currentImageIndex]}
                alt={`Modal Image ${currentImageIndex + 1}`}
                className="w-96 h-64 object-cover rounded-lg"
              />
              <button
                onClick={goToNextImage}
                className="text-3xl text-black hover:text-gray-500"
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative bg-white p-6 rounded-lg max-w-lg w-full">
            <button
              className="absolute top-2 right-2 text-black font-bold text-xl"
              onClick={closeBookingModal}
            >
              <FaTimes />
            </button>
            <h3 className="text-2xl font-semibold text-center mb-4">Make a Booking</h3>
            <form onSubmit={handleBookingSubmit}>
              <div className="mb-4">
                <label className="block text-lg font-medium">Check-In Date</label>
                <input
                  type="date"
                  value={bookingDetails.checkInDate}
                  onChange={(e) => setBookingDetails({ ...bookingDetails, checkInDate: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-lg font-medium">Check-Out Date</label>
                <input
                  type="date"
                  value={bookingDetails.checkOutDate}
                  onChange={(e) => setBookingDetails({ ...bookingDetails, checkOutDate: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-lg font-medium">Number of People</label>
                <input
                  type="number"
                  value={bookingDetails.numberOfPeople}
                  onChange={(e) => setBookingDetails({ ...bookingDetails, numberOfPeople: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  min="1"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-lg font-medium">Number of Rooms</label>
                <input
                  type="number"
                  value={bookingDetails.numberOfRooms}
                  onChange={(e) => setBookingDetails({ ...bookingDetails, numberOfRooms: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  min="1"
                  required
                />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewDetails;
