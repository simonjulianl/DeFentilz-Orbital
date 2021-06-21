import React, { useState } from "react";
import { Box, useDisclosure } from "@chakra-ui/react";

import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar as BigCalendar, Views, momentLocalizer} from 'react-big-calendar';

import Toolbar from '~/components/Calendar/CalendarToolbar';
import ThreeDayView from "~/components/Calendar/ThreeDayView";
import BookingModal from "~/components/Calendar/BookingModal";
import { ModalState } from '~/components/Calendar/BookingType';

import { Booking } from '~/config/interface';

import moment from 'moment';
import { AuthContext, useAuth } from "~/firebase/auth";

interface OwnProps {
    bookingsList : Booking[],
    facilityId: number,
    onChange: () => void
}

interface MyBooking extends Booking {
  title? : string
}

const localizer = momentLocalizer(moment);
const Calendar : React.FC<OwnProps> = ({ bookingsList, facilityId, onChange}) => {
  const authContext = useAuth();

  const [myBooking, setMyBooking] = useState<MyBooking>({
    title: null,
    id: null,
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
    const newBooking : MyBooking = {
      title: "My Booking",
      id: null,
      startingTime: start, 
      endingTime: end,
      userEmail: authContext.auth.email,
      facilityId: facilityId
    }
    setMyBooking(newBooking);
    setState(ModalState.Submit);
    onOpen();
  }

  const handleSelectBooking = (booking: Booking) => {
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
        events={bookingsList.map(booking => {
          return {
            startingTime: new Date(booking.startingTime),
            endingTime: new Date(booking.endingTime),
            title: booking.userEmail === authContext.auth.email
                        ? 'My Booking'
                        : 'Someone\'s Booking',
            userEmail: booking.userEmail,
            facilityId: booking.facilityId,
            id: booking.id
          }
        })}
        startAccessor={(booking: Booking) => (booking.startingTime)}
        endAccessor={(booking: Booking) => (booking.endingTime)}
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

  
    // <BigCalendar
    //   selectable
    //   localizer={localizer}
    //   events={bookingsList.map(x =>{
    //     return {
    //       end: new Date('June 21, 2021 20:00:00'),
    //       start: new Date('June 21, 2021 21:00:00'),
    //       title: "Testing"
    //     }
    //   })}
    //   titleAccessor={"title"}
    //   startAccessor={"start"}
    //   endAccessor={"end"}
    //   defaultView={Views.DAY}
    //   longPressThreshold={200}
    //   eventPropGetter={(eventStyleGetter)}
    //   style={{ height: 500, padding: 3}}
    //   views={{
    //     day: true, 
    //     month: true,
    //     threeDay: ThreeDayView
    //   }}
    //   messages={{threeDay: "3-Day"}}
    //   components={{
    //     toolbar: Toolbar
    //   }}
    // />
  )
}

export default Calendar;