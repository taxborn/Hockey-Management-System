"use server";

import prisma from "./turso";

export async function create_group(formData: FormData) {
  const name = formData.get("name") as string;
  // We now have a list of IDs
  const users = formData.getAll("users") as string[];

  const group = await prisma.userGroups.create({
    data: {
      name,
      users: {
        // Our list of users is an array of clerk IDs, so we need to connect
        // them to the group by using the clerkId field
        connect: users.map((userId) => ({ clerkId: userId })),
      },
    },
  });

  return group;
}
