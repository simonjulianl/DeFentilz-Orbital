import React from "react";
import { Avatar, HStack, VStack, Text, Box } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";
import { Router, withRouter } from "next/router";
import Page from "~/components/Page/Page";

import ProfileAvatar from "~/components/Profile/ProfileAvatar";

interface OwnProps { // To be fetched from the page
  displayName: string,
  photoUrl: string,  
  email: string, 
}

const BookingCard : React.FC<OwnProps> = ( { displayName, email, photoUrl} ) => {
  return (
    <HStack paddingX={[5]} justifyContent="space-between">
      <Box>
      </Box>
    </HStack>
  )
}

export default BookingCard;