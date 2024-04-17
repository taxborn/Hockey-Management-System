import { Clerk } from "@clerk/backend";
import UserSelection from "@/app/_components/UserSelection";
import CreateGroupModal from "@/app/_components/CreateGroupModal";
import prisma from "@/lib/turso";
import GroupList from "@/app/_components/GroupList";

const clerk = Clerk({ secretKey: process.env.CLERK_SECRET_KEY });

export default async function Page() {
  // Role ID 3 here denotes the 'player' RoleId and is the default role for all new users.
  // TODO: Revert back to 3, this allows all new users to be admins for the time being
  const PLAYER_ROLE_ID = 1;
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
      id: user.id,
      clerkId: user.clerkId,
      role: user.role.name,
      name: `${clerkUser!.firstName} ${clerkUser!.lastName}`,
      emailAddress: clerkUser!.emailAddresses[0].emailAddress,
      lastSignIn: clerkUser!.lastSignInAt,
    };
  });

  const groups = await prisma.userGroups.findMany({ include: { users: true } });

  return (
    <>
      {/* TODO: Sometimes the role updates take FOREVER, figure out a way to force a refresh */}
      <h1 className="text-2xl">User list ({count})</h1>
      <UserSelection users={users} />

      <h2 className="text-2xl">Groups</h2>
      <CreateGroupModal users={users} />

      {groups.length == 0 ? (
        <p>No groups</p>
      ) : (
        <GroupList groups={groups} users={users} />
      )}

      <h2 className="text-2xl">Permissions</h2>
    </>
  );
}
