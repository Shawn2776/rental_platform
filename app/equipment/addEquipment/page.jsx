import EquipmentForm from "@/components/EquipmentForm";
import React from "react";

const AddEquipmentPage = () => {
  function handleSuccess(newEquipment) {
    console.log("New Equipment Added:", newEquipment);
    // Redirect or refresh the equipment list
  }

  return <EquipmentForm onSubmitSuccess={handleSuccess} />;
};

export default AddEquipmentPage;
