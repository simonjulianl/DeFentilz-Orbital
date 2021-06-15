import React from "react";
import { useAuth } from "~/firebase/auth";
import { Avatar, VStack, Text } from "@chakra-ui/react";
import { Box } from "@chakra-ui/layout";
import Page from "~/components/Page/Page";
import { NextPage } from "next";

const ProfileView: NextPage = () => {
  const authContext = useAuth();

  return (
    <Page title="Profile" description="Profile">
      <VStack>
        <Box>
          <VStack paddingTop={[10, 50]}>
            <Avatar size="lg" aria-label="Profile Picture" />
            {authContext.auth ? (
              <>
                <Text>{"Display Name: " + authContext.auth.name}</Text>
                <Text>{"Email Address: " + authContext.auth.email}</Text>
                <Text>{"Bookings: Currently No Bookings Yet"}</Text>
              </>
            ) : (
              <Text align="center">
                {"You are not logged in. Please login to see your profile."}
              </Text>
            )}
          </VStack>
        </Box>
      </VStack>
    </Page>
  );
};

export default ProfileView;
