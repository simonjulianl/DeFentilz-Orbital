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
  Heading
} from "@chakra-ui/react";

import { NextPage } from "next";
import { useRouter } from "next/router";

import Calendar from "~/components/Calendar/Calendar";
import { Booking } from '~/config/interface';
import Page from "~/components/Page/Page";

import axios, { AxiosRequestConfig } from "axios";
import { StarIcon } from "@chakra-ui/icons";

interface fetchType {
    id: number,
    name: string
    location: string
    type: string,
    description: string, 
    rating: number | null, 
    rate: number, 
    image: string
}

const ContentDetailView: NextPage = () => {
  const router = useRouter();
  let { id } = router.query;

  const [isLoading, setLoading] = useState<boolean>(false);
  const [fetchFacilityResult, setFetchFacilityResult] = useState<fetchType[]>([]);
  const [fetchBookingResult, setFetchBookingResult] = useState<Booking[]>([
    {
      id: null,
      startingTime: null,
      endingTime: null,
      facilityId: null,
      userEmail: null
    }
  ]);
  const [bookingChange, setBookingChange] = useState<boolean>(false);
  const [error, setError] = useState(null);
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    const config: AxiosRequestConfig = {
      method: "get",
      url: encodeURI(
        "https://60c6eb8f19aa1e001769feaf.mockapi.io/facilities?id=" +
          id
      ),
      timeout: 10000,
    };

  const bookingConfig: AxiosRequestConfig = {
    method: "get",
    url: encodeURI(
      "https://60c6eb8f19aa1e001769feaf.mockapi.io/bookings?facilityId=" + 
      id
    ),
    timeout: 10000,
  }

    setLoading(true);
    axios(config)
      .then((response) => response.data)
      .then((response) => {
        setError(null);
        setFetchFacilityResult(response);
      })
      .then(() => axios(bookingConfig))
      .then((bookingResponse) => bookingResponse.data)
      .then((bookingResponse) => {
        setError(null);
        setFetchBookingResult(bookingResponse);
        console.log(bookingResponse);
      })
      .catch((error) => {
        setError({
          code: error.response.status,
          message: error.response.statusText,
        });
        setFetchFacilityResult([]);
      })
      .finally(() => {
        setLoading(false);
        setBookingChange(false);
        setScreenWidth(screen.width);
      });
  }, [id, screenWidth, bookingChange]);

  return (
    <Page title="Explore" description="Explore">
      <VStack>
          {isLoading ? (
            <Box>
              LOADING
              <Spinner ml="2" />
            </Box>
          ) : error === null ? (
            fetchFacilityResult.length > 0 ? (
              fetchFacilityResult.map(
                ({
                  id,
                  name,
                  description,
                  location,
                  image,
                  rating,
                  rate
                }) => (
                  <Box paddingX={3}>
                    <Center paddingTop={3}>
                      <Heading size="lg">
                          {name}
                      </Heading>
                    </Center>
                    <Box width={'100%'}>
                      <Image
                        borderRadius="lg"
                        objectFit="fill"
                        src={error ? '/notAvail2.png' : image}
                        alt={name}
                        fallback={
                          <Spinner />
                        }
                        onError={() => setError(true)}
                      />
                    </Box>
                    <HStack justifyContent="space-between">
                      <Box>
                        <Text
                          mt="3"
                          fontWeight="semibold"
                          as="h4">
                          Price
                        </Text>
                        <Text>
                          {"SGD " + rate}
                        </Text>          
                      </Box>
                      <Box>
                        <Text
                          mt="3"
                          fontWeight="semibold"
                          as="h4">
                            Location
                        </Text>
                        <Text>
                          {location}
                        </Text>      
                      </Box>
                      <Box>
                        <Text
                          mt="3"
                          fontWeight="semibold"
                          as="h4">
                            Rating
                        </Text>
                        <Box justifyContent="left">
                          {rating === null
                            ? <Text>{"No Rating"}</Text>
                            : Array(5)
                              .fill("")
                              .map((_, idx) => 
                                <StarIcon
                                  key={idx}
                                  viewBox="0 0 30 30"
                                  color={idx < rating ? "yellow.300" : "gray.300"}
                                />)
                          }    
                        </Box>
                      </Box>    
                    </HStack>    
                    <Text
                      mt="3"
                      fontWeight="semibold"
                      as="h4">
                      About this place
                    </Text>
                    <Text>
                      {description}
                    </Text>
                    <Text
                      mt="3"
                      fontWeight="semibold"
                      as="h4">
                      Calendar
                    </Text>
                    <Text>
                      {"Make your booking by modifying the slots in the calendar below!"}
                    </Text>
                    <Calendar
                      bookingsList={fetchBookingResult}
                      facilityId={id}
                      onChange={() => setBookingChange(true)}
                    />
                  </Box>
                )
              )
            ) : (
              <Text>No Results Found</Text>
            )
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
