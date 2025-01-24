"use client";

import { useState } from "react";

export default function BookingForm({ equipmentId, onBookingSuccess }) {
  const [customerName, setCustomerName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    // Calculate rental days and total price
    const days =
      (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24);
    const pricePerDay = 25; // Replace with actual pricePerDay from equipment
    const totalPrice = days * pricePerDay;

    const response = await fetch("/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        equipment_id: equipmentId,
        customer_name: customerName,
        start_date: startDate,
        end_date: endDate,
        total_price: totalPrice,
      }),
    });

    if (response.ok) {
      const result = await response.json();
      alert("Booking created successfully!");
      if (onBookingSuccess) {
        onBookingSuccess(result); // Notify parent only if defined
      }
    } else {
      alert("Error creating booking.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-base-100 shadow-md rounded-md"
    >
      <h2 className="text-2xl font-bold mb-4">Book Equipment</h2>
      <div className="form-control mb-4">
        <label className="label">Customer Name</label>
        <input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          required
          className="input input-bordered"
        />
      </div>
      <div className="form-control mb-4">
        <label className="label">Start Date</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
          className="input input-bordered"
        />
      </div>
      <div className="form-control mb-4">
        <label className="label">End Date</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
          className="input input-bordered"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit Booking
      </button>
    </form>
  );
}
