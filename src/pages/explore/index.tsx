import React, { useEffect, useState } from "react";
import {
  Box,
  VStack,
  Flex,
  Text,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useBreakpointValue,
} from "@chakra-ui/react";

import { NextPage } from "next";
import { useRouter } from "next/router";
import Page from "~/components/Page/Page";
import SearchBar from "~/components/SearchBar/SearchBar";
import SearchCard from "~/components/SearchCard/SearchCard";

import axios, { AxiosRequestConfig } from "axios";
import APIUrl from "~/config/backendUrl";
import { Facility } from "~/config/interface";

const ExploreView: NextPage = () => {
  const router = useRouter();
  const { keyword } = router.query;

  const [searchResult, setSearchResult] = useState<Facility[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [screenWidth, setScreenWidth] = useState(0);

  const specialKeyword = ["SPORT", "MEETING", "STUDY", "OTHERS"];

  useEffect(() => {
    setScreenWidth(screen.width);

    const config: AxiosRequestConfig = {
      method: "GET",
      url:
        keyword === undefined || keyword === ""
          ? APIUrl.getAllFacilities
          : typeof keyword === "string" &&
            specialKeyword.includes(keyword.toUpperCase())
          ? APIUrl.getFacilitiesByType + `/${keyword.toUpperCase()}`
          : APIUrl.getFacilitiesByName + `/${keyword}`,
      timeout: 5000,
    };

    setLoading(true);
    axios(config)
      .then((response) => response.data)
      .then((facilities) => {
        setError(null);
        setSearchResult(facilities);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [keyword, screenWidth]);

  return (
    <Page title="Explore" description="Explore">
      <Flex direction="column" justify="flex-start">
        <VStack pt={3} pos="fixed" background="white" width={screenWidth}>
          {useBreakpointValue({
            base: (
              <SearchBar
                name="explore-search"
                onSubmit={(content: string) =>
                  router.push({
                    pathname: "/explore",
                    query: {
                      keyword: content,
                    },
                  })
                }
              />
            ),
            md: <></>,
          })}
        </VStack>
        <VStack pt={["25%", "15%", "2"]}>
          <Text fontSize={["md", "md", "xl"]}>Searching for: {keyword}</Text>
          {isLoading ? (
            <Box paddingTop={[2, 3, 5, 10]}>
              <Spinner size="xl" />
            </Box>
          ) : error === null ? (
            <Flex
              direction={["column", "column", "row"]}
              maxW={"90vw"}
              wrap="wrap"
            >
              {searchResult.length > 0 ? (
                searchResult.map((facility) => (
                  <Box key={facility.id} ml={[0, 0, 3]} mb={[0, 3, 5]}>
                    <SearchCard
                      id={facility.id}
                      name={facility.name}
                      type={facility.type}
                      description={facility.description}
                      image={facility.imageUrl}
                      location={facility.location}
                      rating={facility.rating}
                      showModal={true}
                    />
                  </Box>
                ))
              ) : (
                <Text>No Results Found</Text>
              )}
            </Flex>
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
      </Flex>
    </Page>
  );
};

export default ExploreView;
