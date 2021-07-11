import React, { useEffect, useState } from "react";
import { useAuth } from "~/firebase/auth";

import {
  VStack,
  Text,
  Box,
  Spinner,
  Center,
  Button,
  Stack,
} from "@chakra-ui/react";

import Page from "~/components/Page/Page";
import ProfileHeader from "~/components/Profile/ProfileHeader";

import { NextPage } from "next";
import ProfileAvatar from "~/components/Profile/ProfileAvatar";
import axios, { AxiosRequestConfig } from "axios";
import APIUrl from "~/config/backendUrl";
import { Booking } from "~/config/interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faKey } from "@fortawesome/free-solid-svg-icons";

const ProfileView: NextPage = () => {
  const authContext = useAuth();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [walletValue, setWalletValue] = useState<number>(0);

  useEffect(() => {
    if (authContext.auth) {
      const getUserconfig: AxiosRequestConfig = {
        method: "GET",
        url: APIUrl.getSingleUserByEmail + "/" + authContext.auth.email,
        timeout: 5000,
      };

      setLoading(true);
      axios(getUserconfig)
        .then((response) => response.data)
        .then((user) => setWalletValue(user.walletValue))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }
  }, []);

  return (
    <Page title="Profile" description="Profile">
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
              showWallet={true}
              showTopUp={true}
              onTopUp={() => console.log("Topped up")}
            />
            <Center>
              <Text fontWeight="bold" fontSize="xl">
                {"Settings"}
              </Text>
            </Center>
            <Stack direction="column" align="left">
              {/* To Change Display Name, Password, etc. */}
              <Button
                aria-label="Account"
                variant="ghost"
                leftIcon={<FontAwesomeIcon icon={faKey} />}
              >
                Account
              </Button>
              {/* Notification settings */}
              <Button
                aria-label="Account"
                variant="ghost"
                leftIcon={<FontAwesomeIcon icon={faBell} />}
              >
                Notification
              </Button>
            </Stack>
          </Box>
        ) : (
          <VStack paddingTop={[10, 50]}>
            <ProfileAvatar photoUrl={null} />
            <Text align="center">
              {"You are not logged in. Please login to see your profile."}
            </Text>
          </VStack>
        )}
      </Box>
    </Page>
  );
};

export default ProfileView;
