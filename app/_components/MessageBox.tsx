"use client";

import React from "react";
import axios from "axios";

interface Props {
  userId: number;
}

export default function Page({ userId }: Props) {
  let message = "";

  const sendMessage = async (text: string) =>{
    // Clear the input box
    const input = document.querySelector("input");
    input!.value = "";

    await axios.post("/api/message", { text, senderId: userId });
  }

  return (
    <>
      <div className="mt-2 flex">
        <input
          type="text"
          onChange={({ target }) => (message = target.value)}
          onSubmit={() => sendMessage(message)}
          className="rounded flex-grow"
          placeholder="Type your message here..."
        />
        <button
          onClick={() => sendMessage(message)}
          className="bg-purple-900 text-white ml-2 rounded px-4 py-2 flex-shrink-0"
        >
          Send Message
        </button>
      </div>
    </>
  );
}
