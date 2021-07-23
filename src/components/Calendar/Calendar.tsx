import React, { useState } from "react";
import { Box, useBreakpointValue, useDisclosure } from "@chakra-ui/react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  Calendar as BigCalendar,
  Views,
  momentLocalizer,
} from "react-big-calendar";
import Toolbar from "~/components/Calendar/CalendarToolbar";
import ThreeDayView from "~/components/Calendar/ThreeDayView";
import BookingModal from "~/components/Calendar/BookingModal";
import { ModalState } from "~/components/Calendar/BookingType";
import { Booking } from "~/config/interface";
import moment from "moment";
import { useAuth } from "~/firebase/auth";
import APIUrl from "~/config/backendUrl";
import axios from "axios";
import DeleteConfirmationModal from "../DeleteConfirmationModal";

interface OwnProps {
  bookingsList: Booking[];
  facilityId: number;
  onChange: () => void;
}

const localizer = momentLocalizer(moment);
const Calendar: React.FC<OwnProps> = ({
  bookingsList,
  facilityId,
  onChange,
}) => {
  const authContext = useAuth();

  const [myBooking, setMyBooking] = useState<Booking>(null);
  const [error, setError] = useState<string>(null);
  const [state, setState] = useState<ModalState>(ModalState.None);
  const { isOpen: isOpen, onOpen: onOpen, onClose: onClose } = useDisclosure();
  const {
    isOpen: isOpenError,
    onOpen: onOpenError,
    onClose: onCloseError,
  } = useDisclosure();

  const handleSelectSlot = ({ start, end }) => {
    const newBooking: Booking = {
      id: null,
      startingTime: start,
      endingTime: end,
      userEmail: authContext.auth.email,
      facilityId: facilityId,
    };
    setMyBooking(newBooking);
    setState(ModalState.Submit);
    onOpen();
  };

  const handleSelectBooking = (booking: Booking) => {
    if (
      booking.userEmail === authContext.auth.email ||
      authContext.auth.user.isAdmin
    ) {
      setMyBooking(booking);
      setState(ModalState.Delete);
      onOpen();
    }
  };

  const handleSubmit = (booking: Booking) => {
    axios({
      method: "POST",
      url: APIUrl.createBooking,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(booking),
    })
      .then((response) => {
        setError(
          `Booking Created from ${response.data.startingTime} to ${response.data.endingTime} `
        );
        onOpenError();
      })
      .catch((err) => {
        setError(err.response.data.message);
        onOpenError();
      });
  };

  const handleDelete = (booking: Booking) => {
    axios({
      method: "DELETE",
      url: APIUrl.deleteSingleBooking + `/${booking.id}`,
    })
      .then((_) => {
        setError(
          `Booking from ${booking.startingTime} to ${booking.endingTime} deleted`
        );
        onOpenError();
      })
      .catch((err) => {
        setError(err.response.data.message);
        onOpenError();
      });
  };

  const eventStyleGetter = ({ userEmail }: Booking) => {
    const style = {
      backgroundColor:
        authContext.auth && userEmail === authContext.auth.email
          ? "teal"
          : "lightgray",
      color:
        authContext.auth && userEmail === authContext.auth.email
          ? "white"
          : "black",
      display: "block",
    };
    return {
      style: style,
    };
  };

  const mode = useBreakpointValue({
    base: "mobile",
    md: "desktop",
  });

  return (
    <Box aria-label="Booking Calendar">
      <BigCalendar
        selectable
        localizer={localizer}
        events={bookingsList.map((booking) => {
          return {
            // Change this to Moment
            startingTime: moment(booking.startingTime).toDate(),
            endingTime: moment(booking.startingTime).toDate(),
            title:
              !authContext.auth || authContext.auth.user.isAdmin
                ? "Booking"
                : booking.userEmail === authContext.auth.email
                ? "My Booking"
                : "Someone's Booking",
            userEmail: booking.userEmail,
            facilityId: booking.facilityId,
            id: booking.id,
          };
        })}
        startAccessor={(booking: Booking) => booking.startingTime}
        endAccessor={(booking: Booking) => booking.endingTime}
        defaultView={mode === "mobile" ? Views.DAY : Views.DAY}
        longPressThreshold={200}
        eventPropGetter={eventStyleGetter}
        style={{ height: "80vh", padding: 3 }}
        views={
          mode === "mobile"
            ? {
                day: true,
                month: true,
                threeDay: ThreeDayView,
              }
            : {
                day: true,
                week: true,
                month: true,
                threeDay: ThreeDayView,
              }
        }
        messages={{ threeDay: "3-Day" }}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectBooking}
        components={{
          toolbar: Toolbar,
        }}
      />
      <BookingModal
        isOpen={isOpen}
        onClose={onClose}
        booking={myBooking}
        onSubmit={handleSubmit}
        onDelete={handleDelete}
        state={state}
      />
      <DeleteConfirmationModal
        message={error}
        onDelete={() => {
          onCloseError();
          onChange();
        }}
        isOpen={isOpenError}
        onClose={() => {
          onCloseError();
          onChange();
        }}
      />
    </Box>
  );
};

export default Calendar;
