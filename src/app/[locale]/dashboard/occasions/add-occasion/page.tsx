import React from "react";
import AddOccasionForm from "./_components/add-occasion-form";

export default function page() {
  return (
    <div className="w-[69rem] ">
      <h1 className="text-2xl font-semibold mb-4">Add New Occasion</h1>
      <AddOccasionForm />
    </div>
  );
}
