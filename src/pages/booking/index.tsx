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
import moment from "moment";

interface BookingWithFacility extends Booking {
  facilityName: string;
}

const BookingView: NextPage = () => {
  const authContext = useAuth();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [displayName, setDisplayName] = useState<string>(undefined);
  const [photoUrl, setPhotoUrl] = useState<string>(undefined);
  const [walletValue, setWalletValue] = useState<number>(0);
  const [pastBookings, setPastBookings] = useState<BookingWithFacility[]>([]);
  const [futureBookings, setFutureBookings] = useState<BookingWithFacility[]>([]);

  useEffect(() => {
    if (authContext.auth) {
      const getUserConfig: AxiosRequestConfig = {
        method: "GET",
        url: APIUrl.getSingleUserByEmail + "/" + authContext.auth.email,
        timeout: 5000,
      };

      const getBookingConfig: AxiosRequestConfig = {
        method: "GET",
        url: APIUrl.getBookingByEmail + "/" + authContext.auth.email,
        timeout: 5000,
      };

      const getAllFacilities: AxiosRequestConfig = {
        method: "GET", 
        url: APIUrl.getAllFacilities,
        timeout: 5000
      };

      setLoading(true);
      Promise.all([
        axios(getUserConfig)
        .then(response => response.data)
        .then((user: User) => {
          setDisplayName(user.name);
          setPhotoUrl(user.profilePictureUrl);
          setWalletValue(user.walletValue);
        })
        ,
        axios(getAllFacilities)
        .then(response => response.data)
        , 
        axios(getBookingConfig)
        .then((response) => response.data)
      ])
        .then(values => {
          return values[2].map((booking: Booking) => {
            const newBooking = {
              ...booking,
              facilityName: values[1].filter(facility => facility.id === booking.facilityId)[0].name
            }
            return newBooking;
          })
        })
      .then((bookings : BookingWithFacility[]) => {
        let past: BookingWithFacility[] = [];
        let future: BookingWithFacility[] = [];
        const currTime = moment();

        for (let i = 0; i < bookings.length; i++) {
          if ( currTime.diff(moment(bookings[i].endingTime)) > 0 ){
            past.push(bookings[i]);
          } else {
            future.push(bookings[i]);
          }
        }

        const sortingFn = (a,b) => (a.startingTime > b.startingTime) ? 1 : ((b.startingTime > a.startingTime) ? -1 : 0);        
        return Promise.all<BookingWithFacility[], BookingWithFacility[]>([
          Promise.resolve(past).then(past => past.sort(sortingFn)).then(past => past.slice(0, 5)),
          Promise.resolve(future).then(future => future.sort(sortingFn))
        ]);
      })
      .then(values => {
        setPastBookings(values[0]);
        setFutureBookings(values[1]);
      })
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
                  {"Upcoming Bookings"}
                </Text>
              </Box>
              <Flex
                direction={["column", "column", "row"]}
                maxW={"100vw"}
                wrap="wrap"
              >
                {futureBookings.length > 0 ? (
                  futureBookings.map((booking, id) => {
                    return (
                    <Box key={id} ml={[0, 0, 3]} mb={[0, 3, 5]}>
                      <BookingCard key={id} booking={booking} />
                    </Box>);
                  })
                ) : (
                  <Text>{"No upcoming bookings to show."}</Text>
                )}
              </Flex>
              <Box pt={3}>
                <Text fontWeight="bold" fontSize="xl">
                  {"Past 5 Bookings"}
                </Text>
              </Box>
              <Flex
                direction={["column", "column", "row"]}
                maxW={"100vw"}
                wrap="wrap"
              >
              {pastBookings.length > 0 ? (
                  pastBookings.map((booking, id) => {
                    return (
                    <Box key={id} ml={[0, 0, 3]} mb={[0, 3, 5]}>
                      <BookingCard key={futureBookings.length + id} booking={booking} />
                    </Box>);
                  })
                ) : (
                  <Text>{"No past bookings to show"}</Text>
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
