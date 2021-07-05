import React from "react";
import { useAuth } from "~/firebase/auth";

import { Avatar, VStack, Text, Box } from "@chakra-ui/react";

import BookingCard from "~/components/Profile/ProfileBooking";
import Page from "~/components/Page/Page";
import ProfileHeader from "~/components/Profile/ProfileHeader";

import { NextPage } from "next";
import ProfileAvatar from "~/components/Profile/ProfileAvatar";

const ProfileView: NextPage = () => {
  const authContext = useAuth();

  return (
    <Page title="Profile" description="Profile">
      <Box>
        {/* <VStack paddingTop={[10, 50]}>
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
        </VStack> */}

        { authContext.auth
        ? ( 
            <>
              <ProfileHeader
                displayName={authContext.auth.name}
                photoUrl={authContext.auth.photoUrl}
                email={authContext.auth.email}
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
