"use client";

import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { EventContentArg } from "@fullcalendar/core/index.js";

// TODO: Type the events parameter
// TODO: Add week view (change initialView to 'dayGridWeek') and default mobile views to that
export default function Calendar({ events }: any) {
  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth" // Can be Day, Month, or Year
      editable={true}
      events={events}
      eventContent={renderEventContent}
    />
  );
}

function renderEventContent(eventInfo: EventContentArg) {
  const isHome = eventInfo.event.extendedProps["homeGame"];

  return (
    <div className={isHome ? "bg-indigo-200" : "bg-amber-200"}>
      <b className="mr-2">{eventInfo.timeText}</b>
      <p className="inline-block">{eventInfo.event.title}</p>
    </div>
  );
}
