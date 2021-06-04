import React from "react";
import { NextPage } from "next";
import { VStack, Box } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/react";
import Page from "~/components/Page";
import { useAuth } from "~/firebase/auth";

const BookingView: NextPage = () => {
  const authContext = useAuth();

  return (
    <Page title="booking" description="booking">
      <VStack>
        <Box>
          <VStack paddingTop={[10, 50]}>
            {authContext.auth ? (
              <div>
                <Text>{"Display Name: " + authContext.auth.name}</Text>
                <Text>{"Email Address: " + authContext.auth.email}</Text>
                <Text>{"Bookings: Currently No Bookings Yet"}</Text>
              </div>
            ) : (
              <Text align="center">
                {"You are not logged in. Please login to see your bookings."}
              </Text>
            )}
          </VStack>
        </Box>
      </VStack>
    </Page>
  );
};

export default BookingView;
