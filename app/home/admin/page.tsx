"use server";

import { Clerk } from "@clerk/backend";
import { PrismaClient, User } from "@prisma/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";
import { createClient } from "@libsql/client";
import UserSelection from "@/app/_components/UserSelection";
import { use } from "chai";

const libsql = createClient({
  url: process.env.TURSO_DATABASE_URL || "",
  authToken: process.env.TURSO_AUTH_TOKEN || "",
});

const adapter = new PrismaLibSQL(libsql);
const prisma = new PrismaClient({ adapter });

const clerk = Clerk({ secretKey: process.env.CLERK_SECRET_KEY });

export default async function Page() {
  const users = await clerk.users.getUserList();

  // Loop over the users
  for (const user of users) {
    // We first check if the user is in our database (not Clerk's), since
    // we need to keep track of that for roles.
    // TODO: There is probably a better name for this
    const userObject: User | null = await prisma.user.findFirst({
      where: {
        clerkId: user?.id,
      },
    });

    // If the user doesn't exist, we create them
    if (userObject == null) {
      await prisma.user.create({
        data: {
          clerkId: user?.id || "",
          // Role ID 3 here denotes the 'player' RoleId.
          role: {
            connect: {
              id: 3,
            },
          },
        },
      });
    }
  }

  const count = await clerk.users.getCount();

  const plainUsers = users.map((user) => ({
    id: user.id,
    email: user.emailAddresses[0].emailAddress,
    lastSignin: user.lastSignInAt,
    phone: user.phoneNumbers,
    firstName: user.firstName,
    lastName: user.lastName,
  }));

  return (
    <>
      {/* Force refresh */}
      <p>
        Problems? <a href="">Force refresh</a>
      </p>
      <h1 className="text-2xl">User list ({count})</h1>

      <UserSelection users={plainUsers} />

      <h2 className="text-2xl">Groups</h2>
      <h2 className="text-2xl">Permissions</h2>
    </>
  );
}
