import React from "react";
import { currentUser } from "@clerk/nextjs";

import CalendarComponent from "@/app/_components/CalendarComponent";
import { EventInput } from "@fullcalendar/core/index.js";

import { PrismaClient, Role } from "@prisma/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";
import { createClient } from "@libsql/client";

const libsql = createClient({
  url: process.env.TURSO_DATABASE_URL || "",
  authToken: process.env.TURSO_AUTH_TOKEN || "",
});

const adapter = new PrismaLibSQL(libsql);
const prisma = new PrismaClient({ adapter });

export default async function Page() {
  const user = await currentUser();
  const dbUser = await prisma.user.findFirst({
    where: { clerkId: user?.id },
  });
  const role: Role | null = await prisma.role.findFirst({
    where: { id: dbUser?.roleId },
  });

  // When the page loads, we fetch all events from the database
  const events = await prisma.event.findMany();
  // Coerce the Prisma Event objects into FullCalendar EventInput objects
  const calendarEvents: EventInput[] = events.map((event) => {
    // If we have an end date, we know this isn't an all-day event
    if (event.end_date != null) {
      return {
        title: event.name,
        start: event.start_date,
        end: event.end_date,
        extendedProps: { color: event.color },
      };
    }

    // Otherwise, this is a single-day event
    return {
      title: event.name,
      date: event.start_date,
      allDay: true,
      extendedProps: { color: event.color },
    };
  });

  return (
    <>
      <h1 className="text-2xl font-bold">Team Calendar</h1>

      <CalendarComponent
        events={calendarEvents}
        role={role?.name || "Player"}
      />
    </>
  );
}
