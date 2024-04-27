"use client";

import { useEffect, useState } from "react";
import { pusherClient } from "@/lib/pusher";
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
  const [messages, setMessages] = useState<[string, string, string][]>([]);

  useEffect(() => {
    pusherClient.subscribe(process.env.NEXT_PUBLIC_PUSHER_CHAT_CHANNEL!);

    pusherClient.bind(
      process.env.NEXT_PUBLIC_PUSHER_CHAT_EVENT!,
      (message: [string, string, string]) => {
        const [text, name, time] = message;
        setMessages([...messages, [text, name, time]]);
      },
    );

    return () => {
      pusherClient.unsubscribe(process.env.NEXT_PUBLIC_PUSHER_CHAT_CHANNEL!);
    };
  }, [messages]);

  return (
    <>
      <ul className="bg-white  overflow-y-scroll max-h-[60vh] sm:max-h-[75vh] flex flex-col-reverse rounded">
        {messages.map((message, index) => (
          <li
            // We need to add the length of the chats array to the key to avoid conflicts
            // between the messages from the database and the messages from Pusher.
            // This is probably not the best solution.
            key={chats.length + index}
            className={`p-1 odd:bg-purple-50 even:bg-purple-100`}
          >
            <div>
              <span className="font-bold">{message[1]}</span>{" "}
              <span className="text-xs italic text-gray-600">
                ({message[2]}) (#{chats.length + index + 1})
              </span>
            </div>
            <p>{message[0]}</p>
          </li>
        ))}

        {chats.map((chat) => (
          <li
            key={chat.id}
            className={`p-1 odd:bg-purple-50 even:bg-purple-100`}
          >
            <div>
              <span className="font-bold">
                {users.find((user) => user.id == chat.senderId)!.name}
              </span>{" "}
              <span className="text-xs italic text-gray-600">
                ({chat.createdAt.toLocaleTimeString()}) (#{chat.id})
              </span>
            </div>
            <p>{chat.message}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
