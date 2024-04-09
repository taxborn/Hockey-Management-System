// Purpose: Prisma client for Turso database. We utilize a Singleton pattern to ensure that we only have one instance of the Prisma client. This is important because creating a new Prisma client for each request can lead to memory leaks and performance issues. We also use the libsql adapter to connect to the Turso database. This adapter allows us to use the libsql client to connect to the Turso database. We also export the Prisma client as a default export so that we can import it in other files.
// We also check if the Prisma client is already defined in the global scope and use that instance if it is.
// This ensures that we only have one instance of the Prisma client in the entire application.

import { PrismaClient } from "@prisma/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";
import { createClient } from "@libsql/client";

export const tursoClient = createClient({
  url: process.env.TURSO_DATABASE_URL || "",
  authToken: process.env.TURSO_AUTH_TOKEN || "",
});

const adapter = new PrismaLibSQL(tursoClient);

const prismaClientSignleton = () => {
  return new PrismaClient({ adapter });
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSignleton>;
}

const prisma = globalThis.prismaGlobal || prismaClientSignleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
