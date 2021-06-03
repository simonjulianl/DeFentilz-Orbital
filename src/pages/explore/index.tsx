import React from "react";
import { NextPage } from "next";

import Layout from "~/components/Page";
import SearchBar from "~/components/SearchBar/SearchBar";

import { VStack, Box, Flex, Center } from "@chakra-ui/layout";
import { HStack, Image, useMediaQuery } from "@chakra-ui/react";
import { IconButton, Text } from "@chakra-ui/react";

import {
  faVolleyballBall,
  faHandshake,
  faBook,
  faFilm,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Page from "~/components/Page";

const ExploreView: NextPage = () => {
  return (
    // <Layout>
    <Page title="Explore" description="Explore">
      <div>
        <Flex
          direction="row"
          justify="space-evenly"
          paddingTop={[2, 2, 4, 5]}
          paddingBottom={[2, 2, 4, 5]}
        >
          {/* searchbar */}
        </Flex>

        <Flex direction="row" justify="space-evenly" align="center" wrap="wrap">
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
        <Flex justify="center" paddingTop={[2, 5, 10]}>
          {/* Carousel */}
        </Flex>
      </div>
    </Page>
  );
};

export default ExploreView;
