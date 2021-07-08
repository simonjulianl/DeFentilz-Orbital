import React, { useEffect, useState } from "react";
import { useAuth } from "~/firebase/auth";

import { VStack, Text, Box, Spinner, Center, Grid, GridItem, IconButton } from "@chakra-ui/react";

import BookingCard from "~/components/Profile/BookingCard";
import Page from "~/components/Page/Page";
import ProfileHeader from "~/components/Profile/ProfileHeader";

import { NextPage } from "next";
import ProfileAvatar from "~/components/Profile/ProfileAvatar";
import axios, { AxiosRequestConfig } from "axios";
import APIUrl from "~/config/backendUrl";
import { Booking } from "~/config/interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

const ProfileView: NextPage = () => {
  const authContext = useAuth();
  const router = useRouter();
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
              <Grid>
                <GridItem colStart={8}>
                  <IconButton
                    aria-label="Edit Button"
                    icon={<FontAwesomeIcon icon={faCog} />}
                    variant="ghost"
                    onClick={() => router.push('/profile/settings')}
                  />
                </GridItem>
              </Grid>
              <ProfileHeader
                displayName={authContext.auth.name}
                photoUrl={authContext.auth.photoUrl}
                email={authContext.auth.email}
                walletValue={walletValue}
                showTopUp={true}
                onTopUp={() => console.log("Topped up")}
              />
              <VStack>
              <Box>
                <Text fontWeight="bold" fontSize="xl"> My Bookings </Text>
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

