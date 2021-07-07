import React from "react";
import { Avatar, HStack, VStack, Center, Text, Box } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";

import { Booking } from "~/config/interface";


interface OwnProps { // To be fetched from the page
  booking: Booking
}

const BookingCard : React.FC<OwnProps> = ( { booking } ) => {
  
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour12: true,
    hour: "2-digit",
    minute: "2-digit"
  };
  const startingTime = new Date(booking.startingTime);
  const endingTime = new Date(booking.endingTime);

  return (
    <Box
      minHeight={["25vh", "10vh", "10vh"]}
      width={["2xs", "xs", "xs", "md"]}
      borderWidth={"1px"}
      borderRadius="xl"
      overflow="hidden"
      shadow="lg"
      data-cy="search-card"
      p={3}
    >
      <Center>
        <Text fontWeight="bold">Facility Name</Text>
      </Center>
      <HStack>
        <Text fontWeight="bold">From: </Text>
        <Text ml={2} noOfLines={2}>{ startingTime.toLocaleString('en-UK', options) }</Text>
      </HStack>
      <HStack>
        <Text fontWeight="bold">To: </Text>
        <Text ml={2} noOfLines={2}>{ endingTime.toLocaleString('en-UK', options) }</Text>
      </HStack>
    </Box>
  )
}

export default BookingCard;