import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function POST(req: Request) {
  const event = await req.json();
  return Response.json(event);
}
