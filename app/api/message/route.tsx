import { pusherServer } from "@/lib/pusher";
import prisma from "@/lib/turso";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { text, senderId } = await req.json();

  pusherServer.trigger("chat-channel", "chat", { text });

  await prisma.chats.create({ data: { message: text, senderId } });

  return NextResponse.json({ message: "Message sent" }, { status: 200 });
}
