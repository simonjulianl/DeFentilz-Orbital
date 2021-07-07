import React, { useEffect, useState } from "react";
import { useAuth } from "~/firebase/auth";

import { Avatar, VStack, Text, Box, Spinner, Center } from "@chakra-ui/react";

import BookingCard from "~/components/Profile/BookingCard";
import Page from "~/components/Page/Page";
import ProfileHeader from "~/components/Profile/ProfileHeader";

import { NextPage } from "next";
import ProfileAvatar from "~/components/Profile/ProfileAvatar";
import axios, { AxiosRequestConfig } from "axios";
import APIUrl from "~/config/backendUrl";
import { Booking } from "~/config/interface";

const ProfileView: NextPage = () => {
  const authContext = useAuth();
  const [isLoading, setLoading ] = useState<boolean>(false);
  const [walletValue, setWalletValue ] = useState<number>(0);
  const [myBookings, setMyBookings ] = useState<Booking[]>([]);

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
      }

      setLoading(true);
      axios(getUserconfig)
      .then(response => response.data)
      .then(user => setWalletValue(user.walletValue))
      .then(() => axios(getBookingConfig))
      .then(response => response.data)
      .then(bookings => setMyBookings(bookings))
      .catch(error => console.error(error))
      .finally(() => setLoading(false))
    }
  }, [])
    
  return (
    <Page title="Profile" description="Profile">
      <Box>
        {isLoading
        ? (
          <Center paddingTop={[2, 3, 5, 10]}>
            <Spinner size="xl"/>
          </Center>
        )
        : authContext.auth
        ? ( 
            <>
              <ProfileHeader
                displayName={authContext.auth.name}
                photoUrl={authContext.auth.photoUrl}
                email={authContext.auth.email}
                walletValue={walletValue}
              />
              <VStack>
              <Box>
                <Text fontWeight="semibold" fontSize="lg"> My Bookings </Text>
              </Box>
                {
                  myBookings.map((booking, id) => {
                    console.log(id);
                    return <BookingCard key={id} booking={booking}/>; 
                  }
                  )
                }
              </VStack>
            </>
          ) : (
            <VStack paddingTop={[10, 50]}>
              <ProfileAvatar photoUrl={null} />
              <Text align="center">
                {"You are not logged in. Please login to see your profile."}
              </Text>
            </VStack>
          )
        }
      </Box>
    </Page>
  );
};

export default ProfileView;

