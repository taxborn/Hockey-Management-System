"use client";

import React, { useEffect, useState } from "react";
import Pusher from "pusher-js";
import { randomBytes } from "crypto";

Pusher.logToConsole = true;

const pusher = new Pusher("a36faa8b9371d03f341f" || "", {
  cluster: process.env.PUSHER_CLUSTER || "us2",
});

export default function Page() {
  const [messages, setMessages] = useState([] as string[]);

  useEffect(() => {
    const channel = pusher.subscribe("chat-channel");

    channel.bind("chat", function (data: string) {
      setMessages([...messages, data]);
    });

    console.log(messages);

    return () => {
      pusher.unsubscribe("chat-channel");
    };
  }, [messages]);

  return (
    <>
      <h2>Messages</h2>
      <ul>
        {messages.map((message) => (
          <li key={randomBytes(16).join("")}>{message}</li>
        ))}
      </ul>
    </>
  );
}
