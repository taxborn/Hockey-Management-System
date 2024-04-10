"use server";

import React from "react";
import prisma from "@/lib/turso";
import MessageBox from "@/app/_components/MessageBox";
import Messages from "@/app/_components/Messages";
import { currentUser } from "@clerk/nextjs";

export default async function Page() {
  const chats = await prisma.chats.findMany({
    orderBy: { createdAt: "asc" },
    include: { sender: true },
  });

  const clerkUser = await currentUser();
  const user = await prisma.users.findFirst({
    where: { clerkId: clerkUser!.id },
  });

  return (
    <>
      <h2>Messages</h2>
      <MessageBox userId={user?.id} />
      <Messages chats={chats} />
    </>
  );
}
