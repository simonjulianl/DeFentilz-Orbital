import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { VStack, Box, Flex, Center } from "@chakra-ui/layout";
import { IconButton, Text } from "@chakra-ui/react";
import {
  faVolleyballBall,
  faHandshake,
  faBook,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Page from "~/components/Page/Page";
import SearchBar from "~/components/SearchBar/SearchBar";
import BonusCarousel from "~/components/Carousel/Carousel";

const ExploreView: NextPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // should connect the api here
    console.log("Refresh the page now of search term " + searchTerm);
  }, [searchTerm]);

  return (
    // <Layout>
    <Page title="Explore" description="Explore">
      <Flex direction="column" justify="flex-start">
        <Box padding={3}>
          <SearchBar onSubmit={(content: string) => setSearchTerm(content)} />
        </Box>
        <Flex justify="center" paddingTop={2} paddingBottom={5}>
          <BonusCarousel />
        </Flex>
        <Flex direction="row" justify="space-around" align="center" wrap="wrap">
          <VStack>
            <IconButton
              isRound
              size={"lg"}
              icon={<FontAwesomeIcon icon={faVolleyballBall} />}
              aria-label="sports"
            />
            <Text
              align="center"
              width={["50px", "70px", "100px", "150px"]}
              fontSize={["xs", "sm", "lg"]}
            >
              Sports Facilities
            </Text>
          </VStack>
          <VStack>
            <IconButton
              isRound
              size="lg"
              icon={<FontAwesomeIcon icon={faHandshake} />}
              aria-label="meeting"
            />
            <Text
              align="center"
              width={["50px", "70px", "100px", "150px"]}
              fontSize={["xs", "sm", "lg"]}
            >
              Meeting Rooms
            </Text>
          </VStack>
          <VStack>
            <IconButton
              isRound
              size="lg"
              icon={<FontAwesomeIcon icon={faBook} />}
              aria-label="study"
            />
            <Text
              align="center"
              width={["50px", "70px", "100px", "150px"]}
              fontSize={["xs", "sm", "lg"]}
            >
              Study Rooms
            </Text>
          </VStack>
        </Flex>
      </Flex>
    </Page>
  );
};

export default ExploreView;
