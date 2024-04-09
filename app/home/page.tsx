import { currentUser } from "@clerk/nextjs";
import prisma from "@/lib/turso";

export default async function Home() {
  // Role ID 3 here denotes the 'player' RoleId and is the default role for all new users.
  const PLAYER_ROLE_ID = 3;

  const user = await currentUser();

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

  return (
    <>
      <h1 className="text-2xl font-bold">Hello, {user?.firstName}</h1>
    </>
  );
}
