import React, { useEffect, useState } from "react";
import { Box, Flex, Spinner } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import axios, { AxiosRequestConfig } from "axios";
import AdminPage from "~/components/Page/AdminPage";
import { Error, Booking } from "~/config/interface";
import { useAuth } from "~/firebase/auth";
import APIUrl from "~/config/backendUrl";

const BookingAdminView: NextPage = () => {
  const router = useRouter();
  const authContext = useAuth();

  const [isLoading, setLoading] = useState<boolean>(true);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {}, []);

  const generateView = () => (
    <Flex direction="column" justify="start">
      test
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
