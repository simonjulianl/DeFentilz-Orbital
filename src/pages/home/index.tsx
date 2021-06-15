import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { VStack, Box, Flex } from "@chakra-ui/layout";
import { IconButton, Text } from "@chakra-ui/react";
import {
  faVolleyballBall,
  faHandshake,
  faBook,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchBar from "~/components/SearchBar/SearchBar";
import BonusCarousel from "~/components/Carousel/Carousel";
import Page from "~/components/Page/Page";
import { useRouter } from "next/router";

const HomeView: NextPage = () => {
  const router = useRouter();
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    setScreenWidth(screen.width);
  }, [screenWidth]);

  return (
    <Page title="Home" description="Home">
      <Flex direction="column" justify="flex-start">
        <Box
          padding={3}
          paddingBottom={3}
          zIndex={1}
          position="absolute"
          background="white"
          width={screenWidth}
        >
          <SearchBar
            onSubmit={(content: string) =>
              router.push({
                pathname: "/explore",
                query: {
                  keyword: content,
                },
              })
            }
          />
        </Box>
        <Flex
          direction="column"
          justify="center"
          paddingBottom={5}
          marginTop={16}
        >
          <BonusCarousel />
        </Flex>
        <Flex direction="row" justify="space-around" align="center" wrap="wrap">
          <VStack>
            <IconButton
              isRound
              size={"lg"}
              icon={<FontAwesomeIcon icon={faVolleyballBall} />}
              aria-label="sports"
              onClick={() => {
                router.push({
                  pathname: "/explore",
                  query: {
                    keyword: "sports",
                  },
                });
              }}
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
              onClick={() => {
                router.push({
                  pathname: "/explore",
                  query: {
                    keyword: "meeting",
                  },
                });
              }}
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
              onClick={() => {
                router.push({
                  pathname: "/explore",
                  query: {
                    keyword: "study",
                  },
                });
              }}
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

export default HomeView;
