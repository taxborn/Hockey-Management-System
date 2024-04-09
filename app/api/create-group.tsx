"use server";

import { PrismaClient } from "@prisma/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";
import { createClient } from "@libsql/client";

const libsql = createClient({
  url: process.env.TURSO_DATABASE_URL || "",
  authToken: process.env.TURSO_AUTH_TOKEN || "",
});

const adapter = new PrismaLibSQL(libsql);
const prisma = new PrismaClient({ adapter });

export async function create_group(formData: FormData) {
  const name = formData.get("name") as string;
  // We now have a list of IDs
  const users = formData.getAll("users") as string[];

  const group = await prisma.group.create({
    data: {
      name,
      users: {
        // Our list of users is an array of clerk IDs, so we need to connect
        // them to the group by using the clerkId field
        connect: users.map((userId) => ({ clerkId: userId })),
      },
    },
  });
}
