"use client";

import { useState, useEffect } from "react";

export default function EquipmentForm({
  existingData = null,
  onSubmitSuccess,
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [pricePerDay, setPricePerDay] = useState("");
  const [available, setAvailable] = useState(true);

  // Update form state when existingData changes
  useEffect(() => {
    if (existingData) {
      setName(existingData.name || "");
      setDescription(existingData.description || "");
      setPricePerDay(existingData.price_per_day || "");
      setAvailable(existingData.available || false);
    }
  }, [existingData]);

  async function handleSubmit(e) {
    e.preventDefault();

    const apiEndpoint = existingData ? `/api/equipment` : `/api/equipment`;
    const method = existingData ? "PUT" : "POST";

    const body = {
      name,
      description,
      price_per_day: parseFloat(pricePerDay),
      available,
    };

    if (existingData) {
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
        existingData
          ? "Equipment updated successfully!"
          : "Equipment added successfully!"
      );
      onSubmitSuccess(result);
      if (!existingData) {
        // Reset form fields after adding
        setName("");
        setDescription("");
        setPricePerDay("");
        setAvailable(true);
      }
    } else {
      alert("Error saving equipment.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-base-100 shadow-md rounded-md"
    >
      <h2 className="text-2xl font-bold mb-4">
        {existingData ? "Edit Equipment" : "Add Equipment"}
      </h2>
      <div className="form-control mb-4">
        <label htmlFor="name" className="label">
          <span className="label-text">Name</span>
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="input input-bordered w-full"
        />
      </div>
      <div className="form-control mb-4">
        <label htmlFor="description" className="label">
          <span className="label-text">Description</span>
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="textarea textarea-bordered w-full"
        />
      </div>
      <div className="form-control mb-4">
        <label htmlFor="pricePerDay" className="label">
          <span className="label-text">Price Per Day ($)</span>
        </label>
        <input
          type="number"
          id="pricePerDay"
          value={pricePerDay}
          onChange={(e) => setPricePerDay(e.target.value)}
          step="any" // Allows decimal numbers
          required
          className="input input-bordered w-full"
        />
      </div>
      <div className="form-control mb-6">
        <label className="label cursor-pointer">
          <span className="label-text">Available</span>
          <input
            type="checkbox"
            checked={available}
            onChange={(e) => setAvailable(e.target.checked)}
            className="checkbox checkbox-primary"
          />
        </label>
      </div>
      <div className="form-control">
        <button type="submit" className="btn btn-primary">
          {existingData ? "Update Equipment" : "Add Equipment"}
        </button>
      </div>
    </form>
  );
}
