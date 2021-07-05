import React, { useEffect, useState } from "react";
import { useAuth } from "~/firebase/auth";

import { Avatar, VStack, Text, Box, Spinner, Center } from "@chakra-ui/react";

import BookingCard from "~/components/Profile/ProfileBooking";
import Page from "~/components/Page/Page";
import ProfileHeader from "~/components/Profile/ProfileHeader";

import { NextPage } from "next";
import ProfileAvatar from "~/components/Profile/ProfileAvatar";
import axios, { AxiosRequestConfig } from "axios";
import APIUrl from "~/config/backendUrl";

const ProfileView: NextPage = () => {
  const authContext = useAuth();
  const [isLoading, setLoading ] = useState<boolean>(false);
  const [walletValue, setWalletValue ] = useState<number>(0);

  useEffect(() => {
    if (authContext.auth) {
      const config: AxiosRequestConfig = {
        method: "GET",
        url: APIUrl.getSingleUserByEmail + "/" + authContext.auth.email, 
        timeout: 5000,
      };

      setLoading(true);
      axios(config)
      .then(response => response.data)
      .then(user => setWalletValue(user.walletValue))
      .catch(error => console.error(error))
      .finally(() => setLoading(false))
    }
  }, [authContext])
    
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
              <BookingCard
                displayName={authContext.auth.name}
                photoUrl={authContext.auth.photoUrl}
                email={authContext.auth.email}
              />
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

