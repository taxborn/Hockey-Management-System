'use server';

import { currentUser } from "@clerk/nextjs";
import { PrismaClient } from "@prisma/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";
import { createClient } from "@libsql/client";

const libsql = createClient({
  url: process.env.TURSO_DATABASE_URL || "",
  authToken: process.env.TURSO_AUTH_TOKEN || "",
});

const adapter = new PrismaLibSQL(libsql);
const prisma = new PrismaClient({ adapter });

export async function create_event(formData: FormData) {
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const location = formData.get('location') as string;
    const start = formData.get('start') as string;
    const end = formData.get('end') as string;

    const user = await currentUser();
    const dbUser = await prisma.user.findFirst({
        where: {clerkId: user?.id}
    }); 
    const organizerId = dbUser?.id || 1; // Default to 1 if the user isn't in the database

    const event = await prisma.event.create({
        data: {
            name: title,
            description,
            location,
            start_date: new Date(start),
            end_date: end ? new Date(end) : null,
            color: "blue",
            organizerId,
        }
    });
}