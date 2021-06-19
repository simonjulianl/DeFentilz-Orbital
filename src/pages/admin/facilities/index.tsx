import React, { useEffect, useState } from "react";
import { Box, Flex, Spinner } from "@chakra-ui/react";

import { NextPage } from "next";
import { useRouter } from "next/router";
import axios, { AxiosRequestConfig } from "axios";
import AdminPage from "~/components/Page/AdminPage";
import { Facility, Error } from "~/config/interface";
import { useAuth } from "~/firebase/auth";
import APIUrl from "~/config/backendUrl";
import SearchCard from "~/components/SearchCard/SearchCard";

const FacilityAdminView: NextPage = () => {
  const router = useRouter();
  const authContext = useAuth();

  const [isLoading, setLoading] = useState<boolean>(true);
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [displayedFacilities, setDisplayedFacilities] = useState<Facility[]>(
    []
  );
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (facilities.length === 0) {
      const config: AxiosRequestConfig = {
        method: "get",
        url: APIUrl.getAllFacilities,
        timeout: 5000,
      };

      setLoading(true);

      axios(config)
        .then((response) => response.data)
        .then((facilities) => {
          console.log(facilities);
          setFacilities(facilities);
          setDisplayedFacilities(facilities);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          setError(error);
          setError({
            code: error.response.status,
            message: error.response.statusText,
          });
        });
    }
  }, [displayedFacilities]);

  const generateSearchCards = () => (
    <Flex>
      {displayedFacilities.map((facility) => (
        <Box
          key={facility.id}
          marginLeft={5}
          my={5}
          onClick={() => router.push(`/admin/facilities/${facility.id}`)}
        >
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
        </Box>
      ))}
    </Flex>
  );

  return (
    <AdminPage title="facilitiesAdmin" description="facilitiesAdmin">
      {isLoading ? (
        <Box marginLeft="45vw" marginTop="45vh">
          <Spinner size="xl" color="black" />
        </Box>
      ) : (
        generateSearchCards()
      )}
    </AdminPage>
  );
};

export default FacilityAdminView;
