import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  HStack,
  Spinner,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Booking, Facility } from "~/config/interface";
import APIUrl from "~/config/backendUrl";
import AdminPage from "~/components/Page/AdminPage";
import axios, { AxiosRequestConfig } from "axios";
import Calendar from "~/components/Calendar/Calendar";
import SearchCard from "~/components/SearchCard/SearchCard";

const BookingAdminView: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [isLoading, setLoading] = useState<boolean>(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [bookingChange, setBookingChange] = useState<boolean>(false);
  const [facility, setFacility] = useState<Facility>({
    id: 0,
    name: "nothing",
    imageUrl: "nothing",
    location: "nothing",
    type: "OTHER",
    description: "nothing",
    rating: 0,
    rate: 0,
  });

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
          setBookings(bookings);
          setFacility(facility);
          setError("");
        })
      )
      .catch((error) => {
        setError(error.response.statusText);
      })
      .finally(() => {
        setBookingChange(false);
        setLoading(false);
      });
  }, [bookingChange]);

  const generateView = () => (
    <HStack spacing={"5vw"} marginLeft={"5vw"}>
      <Box>
        <SearchCard
          id={facility.id}
          name={facility.name}
          type={facility.type}
          description={facility.description}
          image={facility.imageUrl}
          location={facility.location}
          rating={facility.rating}
          showModal={false}
        />
        {error ? (
          <Alert status="error" flexDirection="column">
            <AlertIcon />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : (
          <></>
        )}
      </Box>
      <Flex direction="column" w={"40vw"} minH={"20vh"} marginLeft={"2vw"}>
        <Calendar
          bookingsList={bookings}
          facilityId={facility.id}
          onChange={() => {
            setBookingChange(true);
          }}
        />
      </Flex>
    </HStack>
  );

  return (
    <AdminPage title="facilitiesAdmin" description="facilitiesAdmin">
      {isLoading ? (
        <Box marginLeft="45vw" marginTop="45vh">
          <Spinner size="xl" color="black" />
        </Box>
      ) : (
        generateView()
      )}
    </AdminPage>
  );
};

export default BookingAdminView;
