import { currentUser } from "@clerk/nextjs";
import { User } from "@prisma/client";
import prisma from "@/lib/turso";

export default async function Home() {
  const user = await currentUser();
  let role = null;

  // We first check if the user is in our database (not Clerk's), since
  // we need to keep track of that for roles.
  // TODO: There is probably a better name for this
  const userObject: User | null = await prisma.user.findFirst({
    where: {
      clerkId: user?.id,
    },
  });

  // If the user is not in the database, we create them
  // TODO: It seems this Home() component is loaded twice,
  // because the console.log's come up twice.
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
  } else {
    // TODO: Since Prisma is an ORM, it probably has a fancy function for this
    // already
    role = await prisma.role.findFirst({
      where: {
        id: userObject.roleId,
      },
    });
  }

  return (
    <>
      <h1 className="text-2xl font-bold">Hello, {user?.firstName}</h1>
    </>
  );
}
