"use client";

import { useEffect, useState } from "react";
import { pusherClient } from "@/lib/pusher";
import { useAuth } from "@clerk/nextjs";

type Chat = {
  sender: {
    id: number;
    clerkId: string;
    roleId: number;
  };
  id: number;
  message: string;
  senderId: number;
  groupId: number | null;
  createdAt: Date;
};

interface Props {
  chats: Chat[];
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
      <ul className="bg-white overflow-y-scroll max-h-[60vh] sm:max-h-[75vh] flex flex-col-reverse">
        {chats.map((chat, index) => (
          <li
            key={chat.id}
            className={`py-1 ${index % 2 === 1 ? "bg-purple-50" : "bg-purple-100"}`}
          >
            (ID: {chat.senderId}) {chat.message} (
            {chat.createdAt.toLocaleTimeString()})
          </li>
        ))}
        {messages.map((message, index) => (
          <li
            key={index}
            className={`py-1 ${index % 2 === 1 ? "bg-purple-50" : "bg-purple-100"}`}
          >
            (ID: {userId}){message}
          </li>
        ))}
      </ul>
    </>
  );
}
