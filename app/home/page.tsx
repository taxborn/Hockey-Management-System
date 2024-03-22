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
  // This should happen at the middleware layer I think
  // We need to check if a user exists in the database 'User'. If they don't
  // we should create them.
  const isInDB: User | null = await prisma.user.findFirst({
    where: {
      clerkId: user?.id
    }
  });

  if (isInDB == null) {
    console.log("Creating");
    await prisma.user.create({
      data: {
        clerkId: user?.id || "",
        role: {
          connect: {
            id: 3
          }
        }
      }
    })
  } else {
    console.log("Already created");
  }

  // Otherwise, we know their role

  return (
    <>
      <h1 className="text-2xl font-bold">Hello, {user?.firstName}</h1>
      <p>Is the user in the DB? {isInDB != null ? 'yes' : 'no'}.</p>
    </>
  );
}
