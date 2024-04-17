"use server";

import { currentUser } from "@clerk/nextjs";
import prisma from "./turso";

export async function create_chat(formData: FormData) {
  const message = formData.get("message") as string;

  const dbUser = await prisma.users.findFirst({
    where: { clerkId: (await currentUser())!.id },
  });

  await prisma.chats.create({
    data: {
      message,
      senderId: dbUser!.id,
    },
  });
}
