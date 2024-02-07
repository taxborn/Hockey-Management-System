import React from 'react';
import { useMemo } from 'react';
import moment from 'moment';
import {
    Calendar,
    Views,
    DateLocalizer,
    momentLocalizer,
    Components,
} from 'react-big-calendar';

const mLocalizer = momentLocalizer(moment);

const ColoredDateCellWrapper = ({ children }: Components<Event, object>) =>
    React.cloneElement(React.Children.only(children), {
        style: {
            backgroundColor: 'lightblue',
        },
    })

export default function Page({localizer = mLocalizer}) {
    const { components, defaultDate, max } = useMemo(() => ({
        components: {
            timeSlotWrapper: ColoredDateCellWrapper
        },
        defaultDate: new Date(),
        max: new Date()
    }), [])

    return (
        <main className="container mx-auto h-screen py-8">
            <h1 className="text-2xl font-bold">Team Calendar</h1>
            <Calendar
                components={components}
                defaultDate={defaultDate}
                events={undefined}
                localizer={localizer} 
                max={max}
                showMultiDayTimes
                step={60}
                views={undefined}
            />
        </main>
    )
}