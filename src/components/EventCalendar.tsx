import React, {FC} from 'react';
import Calendar from "antd/es/calendar";
import {IEvent} from "../models/IEvents";
import {Moment} from "moment";
import {formatDate} from "../utils/date";

interface EventCalendarProps {
    events: IEvent[]
}

const EventCalendar: FC<EventCalendarProps> = (props) => {

    const dateCellRender = (value: Moment) => {
        const formatedDate = formatDate(value.toDate());
        const currentDayEvents = props.events.filter(ev => ev.date === formatedDate);

        return (
            <div>
                {currentDayEvents.map((ev, index) => {
                    return <div key={index}>{ev.description}</div>
                })}
            </div>
        )
    }
    return (
        <Calendar
            dateCellRender={dateCellRender}
        />
    );
};

export default EventCalendar;