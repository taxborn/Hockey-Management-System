"use client";

import React from "react";
import axios from "axios";

interface Props {
  userId: number;
}

export default function Page({ userId }: Props) {
  let message = "";

  const sendMessage = async (text: string) => {
    await axios.post("/api/message", { text, senderId: userId });
  };

  return (
    <>
      <input type="text" onChange={({ target }) => (message = target.value)} onSubmit={() => sendMessage(message)} />
      <button
        onClick={() => sendMessage(message)}
        className="bg-blue-500 rounded px-4 py-2"
      >
        Send
      </button>
    </>
  );
}
