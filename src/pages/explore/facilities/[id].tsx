import React, { useEffect, useState } from "react";
import {
  Box,
  VStack,
  Text,
  Spinner,
  Image,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  HStack,
  Center,
  Heading,
} from "@chakra-ui/react";

import { NextPage } from "next";
import { useRouter } from "next/router";

import Calendar from "~/components/Calendar/Calendar";
import { Booking, Facility } from "~/config/interface";
import Page from "~/components/Page/Page";

import axios, { AxiosRequestConfig } from "axios";
import { StarIcon } from "@chakra-ui/icons";
import APIUrl from "~/config/backendUrl";

const ContentDetailView: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [isLoading, setLoading] = useState<boolean>(false);
  const [facility, setFacility] = useState<Facility>({
    id: 1,
    name: "nothing",
    imageUrl: "nothing",
    location: "nothing",
    type: "OTHER",
    description: "nothing",
    rating: 0,
    rate: 0,
  });
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [bookingChange, setBookingChange] = useState<boolean>(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const configFacility: AxiosRequestConfig = {
      method: "GET",
      url: APIUrl.getSingleFacility + `/${id}`,
      timeout: 5000,
    };

    const configBooking: AxiosRequestConfig = {
      method: "GET",
      url: APIUrl.getEntireBookings + `/${id}`,
      timeout: 5000,
    };

    setLoading(true);

    axios
      .all([
        axios(configFacility).then((response) => response.data),
        axios(configBooking).then((response) => response.data),
      ])
      .then(
        axios.spread((facility, bookings) => {
          console.log(bookings);
          setBookings(bookings);
          setFacility(facility);
        })
      )
      .catch((error) => {
        setError(error);
        setError({
          code: error.response.status,
          message: error.response.statusText,
        });
      })
      .finally(() => {
        setBookingChange(false);
        setLoading(false);
      });
  }, [id, bookingChange]);

  return (
    <Page title="ContentListing" description="ContentListing">
      <VStack>
        {isLoading ? (
          <Box paddingTop={[2, 3, 5, 10]}>
            <Spinner size="xl"/>
          </Box>
        ) : error === null ? (
          <Box paddingX={3} aria-label="Scrollable">
            <Center paddingTop={3}>
              <Heading size="lg" aria-label="Facility Name">
                {facility.name}
              </Heading>
            </Center>
            <Center width={"100%"}>
              <Image
                aria-label="Facility Image"
                width={["100%", "100%", "80vh"]}
                borderRadius="lg"
                objectFit="fill"
                src={error ? "/notAvail2.png" : facility.imageUrl}
                alt={facility.name}
                fallback={<Spinner />}
                onError={() => setError(true)}
              />
            </Center>
            <HStack justifyContent="space-between" width={["100%", "100%", "50vw"]}>
              <Box>
                <Text aria-label="Price" mt="3" fontWeight="semibold" fontSize={["md", "md", "xl"]}>
                  Price
                </Text>
                <Text fontSize={["md", "md", "lg"]}>{"SGD " + facility.rate}</Text>
              </Box>
              <Box>
                <Text aria-label="Location" mt="3" fontWeight="semibold" fontSize={["md", "md", "xl"]}>
                  Location
                </Text>
                <Text fontSize={["md", "md", "lg"]}>{facility.location}</Text>
              </Box>
              <Box>
                <Text aria-label="Rating" mt="3" fontWeight="semibold" fontSize={["md", "md", "xl"]}>
                  Rating
                </Text>
                <Box justifyContent="left">
                  {facility.rating === null ? (
                    <Text fontSize={["md", "md", "lg"]}>{"No Rating"}</Text>
                  ) : (
                    Array(5)
                      .fill("")
                      .map((_, idx) => (
                        <StarIcon
                          key={idx}
                          viewBox="0 0 30 30"
                          color={
                            idx < facility.rating ? "yellow.300" : "gray.300"
                          }
                        />
                      ))
                  )}
                </Box>
              </Box>
            </HStack>
            <Text mt="3" fontWeight="semibold" fontSize={["md", "md", "xl"]}>
              About this place
            </Text>
            <Text fontSize={["md", "md", "lg"]}>{facility.description}</Text>
            <Text mt="3" fontWeight="semibold" fontSize={["md", "md", "xl"]}>
              Calendar
            </Text>
            <Text fontSize={["md", "md", "lg"]}>
              Make your booking by modifying the slots in the calendar below!
            </Text>
            <Calendar
              bookingsList={bookings}
              facilityId={facility.id}
              onChange={() => setBookingChange(true)}
            />
          </Box>
        ) : (
          <Alert status="error" flexDirection="column">
            <AlertIcon />
            <AlertTitle>
              {error.code === 404 ? "SERVER NOT FOUND" : "UNKNOWN ERROR"}
            </AlertTitle>
            <AlertDescription>
              {error.code === 404
                ? "Please check your network connection"
                : "CODE: " + error.code + " MESSAGE: " + error.message}
            </AlertDescription>
          </Alert>
        )}
      </VStack>
    </Page>
  );
};

export default ContentDetailView;
