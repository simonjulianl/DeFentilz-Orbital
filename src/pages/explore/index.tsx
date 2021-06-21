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

const ExploreView: NextPage = () => {
  const router = useRouter();
  let { keyword } = router.query;

  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    setScreenWidth(screen.width);

    const config: AxiosRequestConfig = {
      method: "get",
      url: encodeURI("https://60c6eb8f19aa1e001769feaf.mockapi.io/facilities"),
      timeout: 10000,
    };

    setLoading(true);

    axios(config)
      .then((response) => response.data)
      .then((response) => {
        setLoading(false);
        setError(null);
        setSearchResult(response);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
        setError({
          code: error.response.status,
          message: error.response.statusText,
        });
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
          <Text>Searching for: {keyword}</Text>
        </VStack>
        <VStack pt={["25%", "25%", "15%", "5%"]}>
          {isLoading ? (
            <Box>
              LOADING
              <Spinner ml="2" />
            </Box>
          ) : error === null ? (
            searchResult.length > 0 ? (
              searchResult.map(
                ({ id, name, type, description, location, image, rating }) => (
                  <SearchCard
                    key={id}
                    id={id}
                    name={name}
                    type={type}
                    description={description}
                    image={image}
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
