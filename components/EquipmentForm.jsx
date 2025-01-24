"use client";

import { useState } from "react";

export default function EquipmentForm({
  existingData = null,
  onSubmitSuccess,
}) {
  const [name, setName] = useState(existingData?.name || "");
  const [description, setDescription] = useState(
    existingData?.description || ""
  );
  const [pricePerDay, setPricePerDay] = useState(
    existingData?.price_per_day || ""
  );
  const [available, setAvailable] = useState(existingData?.available || true);

  const isEditing = !!existingData;

  async function handleSubmit(e) {
    e.preventDefault();

    const apiEndpoint = isEditing ? `/api/equipment` : `/api/equipment`;
    const method = isEditing ? "PUT" : "POST";

    const body = {
      name,
      description,
      price_per_day: parseFloat(pricePerDay),
      available,
    };

    if (isEditing) {
      body.id = existingData.id; // Include the ID for editing
    }

    const response = await fetch(apiEndpoint, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      const result = await response.json();
      alert(
        isEditing
          ? "Equipment updated successfully!"
          : "Equipment added successfully!"
      );
      onSubmitSuccess(result); // Notify parent of successful submission
    } else {
      alert("Error saving equipment.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      <h2>{isEditing ? "Edit Equipment" : "Add Equipment"}</h2>
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label htmlFor="pricePerDay">Price Per Day ($)</label>
        <input
          type="number"
          id="pricePerDay"
          value={pricePerDay}
          onChange={(e) => setPricePerDay(e.target.value)}
          required
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={available}
            onChange={(e) => setAvailable(e.target.checked)}
          />
          Available
        </label>
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-4">
        {isEditing ? "Update Equipment" : "Add Equipment"}
      </button>
    </form>
  );
}
