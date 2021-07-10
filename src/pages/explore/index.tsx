import React, { useEffect, useState } from "react";
import {
  Center,
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
  let { keyword } = router.query;

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
              <Spinner size="xl"/>
            </Box>
          ) : error === null ? (
            searchResult.length > 0 ? (
              searchResult.map(
                ({
                  id,
                  name,
                  type,
                  description,
                  location,
                  imageUrl,
                  rating,
                }) => (
                  <SearchCard
                    key={id}
                    id={id}
                    name={name}
                    type={type}
                    description={description}
                    image={imageUrl}
                    location={location}
                    rating={rating}
                  />
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
      </Flex>
    </Page>
  );
};

export default ExploreView;
