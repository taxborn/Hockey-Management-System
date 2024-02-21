"use client";

import React, { useState } from "react";
import EventModal from "../_components/EventModal";

export default function CreateButton() {
  // State of the modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    console.log(isModalOpen);
    setIsModalOpen(true);
  };

  return (
    <>
      <button
        className="px-4 py-2 bg-indigo-500 rounded text-white hover:bg-indigo-600"
        onClick={openModal}
      >
        Create event
      </button>

      {isModalOpen && (
        <EventModal onClose={() => setIsModalOpen(false)} state={isModalOpen} />
      )}
    </>
  );
}
