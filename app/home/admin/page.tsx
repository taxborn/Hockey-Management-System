import { Clerk } from "@clerk/backend";
import { Users } from "@prisma/client";
import UserSelection from "@/app/_components/UserSelection";
import CreateGroupModal from "@/app/_components/CreateGroupModal";
import prisma from "@/lib/turso";

const clerk = Clerk({ secretKey: process.env.CLERK_SECRET_KEY });

export default async function Page() {
  // Role ID 3 here denotes the 'player' RoleId and is the default role for all new users.
  const PLAYER_ROLE_ID = 3;
  const clerkUserList = await clerk.users.getUserList();
  const count = await clerk.users.getCount();

  clerkUserList.map(async (user) => {
    // We first check if the user is in our database (not Clerk's), since
    // we need to keep track of that for roles and other data. We use the
    // upsert method to create the user if they don't exist,
    await prisma.users.upsert({
      where: {
        clerkId: user!.id,
      },
      create: {
        clerkId: user!.id,
        role: {
          connect: {
            id: PLAYER_ROLE_ID,
          },
        },
      },
      // We don't need to update anything, but we need to provide an empty object
      update: {},
    });
  });

  const prismaUsers = await prisma.users.findMany({
    include: { role: true },
  });

  const users = prismaUsers.map((user) => {
    // We find the Clerk user object that corresponds to the user in our database
    const clerkUser = clerkUserList.find(
      (clerkUser) => clerkUser.id === user.clerkId,
    );

    return {
      clerkId: user.clerkId,
      role: user.role.name,
      name: `${clerkUser!.firstName} ${clerkUser?.lastName}`,
      emailAddress: clerkUser!.emailAddresses[0].emailAddress,
      lastSignIn: clerkUser!.lastSignInAt,
    };
  });
  const groups = await prisma.userGroups.findMany();

  return (
    <>
      {/* TODO: Sometimes the role updates take FOREVER, figure out a way to force a refresh */}
      <h1 className="text-2xl">User list ({count})</h1>
      <UserSelection users={users} />

      <h2 className="text-2xl">Groups</h2>
      <CreateGroupModal users={users} />
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
