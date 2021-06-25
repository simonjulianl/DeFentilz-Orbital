import React, { useEffect, useState } from "react";
import { Box, Flex, Spinner } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Error, Booking } from "~/config/interface";
import { useAuth } from "~/firebase/auth";
import APIUrl from "~/config/backendUrl";
import AdminPage from "~/components/Page/AdminPage";
import axios, { AxiosRequestConfig } from "axios";
import Calendar from "~/components/Calendar/Calendar";

const BookingAdminView: NextPage = () => {
  const router = useRouter();
  const authContext = useAuth();

  const [isLoading, setLoading] = useState<boolean>(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [error, setError] = useState<string | null>(null);

  const { id } = router.query;

  useEffect(() => {
    const todayDate = new Date().toISOString().slice(0, 10);
    const config: AxiosRequestConfig = {
      method: "GET",
      url: APIUrl.getBookingForAMonth + `/${todayDate}/${id}`,
      timeout: 5000,
    };

    setLoading(true);
    axios(config)
      .then((response) => response.data)
      .then((bookings: Booking[]) => {
        setLoading(false);
        console.log(bookings);
        setBookings(bookings);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.response.data.message);
      });
  }, []);

  const generateView = () => (
    <Flex direction="column" justify="start">
      <Calendar
        bookingsList={bookings}
        facilityId={parseInt(id as string)}
        onChange={() => {}}
      />
    </Flex>
  );

  return (
    <AdminPage title="facilitiesAdmin" description="facilitiesAdmin">
      {isLoading ? (
        <Box marginLeft="45vw" marginTop="45vh">
          <Spinner size="xl" color="black" />
        </Box>
      ) : (
        generateView()
      )}
    </AdminPage>
  );
};

export default BookingAdminView;
