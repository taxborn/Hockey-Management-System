"use server";

import React from "react";
import prisma from "@/lib/turso";
import MessageBox from "@/app/_components/MessageBox";
import Messages from "@/app/_components/Messages";
import { currentUser } from "@clerk/nextjs";

export default async function Page() {
  const chats = await prisma.chats.findMany({
    orderBy: { createdAt: "desc" },
    include: { sender: true },
  });

  const clerkUser = await currentUser();
  const user = await prisma.users.findFirst({
    where: { clerkId: clerkUser!.id },
  });

  return (
    <>
      <Messages chats={chats} />
      <MessageBox userId={user!.id} />
    </>
  );
}
