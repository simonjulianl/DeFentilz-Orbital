import React from "react";
import { HStack, Center, Text, Box } from "@chakra-ui/react";

import { Booking } from "~/config/interface";
import moment from "moment";
import router from "next/router";

interface BookingWithFacility extends Booking {
  facilityName: string;
}

interface OwnProps {
  booking: BookingWithFacility;
}

const BookingCard: React.FC<OwnProps> = ({ booking }) => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
  };
  
  const startTime = moment(booking.startingTime).toDate();;
  const endTime = moment(booking.endingTime).toDate();;

  return (
    <Box
      minHeight={["25vh", "10vh", "10vh"]}
      width={["2xs", "xs", "sm", "md"]}
      borderWidth={"1px"}
      borderRadius="xl"
      overflow="hidden"
      shadow="lg"
      data-cy="search-card"
      p={3}
      as="button"
      onClick={() => router.push('/explore/facilities/' + booking.facilityId)}
    >
      <Center>
        <Text fontWeight="bold">{booking.facilityName}</Text>
      </Center>
      <HStack>
        <Text fontWeight="bold">From: </Text>
        <Text ml={2} noOfLines={2}>
          {startTime.toLocaleString("en-UK", options)}
        </Text>
      </HStack>
      <HStack>
        <Text fontWeight="bold">To: </Text>
        <Text ml={2} noOfLines={2}>
          {endTime.toLocaleString("en-UK", options)}
        </Text>
      </HStack>
    </Box>
  );
};

export default BookingCard;
