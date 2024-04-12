"use client";

import { Modal } from "flowbite";
import { useRouter } from "next/navigation";
import React from "react";
import { create_event as create_calendar_event } from "@/lib/create-event";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import {
  EventClickArg,
  EventContentArg,
  EventInput,
} from "@fullcalendar/core/index.js";
import CreateEventModal from "./CreateEventModal";
import { UserGroups } from "@prisma/client";

interface Props {
  events: EventInput[];
  role: String;
  groups: UserGroups[];
}

export default function HockeyCalendar({ events, role, groups }: Props) {
  const router = useRouter();

  // TODO: Check for date creation permissions
  // The function that handles when a user clicks on a certain date on the calendar.
  // This should show a modal that allows the user to create an event for that date.
  const handleDateClick = (arg: DateClickArg) => {
    // Construct the modal
    const modalEl = document.querySelector(
      "#authentication-modal",
    ) as HTMLElement;
    const modal = new Modal(modalEl);
    // Get the close button and the submit button
    const closeEl = document.querySelector(
      '[data-modal-hide="authentication-modal"]',
    ) as HTMLElement;
    const submitButton = document.querySelector(
      '[type="submit"]',
    ) as HTMLElement;

    // Set the date of the event to the date the user clicked on
    const dateElement = document.querySelector("#start") as HTMLInputElement;
    dateElement.value = arg.dateStr;

    modal.show();

    // Add event listeners to the close and submit buttons
    closeEl?.addEventListener("click", () => modal.hide());
    submitButton?.addEventListener("click", (clickEvent) => {
      // If the form is not valid, don't do anything
      if (!modalEl?.querySelector("form")?.checkValidity()) return;

      // Prevent the form from submitting, we'll handle it ourselves
      clickEvent.preventDefault();

      const formData = new FormData(
        modalEl!.querySelector("form") as HTMLFormElement,
      );
      // TODO: Instead of refreshing the page, we should add the event to the calendar
      // and close the modal
      const event = create_calendar_event(formData);

      router.push("/home/calendar");

      modal.hide();
    });
  };

  // TODO: When a user clicks an event, we should show a modal with more information
  // about the event, and allow them to edit it
  const handleEventClick = (arg: EventClickArg) => {
    console.log(arg);
  };

  return (
    <>
      {/* Only render if the user is not a player role */}
      {role != "Player" ? <CreateEventModal groups={groups} /> : null}

      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        editable={true}
        events={events}
        eventContent={renderEventContent}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        eventOrderStrict={true}
      />
    </>
  );
}

function renderEventContent(eventInfo: EventContentArg) {
  const colorMap: { [key: string]: string } = {
    blue: "bg-blue-200 border border-blue-500",
    red: "bg-red-200 border border-red-500",
    green: "bg-green-200 border border-green-500",
    purple: "bg-purple-300 border border-purple-800",
    yellow: "bg-amber-200 border border-amber-500",
  };
  // Get the color of the event
  const color = eventInfo.event.extendedProps.color;
  // Get the color classes for the event, or default to gray
  const colorClass = colorMap[color] || "bg-gray-200";

  return (
    <div className={colorClass}>
      <b className="mr-2 text-black">{eventInfo.timeText}</b>
      <p className="inline-block text-black">{eventInfo.event.title}</p>
    </div>
  );
}
