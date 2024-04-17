"use server";

import React from "react";
import prisma from "@/lib/turso";
import MessageBox from "@/app/_components/MessageBox";
import Messages from "@/app/_components/Messages";
import { currentUser } from "@clerk/nextjs";
import { Clerk } from "@clerk/backend";

const clerk = Clerk({ secretKey: process.env.CLERK_SECRET_KEY });

export default async function Page() {
  const chats = await prisma.chats.findMany({
    orderBy: { createdAt: "desc" },
    include: { sender: true },
  });

  const clerkUser = await currentUser();
  const user = await prisma.users.findFirst({
    where: { clerkId: clerkUser!.id },
  });

  const clerkUserList = await clerk.users.getUserList();
  const prismaUsers = await prisma.users.findMany({
    include: { role: true },
  });

  const users = prismaUsers.map((user) => {
    // We find the Clerk user object that corresponds to the user in our database
    const clerkUser = clerkUserList.find(
      (clerkUser) => clerkUser.id === user.clerkId,
    );

    return {
      id: user.id,
      clerkId: user.clerkId,
      role: user.role.name,
      name: `${clerkUser!.firstName} ${clerkUser?.lastName}`,
      emailAddress: clerkUser!.emailAddresses[0].emailAddress,
      lastSignIn: clerkUser!.lastSignInAt,
    };
  });

  return (
    <>
      <Messages chats={chats} users={users} />
      <MessageBox userId={user!.id} />
    </>
  );
}
