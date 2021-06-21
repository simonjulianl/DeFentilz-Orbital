import React, { useState } from "react";
import { Box, useDisclosure } from "@chakra-ui/react";

import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar as BigCalendar, Views, momentLocalizer} from 'react-big-calendar';

import Toolbar from '~/components/Calendar/CalendarToolbar';
import ThreeDayView from "~/components/Calendar/ThreeDayView";
import BookingModal from "~/components/Calendar/BookingModal";
import { Booking, ModalState } from '~/components/Calendar/BookingType';

import moment from 'moment';
import { AuthContext } from "~/firebase/auth";

interface OwnProps {
    authContext: AuthContext,
    bookingsList : Booking[],
    facilityId: number,
    onChange: () => void
}

const localizer = momentLocalizer(moment);
const Calendar : React.FC<OwnProps> = ({ bookingsList, authContext, facilityId, onChange}) => {
  const [myBooking, setMyBooking] = useState<Booking>({
    title: null,
    startingTime: null,
    endingTime: null,
    facilityId: null,
    userEmail: null
  });
  const [state, setState] = useState<ModalState>(ModalState.None);
  const {
    isOpen: isOpen,
    onOpen: onOpen,
    onClose: onClose,
  } = useDisclosure();

  const handleSelectSlot = ({start, end}) => {
    const newBooking = {
      title: "My Booking",
      startingTime: start.toString(), 
      endingTime: end.toString(),
      userEmail: authContext.auth.email,
      facilityId: facilityId
    }
    setMyBooking(newBooking);
    setState(ModalState.Submit);
    onOpen();
  }

  const handleSelectBooking = (booking: Booking) => {
    console.log(booking.id);
    if (booking.userEmail === authContext.auth.email ) {
      setMyBooking(booking);
      setState(ModalState.Delete);
      onOpen();
    }
  }

  const eventStyleGetter = ({userEmail}: Booking) => {
    let style = {
        backgroundColor: userEmail === authContext.auth.email ? 'teal' : 'lightgray',
        color: userEmail === authContext.auth.email ? 'white' : 'black',
        display: 'block'
    };
    return {
      style: style
    }
  }

  return (
    <Box>
      <BigCalendar
        selectable
        localizer={localizer}
        events={bookingsList}
        titleAccessor={(booking: Booking) => 
                        booking.userEmail === authContext.auth.email
                        ? 'My Booking'
                        : 'Someone\'s Booking'}
        startAccessor={(booking: Booking) => new Date(booking.startingTime)}
        endAccessor={(booking: Booking) => new Date(booking.endingTime)}
        defaultView={Views.DAY}
        longPressThreshold={200}
        eventPropGetter={(eventStyleGetter)}
        style={{ height: 500, padding: 3}}
        views={{
            day: true, 
            month: true,
            threeDay: ThreeDayView
          }}
        messages={{threeDay: "3-Day"}}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectBooking}
        components={{
          toolbar: Toolbar
        }}
      />
        <BookingModal
          isOpen={isOpen}
          onClose={onClose}
          booking={myBooking}
          onChange={onChange}
          state={state}
        /> 
    </Box>
  )
}

export default Calendar;