import React, { useState } from "react";
import { Box } from "@chakra-ui/react";

import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar as BigCalendar, Views, momentLocalizer} from 'react-big-calendar';

import Toolbar from '~/components/Calendar/CalendarToolbar';
import ThreeDayView from "~/components/Calendar/ThreeDayView";

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

  const handleSelectEvent = (event) => {
    const r = window.confirm("Would you like to remove this event?")
    if(r === true){

      setBookings((prevState) => {
        const bookings = [...prevState]
        const idx = bookings.indexOf(event);
        bookings.splice(idx, 1); // Keep immutable
        return bookings;
      })
    }
  }

  return (
    <Box>
      <BigCalendar
        selectable
        localizer={localizer}
        events={bookings}
        defaultView={Views.DAY}
        longPressThreshold={200}
        style={{ height: 500, padding: 3}}
        views={{
            day: true, 
            month: true,
            threeDay: ThreeDayView
          }}
        messages={{threeDay: "3-Day"}}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        components={{
          toolbar: Toolbar
        }}
      />
    </Box>
  )
}

export default Calendar;