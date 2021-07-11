import React, { useEffect, useState } from "react";
import { useAuth } from "~/firebase/auth";

import { VStack, Text, Box, Spinner, Center, Stack } from "@chakra-ui/react";

import BookingCard from "~/components/BookingCard/BookingCard";
import Page from "~/components/Page/Page";
import ProfileHeader from "~/components/Profile/ProfileHeader";

import { NextPage } from "next";
import ProfileAvatar from "~/components/Profile/ProfileAvatar";
import axios, { AxiosRequestConfig } from "axios";
import APIUrl from "~/config/backendUrl";
import { Booking } from "~/config/interface";

interface BookingWithFacility extends Booking {
  facilityName: string;
}

const BookingView: NextPage = () => {
  const authContext = useAuth();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [walletValue, setWalletValue] = useState<number>(0);
  const [myBookings, setMyBookings] = useState<BookingWithFacility[]>([]);

  useEffect(() => {
    if (authContext.auth) {
      const getUserconfig: AxiosRequestConfig = {
        method: "GET",
        url: APIUrl.getSingleUserByEmail + "/" + authContext.auth.email,
        timeout: 5000,
      };

      const getBookingConfig: AxiosRequestConfig = {
        method: "GET",
        url: APIUrl.getBookingByEmail + "/" + authContext.auth.email,
        timeout: 5000,
      };

      setLoading(true);
      axios(getUserconfig)
        .then((response) => response.data)
        .then((user) => setWalletValue(user.walletValue))
        .then(() => axios(getBookingConfig))
        .then((response) => response.data)
        .then((bookings) =>
          Promise.all<BookingWithFacility>(
            // To get facility name
            bookings.map((booking) =>
              axios({
                method: "GET",
                url: APIUrl.getSingleFacility + "/" + booking.facilityId,
                timeout: 5000,
              })
                .then((response) => response.data)
                .then((facility) => {
                  const new_booking = {
                    ...booking,
                    facilityName: facility.name,
                  };
                  return new_booking;
                })
            )
          )
        )
        // .then((bookings) => {
        //   console.log("First One: ");
        //   console.log(bookings);
        //   console.log("Second One");
        //   bookings.forEach((booking) => {
        //     console.log(booking);
        //   });
        //   return bookings;
        // })
        .then((bookings) => setMyBookings(bookings))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }
  }, []);

  return (
    <Page title="Booking" description="Booking">
      <Box paddingTop={[2, 3, 5, 10]}>
        {isLoading ? (
          <Center>
            <Spinner size="xl" />
          </Center>
        ) : authContext.auth ? (
          <Box>
            <ProfileHeader
              displayName={authContext.auth.name}
              photoUrl={authContext.auth.photoUrl}
              email={authContext.auth.email}
              walletValue={walletValue}
              showWallet={false}
              showTopUp={false}
            />
            <VStack>
              <Box>
                <Text fontWeight="bold" fontSize="xl">
                  {"My Bookings"}
                </Text>
              </Box>
              <Stack direction={{ base: "column", md: "row" }}>
                {myBookings.length > 0 ? (
                  myBookings.map((booking, id) => {
                    return <BookingCard key={id} booking={booking} />;
                  })
                ) : (
                  <Text>{"No bookings has been made"}</Text>
                )}
              </Stack>
            </VStack>
          </Box>
        ) : (
          <VStack paddingTop={[10, 50]}>
            <ProfileAvatar photoUrl={null} />
            <Text align="center">
              {"You are not logged in. Please login to see your bookings."}
            </Text>
          </VStack>
        )}
      </Box>
    </Page>
  );
};

export default BookingView;
