import { currentUser } from "@clerk/nextjs";
import { PrismaClient, User } from "@prisma/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";
import { createClient } from "@libsql/client";

const libsql = createClient({
  url: process.env.TURSO_DATABASE_URL || "",
  authToken: process.env.TURSO_AUTH_TOKEN || "",
});

const adapter = new PrismaLibSQL(libsql);
const prisma = new PrismaClient({ adapter });

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

    console.log("Already created");
  }

  return (
    <>
      <h1 className="text-2xl font-bold">Hello, {user?.firstName}</h1>
      <p>Is the user in the DB? {userObject != null ? "yes" : "no"}.</p>
      <p>Their role: {role?.name}</p>
    </>
  );
}
