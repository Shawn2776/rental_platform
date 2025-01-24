"use client";

import BookingForm from "@/components/BookingForm";
import EquipmentForm from "@/components/EquipmentForm";
import { useEffect, useState } from "react";

export default function EquipmentPage() {
  const [equipment, setEquipment] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [selectedEquipment, setSelectedEquipment] = useState(null); // Add this state

  useEffect(() => {
    async function fetchEquipment() {
      const response = await fetch(`/api/equipment?business_id=1`);
      const data = await response.json();
      setEquipment(data);
    }
    fetchEquipment();
  }, []);

  return (
    <div>
      {/* Equipment List */}
      <h1 className="text-xl font-bold mb-4">Equipment List</h1>
      {equipment.length === 0 ? (
        <p>No equipment found.</p>
      ) : (
        <table className="table-auto border-collapse border border-gray-400 w-full">
          <thead>
            <tr>
              <th className="border border-gray-400 px-4 py-2">ID</th>
              <th className="border border-gray-400 px-4 py-2">Name</th>
              <th className="border border-gray-400 px-4 py-2">Description</th>
              <th className="border border-gray-400 px-4 py-2">
                Price Per Day ($)
              </th>
              <th className="border border-gray-400 px-4 py-2">Available</th>
              <th className="border border-gray-400 px-4 py-2">Created At</th>
              <th className="border border-gray-400 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {equipment.map((item) => (
              <tr key={item.id}>
                <td className="border border-gray-400 px-4 py-2">{item.id}</td>
                <td className="border border-gray-400 px-4 py-2">
                  {item.name}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {item.description}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  ${item.price_per_day}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {item.available ? "Yes" : "No"}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {new Date(item.created_at).toLocaleString()}
                </td>
                <td className="border border-gray-400 px-4 py-2 space-y-2">
                  <button
                    onClick={() => setEditingItem(item)}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setSelectedEquipment(item)} // Set the selected equipment for booking
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    Book
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="flex w-full space-x-4 mt-8">
        {/* Equipment Form */}
        <div className="border w-full p-2 rounded-md">
          <h2 className="mt-8 text-lg font-bold pb-4">
            {editingItem ? "Edit Equipment" : "Add New Equipment"}
          </h2>
          <EquipmentForm
            existingData={editingItem}
            onSubmitSuccess={(updatedItem) => {
              if (editingItem) {
                // Update the existing item
                setEquipment((prev) =>
                  prev.map((item) =>
                    item.id === updatedItem.id ? updatedItem : item
                  )
                );
                setEditingItem(null); // Reset editing state
              } else {
                // Add a new item
                setEquipment((prev) => [...prev, updatedItem]);
              }
            }}
          />
        </div>

        {/* Booking Form */}
        <div className="border w-full p-2 rounded-md">
          {selectedEquipment ? (
            <BookingForm
              equipmentId={selectedEquipment.id}
              onBookingSuccess={(newBooking) => {
                alert(
                  `Booking created for ${selectedEquipment.name}! Booking ID: ${newBooking.id}`
                );
                setSelectedEquipment(null); // Reset selected equipment after successful booking
              }}
            />
          ) : (
            <p className="text-gray-500">Please select equipment to book.</p>
          )}
        </div>
      </div>
    </div>
  );
}
