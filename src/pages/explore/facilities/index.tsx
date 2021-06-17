import React, { useEffect, useState } from "react";
import {
  Box,
  VStack,
  Flex,
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

interface fetchBookingType {
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
  const [fetchResult, setFetchResult] = useState<[fetchType] | []>([]); // Invalid data type for actual API ...
  const [fetchBookingResult, setFetchBookingResult] = useState<[fetchBookingType] | []>([]);
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

    setLoading(true);

    axios(config)
      .then((response) => response.data)
      .then((response) => {
        setError(null);
        setFetchResult(response);
      })
      .catch((error) => {
        setError({
          code: error.response.status,
          message: error.response.statusText,
        });
        setFetchResult([]);
      })
      .finally(() => {
        setLoading(false);
        setScreenWidth(screen.width);
      });
  }, [id, screenWidth]);

  console.log(fetchResult);

  return (
    <Page title="Explore" description="Explore">
      <VStack>
          {isLoading ? (
            <Box>
              LOADING
              <Spinner ml="2" />
            </Box>
          ) : error === null ? (
            fetchResult.length > 0 ? (
              fetchResult.map(
                ({
                  id,
                  name,
                  type,
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
                      bookingsList={[
                        {
                        title: "Testing",
                        start: new Date(),
                        end: new Date(),
                        allDay: false,
                        }
                      ]}
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
