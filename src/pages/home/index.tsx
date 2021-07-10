import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { VStack, Box, Flex } from "@chakra-ui/layout";
import {
  Grid,
  GridItem,
  IconButton,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
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
          padding={{ base: 3, md: 0 }}
          zIndex={1}
          position="absolute"
          background="white"
          width={screenWidth}
        >
          {useBreakpointValue({
            base: (
              <SearchBar
                name="home-search"
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
        </Box>
        {useBreakpointValue({
          base: (
            <Box
              paddingBottom={5}
              marginTop={16}
              height={{ md: "50vh" }}
              width={{ md: "50vw" }}
            >
              <BonusCarousel />
            </Box>
          ),
          md: (
            <Grid templateColumns="repeat(5, 1fr)" gap={6} marginBottom={5}>
              <GridItem colSpan={1} bg="papayawhip">
                <Text fontSize="4xl">
                  Please open the app using your phone if you are not an admin,
                  <br />
                  <br />
                  our app is designed using mobile-first principle and the web
                  app is purely designated for admin
                </Text>
              </GridItem>
              <GridItem colSpan={3} bg="papayawhip">
                <BonusCarousel />
              </GridItem>
              <GridItem colSpan={1} bg="tomato">
                <Text fontSize="4xl">
                  Please install the app by adding to homescreen on the phone if
                  you are prompted too
                </Text>
              </GridItem>
            </Grid>
          ),
        })}
        <Flex direction="row" justify="space-around" align="center" wrap="wrap">
          <VStack>
            <IconButton
              isRound
              size={"lg"}
              icon={<FontAwesomeIcon icon={faVolleyballBall} />}
              aria-label="sport"
              onClick={() => {
                router.push({
                  pathname: "/explore",
                  query: {
                    keyword: "sport",
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
