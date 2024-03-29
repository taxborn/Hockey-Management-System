"use client";

import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { EventContentArg, EventInput } from "@fullcalendar/core/index.js";

interface Props {
  events: EventInput[];
}


export default function CalendarComponent({ events }: Props) {
  return (
    <>
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
  const isHome = eventInfo.event.extendedProps["homeGame"];

  return (
    <div className={isHome ? "bg-indigo-200" : "bg-amber-200"}>
      <b className="mr-2">{eventInfo.timeText}</b>
      <p className="inline-block">{eventInfo.event.title}</p>
    </div>
  );
}