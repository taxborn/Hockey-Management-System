"use client";

import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EventContentArg } from '@fullcalendar/core/index.js';

const events = [
    { title: 'event 1', date: '2024-02-07', end: '2024-02-09', editable: true, startEditable: true, endEditable: true },
    { title: 'event 2', date: new Date(), editable: true  },
]

export default function Page() {
    return (
        <main className="container mx-auto h-screen py-8">
            <h1 className="text-2xl font-bold">Team Calendar</h1>

            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                editable={true}
                events={events}
                eventContent={renderEventContent}
            />
        </main>
    )
}

function renderEventContent(eventInfo: EventContentArg) {
    return (
        <>
            <b className='mr-2'>{eventInfo.timeText}</b>
            <i className='font-bold'>{eventInfo.event.title}</i>
        </>
    )
}