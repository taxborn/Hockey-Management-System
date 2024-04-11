import { pusherServer } from "@/lib/pusher";
import prisma from "@/lib/turso";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { text, senderId } = await req.json();

  pusherServer.trigger(process.env.NEXT_PUBLIC_PUSHER_CHAT_CHANNEL!, process.env.NEXT_PUBLIC_PUSHER_CHAT_EVENT!, text);

  await prisma.chats.create({ data: { message: text, senderId } });

  return NextResponse.json({ message: "Message sent" }, { status: 200 });
}
