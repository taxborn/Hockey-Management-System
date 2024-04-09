"use server";

import { Clerk } from "@clerk/backend";
import { User } from "@prisma/client";
import UserSelection from "@/app/_components/UserSelection";
import CreateGroupModal from "@/app/_components/CreateGroupModal";
import prisma from "@/lib/turso";

const clerk = Clerk({ secretKey: process.env.CLERK_SECRET_KEY });

export default async function Page() {
  let users = await clerk.users.getUserList();

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

    // Get the role name by looking up the role ID in the database
    let role = await prisma.role.findFirst({
      where: { id: userObject.roleId },
    });

    // Then we can update the user's metadata with the role name
    // for easier access in the future
    clerk.users.updateUserMetadata(user.id, {
      publicMetadata: {
        role,
      },
    });
  }

  const count = await clerk.users.getCount();

  // We'll format the users to a more usable format, React doesn't like
  // when we send the Clerk User object directly, so we'll create a plain
  // object with the properties we need
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
      <CreateGroupModal users={plainUsers} />
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
