import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import listView from "~/components/Calendar/listView";

import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar as BigCalendar, Views, momentLocalizer} from 'react-big-calendar';
import Agenda from "react-big-calendar/lib/Agenda";
import moment from 'moment';
import { useEffect } from "react";

interface Booking {
    title: string,
    start: Date,
    end: Date,
    allDay?: boolean
    resource?: any,
}

interface OwnProps {
    bookingsList : Booking[]
}

const localizer = momentLocalizer(moment);
const Calendar : React.FC<OwnProps> = ({ bookingsList }) => {
  const [bookings, setBookings] = useState(bookingsList);
  useEffect(() => {
  }, [bookings]);

  const handleSelectSlot = ({start, end}) => {
    console.log("Selected Start: " + start + " . End: " + end);
    const newBooking : Booking = {
      title: "My Booking",
      start, 
      end
    }
    setBookings((prevState) => {
      return [
        ...prevState,
        newBooking
      ];
    });    
  }

  const handleSelectEvent = ({ title,  start, end}) => {
    console.log("Event Selected: " + title);
  }

  return (
    <Box>
      <BigCalendar
        selectable
        localizer={localizer}
        events={bookings}
        defaultView={Views.DAY}
        style={{ height: 500, padding: 3}}
        views={{
            day: true,
            week: listView,
            myweek: Agenda
          }}
        messages={{myweek: "List", week: "3-Day"}}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
      />
    </Box>
  )
}

export default Calendar;