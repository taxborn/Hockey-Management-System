"use client";

import { useEffect, useState } from "react";
import { pusherClient } from "@/lib/pusher";
import { useAuth } from "@clerk/nextjs";

interface Props {
  chats: ({ sender: { id: number; clerkId: string; roleId: number } } & {
    id: number;
    message: string;
    senderId: number;
    groupId: number | null;
    createdAt: Date;
  })[];
}

export default function Messages({ chats }: Props) {
  const { userId } = useAuth();
  const [messages, setMessages] = useState([] as string[]);

  useEffect(() => {
    pusherClient.subscribe("chat-channel");

    pusherClient.bind("chat", (text: string) => {
      setMessages([...messages, text]);
    });

    return () => {
      pusherClient.unsubscribe("chat-channel");
    };
  }, [messages]);

  return (
    <>
      <ul>
        {chats.map((chat) => (
          <li key={chat.id}>
            (ID: {chat.senderId}) {chat.message}
          </li>
        ))}
        {messages.map((message, index) => (
          <li key={index}>
            (ID: {userId}){message}
          </li>
        ))}
      </ul>
    </>
  );
}
