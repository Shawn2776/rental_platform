// app/equipment/page.js
"use client";

import { useState, useEffect } from "react";

async function handleSubmit(e) {
  e.preventDefault();
  const response = await fetch("/api/equipment", {
    method: "POST",
    body: JSON.stringify({
      business_id: 1, // Replace with actual business ID
      name: "New Equipment",
      description: "Description here",
      price_per_day: 25.0,
      available: true,
    }),
  });
  const result = await response.json();
  console.log(result);
}

export default function EquipmentPage() {
  const [equipment, setEquipment] = useState([]);

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
      <h1>Equipment List</h1>
      <ul>
        {equipment.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price_per_day}/day -{" "}
            {item.available ? "Available" : "Not Available"}
          </li>
        ))}
      </ul>
    </div>
  );
}
