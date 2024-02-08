"use client";

import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { EventContentArg, EventInput } from "@fullcalendar/core/index.js";

const events: EventInput[] = [
  {
    title: "vs. Ohio State",
    date: new Date("2024-02-09 18:00:00"),
    extendedProps: { homeGame: true },
  },
  {
    title: "vs. Ohio State",
    date: new Date("2024-02-10 14:00:00"),
    extendedProps: { homeGame: true },
  },
  {
    title: "vs. Bemidji",
    date: new Date("2024-02-16 18:00:00"),
    extendedProps: { homeGame: true },
  },
  {
    title: "vs. Bemidji",
    date: new Date("2024-02-17 15:00:00"),
    extendedProps: { homeGame: true },
  },
  {
    title: "vs. St. Thomas",
    date: new Date("2024-02-23 15:00:00"),
    extendedProps: { homeGame: true },
  },
  {
    title: "at St. Thomas",
    date: new Date("2024-02-24 14:00:00"),
    extendedProps: { homeGame: false },
  },
];

export default function Page() {
  return (
    <>
      <h1 className="text-2xl font-bold">Team Calendar</h1>

      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        editable={true}
        events={events}
        eventContent={renderEventContent}
      />
    </>
  );
}

function renderEventContent(eventInfo: EventContentArg) {
  const isHome = eventInfo.event.extendedProps.homeGame;

  return (
    <div className={isHome ? "bg-indigo-200" : "bg-amber-200"}>
      <b className="mr-2">{eventInfo.timeText}</b>
      <p className="inline-block">{eventInfo.event.title}</p>
    </div>
  );
}
