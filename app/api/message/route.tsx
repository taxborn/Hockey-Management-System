import { pusherServer } from "@/lib/pusher";
import prisma from "@/lib/turso";
import { NextRequest, NextResponse } from "next/server";
import { Clerk } from "@clerk/backend";

const clerk = Clerk({ secretKey: process.env.CLERK_SECRET_KEY });

export async function POST(req: NextRequest) {
  const { text, senderId } = await req.json();

  const prismaUser = await prisma.users.findFirst({ where: { id: senderId } });
  const clerkUserList = await clerk.users.getUserList();
  const clerkUser = clerkUserList.find(
    (user) => user.id === prismaUser?.clerkId,
  );
  const fullName = `${clerkUser!.firstName} ${clerkUser!.lastName}`;
  const now = new Date().toLocaleString("en-US", { timeZone: "America/Chicago" });

  pusherServer.trigger(
    process.env.NEXT_PUBLIC_PUSHER_CHAT_CHANNEL!,
    process.env.NEXT_PUBLIC_PUSHER_CHAT_EVENT!,
    [text, fullName, now],
  );

  await prisma.chats.create({ data: { message: text, senderId } });

  return NextResponse.json({ success: true });
}
