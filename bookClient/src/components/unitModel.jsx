import React, { useState, useEffect } from 'react';
import UnitModal from '../components/unitForm';
import api from '../utils/api';

const UnitList = () => {
  const [units, setUnits] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUnitId, setSelectedUnitId] = useState(null);

  // Fetch all units
  const fetchUnits = async () => {
    try {
      const response = await api.get('/units');
      setUnits(response.data);
    } catch (err) {
      console.error('Error fetching units:', err);
    }
  };

  useEffect(() => {
    fetchUnits();
  }, []);

  const openModal = (unitId) => {
    setSelectedUnitId(unitId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUnitId(null);
  };

  return (
    <div className="container mx-auto p-4">
    
      <button
        onClick={() => openModal(null)} // To create a new unit
        className="px-6 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 mb-4"
      >
        Create New Unit
      </button>

      <div className="space-y-4">
        {units.map((unit) => (
          <div key={unit._id} className="border p-4 mb-4 flex justify-between items-center">
            <div>
              <p><strong>Listing ID:</strong> {unit.listingId}</p>
              <p><strong>Type:</strong> {unit.type}</p>
              <p><strong>Capacity:</strong> {unit.capacity}</p>
              <p><strong>Price:</strong> {unit.price}</p>
              <p><strong>Availability:</strong> {unit.availability ? 'Available' : 'Not Available'}</p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => openModal(unit._id)} // To update an existing unit
                className="text-blue-500 hover:underline"
              >
                Update
              </button>
              <button
                onClick={() => {
                  setSelectedUnitId(unit._id);
                  openModal(unit._id);
                }}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Unit Modal */}
      <UnitModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        unitId={selectedUnitId}
        fetchUnits={fetchUnits}
      />
    </div>
  );
};

export default UnitList;
  