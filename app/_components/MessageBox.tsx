"use client";

import React from "react";
import axios from "axios";

interface Props {
  userId: number;
}

export default function Page({ userId }: Props) {
  let message = "";

  const sendMessage = async (text: string) => {
    // Clear the input box
    document.querySelector("input")!.value = "";

    await axios.post("/api/message", { text, senderId: userId });
  };

  return (
    <>
      <div className="mt-2">
        <form
          className="flex"
          onSubmit={(event) => {
            event.preventDefault();
            sendMessage(message);
          }}
        >
          <input
            type="text"
            onChange={({ target }) => (message = target.value)}
            className="rounded flex-grow"
            placeholder="Type your message here..."
          />
          <button
            type="submit"
            className="bg-purple-900 text-white ml-2 rounded px-4 py-2 flex-shrink-0"
          >
            Send Message
          </button>
        </form>
      </div>
    </>
  );
}
