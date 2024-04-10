"use client";

import React, { useEffect, useState } from "react";
import Pusher from "pusher-js";

// Only log to console in development
Pusher.logToConsole = process.env.NODE_ENV !== "production";

const pusher = new Pusher(process.env.PUSHER_KEY || "", {
  cluster: process.env.PUSHER_CLUSTER || "",
});

export default function Page() {
  const [messages, setMessages] = useState([] as string[]);

  useEffect(() => {
    const channel = pusher.subscribe("chat-channel");

    channel.bind("chat", function (data: string) {
      setMessages([...messages, data]);
    });

    return () => {
      pusher.unsubscribe("chat-channel");
    };
  }, [messages]);

  return (
    <>
      <h2>Messages</h2>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </>
  );
}
