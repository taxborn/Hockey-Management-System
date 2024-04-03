import { Clerk } from "@clerk/backend";
import { PrismaClient, User } from "@prisma/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";
import { createClient } from "@libsql/client";

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

  return (
    <>
      <h1 className="text-2xl">Admin</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.firstName} {user.lastName} <i>({user.id})</i>
          </li>
        ))}
      </ul>
      <h2 className="text-2xl">Groups</h2>
    </>
  );
}
