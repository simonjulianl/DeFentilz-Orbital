import React, { useEffect, useState } from "react";
import { Avatar, VStack, Text, Flex, IconButton, Center } from "@chakra-ui/react";
import { Box } from "@chakra-ui/layout";
import Page from "~/components/Page/Page";
import { NextPage } from "next";
import SearchBar from "~/components/SearchBar/SearchBar";
import { useRouter } from 'next/router'

const SearchView: NextPage = () => {
  const router = useRouter();
  const { q } = router.query;

  const [screenWidth, setScreenWidth] = useState(0);
  useEffect(() => {
    // Make API Call here 
    setScreenWidth(screen.width);
  }, [screenWidth]);
  console.log(q);

  return (
    <Page title="Search" description="Search">
      <Flex direction="column" justify="flex-start">
        <Box
        padding={3}>
          <SearchBar onSubmit={(content: string) => router.push({
                pathname: '/search',
                query: {
                  q: content
                } 
              }
              )}
              value={q} />
        </Box>
        <Center>
          <Text>
            Searching for: {q}
          </Text>
        </Center>
      </Flex>
    </Page>
  );
};

export default SearchView;
