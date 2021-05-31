import Layout from "~/components/Layout/Layout";
import SearchBar  from "~/components/SearchBar/SearchBar";

import { VStack, Box, Flex, Center} from "@chakra-ui/layout"
import { HStack, Image, useMediaQuery } from "@chakra-ui/react"
import { IconButton, Text } from "@chakra-ui/react"

import { faVolleyballBall, faHandshake, faBook, faFilm } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ExploreView = () => {
  const [isNotMobile, isDisplayingInBrowser] = useMediaQuery([
    "(min-width: 768px)",
    "(display-mode: browser)",
  ]);

  return (
      <Layout>
          <Flex justify="center" paddingTop={[2, 2, 4, 5]} paddingBottom={[2, 2, 4, 5]}>
            <SearchBar isNotMobile={isNotMobile}></SearchBar>
          </Flex>
          <Flex justify="space-around" wrap="wrap">
            <VStack>
              <IconButton isRound size={"lg"} icon={<FontAwesomeIcon icon={faVolleyballBall}/>} aria-label="sports"/>
              <Text align="center" width={["50px", "70px", "100px", "150px"]} fontSize={["xs", "sm", "lg"]}>Sports Facilities</Text>
            </VStack>
            <VStack>
              <IconButton isRound size="lg" icon={<FontAwesomeIcon icon={faHandshake}/>} aria-label="meeting" />
              <Text align="center" width={["50px", "70px", "100px", "150px"]} fontSize={["xs", "sm", "lg"]}>Meeting Rooms</Text>
            </VStack>
            <VStack>
              <IconButton isRound size="lg" icon={<FontAwesomeIcon icon={faBook}/>} aria-label="study" />
              <Text align="center" width={["50px", "70px", "100px", "150px"]} fontSize={["xs", "sm", "lg"]}>Study Rooms</Text>
            </VStack>
          </Flex>
          {/* Placeholder For Carousel or Something */}
          <Center paddingTop={[2, 5, 10]}>
            <Image
            width={["17em", "20em", "42em", "58em", "80em"]}
            height={["8.5em", "10em", "21em", "29em", "40em"]}
            objectFit="cover"
            src="gibberish.png"
            fallbackSrc="https://via.placeholder.com/350x150" />
          </Center>
      </Layout>
      );
}

export default ExploreView;
