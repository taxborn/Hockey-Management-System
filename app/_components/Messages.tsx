"use client";

import { useEffect, useState } from "react";
import { pusherClient } from "@/lib/pusher";
import { useAuth } from "@clerk/nextjs";
import { Users } from "@prisma/client";

type Chat = {
  sender: Users;
  id: number;
  message: string;
  senderId: number;
  groupId: number | null;
  createdAt: Date;
};

interface Props {
  chats: Chat[];
  users: CustomUser[];
}

export default function Messages({ chats, users }: Props) {
  const { userId } = useAuth();
  const [messages, setMessages] = useState<string[]>([]);

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
      <ul className="bg-white overflow-y-scroll max-h-[60vh] sm:max-h-[75vh] flex flex-col-reverse rounded">
        {chats.map((chat, index) => (
          <li
            key={chat.id}
            className={`py-1 px-1 ${index % 2 === 1 ? "bg-purple-50" : "bg-purple-100"}`}
          >
            <div>
              <span className="font-bold">
                {users.find((user) => user.id == chat.senderId)!.name}
              </span>{" "}
              <span className="text-xs italic text-gray-600">
                ({chat.createdAt.toLocaleTimeString()})
              </span>
            </div>
            <p>{chat.message}</p>
          </li>
        ))}
        {messages.map((message, index) => (
          <li
            key={index}
            className={`py-1 ${index % 2 === 1 ? "bg-purple-50" : "bg-purple-100"}`}
          >
            ({users.find((user) => user.clerkId == userId)!.name}){message}
          </li>
        ))}
      </ul>
    </>
  );
}
