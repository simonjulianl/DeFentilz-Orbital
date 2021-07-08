import { VStack, Button, Text, Center, Spinner, Box, IconButton, GridItem, Grid } from "@chakra-ui/react";
import { faArrowLeft, faBackspace, faBackward } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios, { AxiosRequestConfig } from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Page from "~/components/Page/Page";
import ProfileAvatar from "~/components/Profile/ProfileAvatar";
import ProfileHeader from "~/components/Profile/ProfileHeader";
import APIUrl from "~/config/backendUrl";
import { User } from "~/config/interface";
import { useAuth } from "~/firebase/auth";

const SettingsView : NextPage = () => {
  const authContext = useAuth();
  const router = useRouter();
  const [isLoading, setLoading ] = useState<boolean>(false);
  const [userData, setUserData] = useState<User>(null);
  
  useEffect(() => {
    if (!authContext.auth) {
      router.push('/'); // Ideally bring to error page instead
    } else {
      const getUserconfig: AxiosRequestConfig = {
        method: "GET",
        url: APIUrl.getSingleUserByEmail + "/" + authContext.auth.email, 
        timeout: 5000,
      };

      setLoading(true);
      axios(getUserconfig)
      .then(response => response.data)
      .then(user => setUserData(user))
      .catch(error => console.error(error))
      .finally(() => setLoading(false))
    }
  }, [authContext]);

  return (
    <Page title="Settings" description="Settings">
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
                variant="ghost"
                aria-label="back"
                icon={<FontAwesomeIcon icon={faArrowLeft}/>}
                onClick={() => router.push('/profile')}
              />
              </GridItem>
            </Grid>
            <ProfileHeader
              displayName={authContext.auth.name}
              photoUrl={authContext.auth.photoUrl}
              email={authContext.auth.email}
              walletValue={0}
              />
            <VStack>
              <Button>Change Display Name</Button>
              <Button>Change Password</Button>
              <Button colorScheme="teal">Subscribe to Push Notification</Button>
            </VStack>
          </>
      ) : (
        <VStack paddingTop={[10, 50]}>
          <ProfileAvatar photoUrl={null} />
          <Text align="center">
            {"You are not logged in. Please login to change your profile."}
          </Text>
        </VStack>
      )
    }
    </Page>
  )
}

export default SettingsView;