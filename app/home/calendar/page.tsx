import React from "react";

import { PrismaClient } from "@prisma/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";
import { createClient } from "@libsql/client";

import CalendarComponent from "@/app/_components/CalendarComponent";
import { EventInput } from "@fullcalendar/core/index.js";

const libsql = createClient({
  url: process.env.TURSO_DATABASE_URL || "",
  authToken: process.env.TURSO_AUTH_TOKEN || "",
});

const adapter = new PrismaLibSQL(libsql);
const prisma = new PrismaClient({ adapter });

export default async function Page() {
  const events = await prisma.event.findMany();
  // Coerce the Prisma Event objects into FullCalendar EventInput objects
  const calendarEvents: EventInput[] = events.map((event) => {
    // If we have an end date, we know this isn't an all-day event
    if (event.end_date != null) {
      return {
        title: event.name,
        start: event.start_date,
        end: event.end_date,
        // We use the color field to denote home games
        // TODO: This is a bit of a hack, we should probably have a separate field
        extendedProps: { homeGame: event.color === "blue" },
      };
    }

    return {
      title: event.name,
      date: event.start_date,
      allDay: true,
      // We use the color field to denote home games
      // TODO: This is a bit of a hack, we should probably have a separate field
      extendedProps: { homeGame: event.color === "blue" },
    };
  });

  return (
    <>
      <h1 className="text-2xl font-bold">Team Calendar</h1>

      <CalendarComponent events={calendarEvents} />
    </>
  );
}