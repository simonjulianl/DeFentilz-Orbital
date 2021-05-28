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
          <Flex justify="center" paddingTop={[10, 10]} paddingBottom={[5, 10]}>
            <SearchBar isNotMobile={isNotMobile}></SearchBar>
          </Flex>
          {
          isNotMobile 
          ? <HStack justify="space-around">
              <VStack>
                <IconButton isRound size="lg" label={"Sports"} icon={<FontAwesomeIcon icon={faVolleyballBall}/>} aria-label="sports"/>
                <Text align="center" width={["50px", "200px"]} fontSize={["xs", "md"]}>Sports Facilities</Text>
              </VStack>
              <VStack>
                <IconButton isRound size="lg" icon={<FontAwesomeIcon icon={faHandshake}/>} aria-label="meeting" />
                <Text align="center" width="50px" fontSize="xs">Meeting Rooms</Text>
              </VStack>
              <VStack>
                <IconButton isRound size="lg" icon={<FontAwesomeIcon icon={faBook}/>} aria-label="study" />
                <Text align="center" width="50px" fontSize="xs">Study Rooms</Text>
              </VStack>
            </HStack>
          : (
              <HStack justify="space-around">
                <VStack>
                  <IconButton isRound size="lg" label={"Sports"} icon={<FontAwesomeIcon icon={faVolleyballBall}/>} aria-label="sports"/>
                  <Text align="center" width={["50px", "200px"]} fontSize={["xs", "md"]}>Sports Facilities</Text>
                </VStack>
                <VStack>
                  <IconButton isRound size="lg" icon={<FontAwesomeIcon icon={faHandshake}/>} aria-label="meeting" />
                  <Text align="center" width="50px" fontSize="xs">Meeting Rooms</Text>
                </VStack>
                <VStack>
                  <IconButton isRound size="lg" icon={<FontAwesomeIcon icon={faBook}/>} aria-label="study" />
                  <Text align="center" width="50px" fontSize="xs">Study Rooms</Text>
                </VStack>
              </HStack>
            )
          }
          {/* Placeholder For Carousel or Something */}
          <Center paddingTop={[10, 10]}>
            <Image
            width={["20em", "35em", "50em"]}
            height={["10em", "12.5em", "25em"]}
            objectFit="cover"
            src="gibberish.png"
            fallbackSrc="https://via.placeholder.com/350x150" />
          </Center>
      </Layout>
      );
}

export default ExploreView;
