import React, { useEffect, useState } from "react";
import { useAuth } from "~/firebase/auth";

import { VStack, Text, Box, Spinner, Center, Stack, Flex } from "@chakra-ui/react";

import BookingCard from "~/components/BookingCard/BookingCard";
import Page from "~/components/Page/Page";
import ProfileHeader from "~/components/Profile/ProfileHeader";

import { NextPage } from "next";
import ProfileAvatar from "~/components/Profile/ProfileAvatar";
import axios, { AxiosRequestConfig } from "axios";
import APIUrl from "~/config/backendUrl";
import { Booking, User } from "~/config/interface";

interface BookingWithFacility extends Booking {
  facilityName: string;
}

const BookingView: NextPage = () => {
  const authContext = useAuth();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [displayName, setDisplayName] = useState<string>(undefined);
  const [photoUrl, setPhotoUrl] = useState<string>(undefined);
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
        .then((user: User) => {
          setDisplayName(user.name);
          setPhotoUrl(user.profilePictureUrl);
          setWalletValue(user.walletValue);
        })
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
              displayName={displayName ? displayName : authContext.auth.name}
              photoUrl={photoUrl ? photoUrl : authContext.auth.photoUrl}
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
              {/* <Stack direction={{ base: "column", md: "row" }}> */}
              <Flex
                direction={["column", "column", "row"]}
                maxW={"100vw"}
                wrap="wrap"
              >
                {myBookings.length > 0 ? (
                  myBookings.map((booking, id) => {
                    return (
                    <Box key={id} ml={[0, 0, 3]} mb={[0, 3, 5]}>
                      <BookingCard key={id} booking={booking} />
                    </Box>);
                  })
                ) : (
                  <Text>{"No bookings has been made"}</Text>
                )}
              </Flex>
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
