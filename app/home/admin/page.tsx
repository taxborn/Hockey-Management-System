"use server";

import { Clerk } from "@clerk/backend";
import { PrismaClient, User } from "@prisma/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";
import { createClient } from "@libsql/client";
import UserSelection from "@/app/_components/UserSelection";
import GroupModal from "@/app/_components/GroupModal";

const libsql = createClient({
  url: process.env.TURSO_DATABASE_URL || "",
  authToken: process.env.TURSO_AUTH_TOKEN || "",
});

const adapter = new PrismaLibSQL(libsql);
const prisma = new PrismaClient({ adapter });

const clerk = Clerk({ secretKey: process.env.CLERK_SECRET_KEY });

export default async function Page() {
  let users = await clerk.users.getUserList();

  // Loop over the users
  for (let user of users) {
    // We first check if the user is in our database (not Clerk's), since
    // we need to keep track of that for roles.
    // TODO: There is probably a better name for this
    let userObject: User | null = await prisma.user.findFirst({
      where: {
        clerkId: user?.id,
      },
    });

    // If the user doesn't exist, we create them
    if (userObject == null) {
      userObject = await prisma.user.create({
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

    // Get the role name
    let role = await prisma.role.findFirst({
      where: { id: userObject.roleId },
    });

    clerk.users.updateUserMetadata(user.id, {
      publicMetadata: {
        role,
      },
    });
  }

  const count = await clerk.users.getCount();

  const plainUsers = users.map((user) => ({
    id: user.id,
    email: user.emailAddresses[0].emailAddress,
    lastSignin: user.lastSignInAt,
    phone: user.phoneNumbers,
    firstName: user.firstName,
    lastName: user.lastName,
    public: user.publicMetadata,
  }));

  const groups = await prisma.group.findMany();

  return (
    <>
      {/* Force refresh */}
      <p>
        Problems? <a href="">Force refresh</a>
      </p>
      <h1 className="text-2xl">User list ({count})</h1>

      <UserSelection users={plainUsers} />

      <h2 className="text-2xl">Groups</h2>
      <GroupModal users={plainUsers} />
      {/* List all of the groups */}
      <ul>
        {groups.length == 0 && <p>No groups</p>}

        {/* TODO: Create a table and list all users within group */}
        {groups.map((group) => (
          <li key={group.id}>{group.name} ()</li>
        ))}
      </ul>

      <h2 className="text-2xl">Permissions</h2>
    </>
  );
}
