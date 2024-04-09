import React from "react";
import { currentUser } from "@clerk/nextjs";
import HockeyCalendar from "@/app/_components/HockeyCalendar";
import { EventInput } from "@fullcalendar/core/index.js";
import { Roles } from "@prisma/client";
import prisma from "@/lib/turso";

export default async function Page() {
  const user = await currentUser();
  const dbUser = await prisma.users.findFirst({
    where: { clerkId: user?.id },
  });
  const role: Roles | null = await prisma.roles.findFirst({
    where: { id: dbUser?.roleId },
  });

  // When the page loads, we fetch all events from the database
  const events = await prisma.events.findMany();
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

      <HockeyCalendar events={calendarEvents} role={role?.name || "Player"} />
    </>
  );
}
