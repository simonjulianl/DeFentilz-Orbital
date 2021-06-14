import React, { useEffect, useState } from "react";
import { Box, VStack, Flex, Text, Spinner, Alert, AlertIcon, AlertTitle, AlertDescription} from "@chakra-ui/react";

import { NextPage } from "next";
import { useRouter } from 'next/router'

import Page from "~/components/Page/Page";
import SearchBar from "~/components/SearchBar/SearchBar";
import SearchCard from "~/components/SearchCard/SearchCard";

import axios, { AxiosRequestConfig } from "axios";

const SearchView: NextPage = () => {
  const router = useRouter();
  let { keyword } = router.query;

  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {    
    const config : AxiosRequestConfig = {
      method: 'get',
      url: encodeURI("https://60c6eb8f19aa1e001769feaf.mockapi.io/facilities?search=" + keyword),
      timeout: 10000,
    };

    setLoading(true);
    
    axios(config)
    .then(response => response.data)
    .then(response => {
      setLoading(false);
      setError(null);
      setSearchResult(response);
    })
    .catch(error => {
      setLoading(false);
      setError(error);
      setError({
        code: error.response.status,
        message: error.response.statusText
      })
    });
  }, [keyword]);

  return (
    <Page title="Search" description="Search">
      <Flex direction="column" justify="flex-start">
        <Box
        padding={3}
        >
          <SearchBar
              onSubmit={
                (content : string) => 
                  router.push({
                    pathname: '/booking/search', 
                    query: {
                      keyword: content
                    }
                  })
              }
            />
        </Box>
        <VStack>
          <Text>
            Searching for: {keyword}
          </Text>
          {
            isLoading
            ? <Box>
                LOADING
                <Spinner ml="2"/>
              </Box>
            : error === null
            ?  searchResult.length > 0 
            ? searchResult.map(
              ({id, name, type, description, location, image, rating}) =>
                <SearchCard
                  key={id}
                  id={id}
                  name={name}
                  type={type}
                  description={description}
                  image={image}
                  location={location}
                  rating={rating}/>
              )
            : <Text>No Results Found</Text>
            : <Alert
                status="error"
                flexDirection="column"
              >
                <AlertIcon />
                <AlertTitle>
                  {error.code === 404 
                    ? 'SERVER NOT FOUND' 
                    : 'UNKNOWN ERROR'}
                </AlertTitle>
                <AlertDescription>
                  {
                    error.code === 404 
                    ? 'Please check your network connection'
                    : 'CODE: ' + error.code + ' MESSAGE: ' + error.message
                  }
                </AlertDescription>
              </Alert>
            }
        </VStack>
      </Flex>
    </Page>
  );
};

export default SearchView;
