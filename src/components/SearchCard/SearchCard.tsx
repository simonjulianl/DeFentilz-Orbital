import { StarIcon } from "@chakra-ui/icons";
import { Box, Center, Text, VStack, Spinner, Badge, HStack, Spacer, Icon } from "@chakra-ui/react";
import { Heading, Flex, Image, Button} from "@chakra-ui/react";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import React from "react";

interface OwnProps {
  name: string,
  type: string, 
  description: string, 
  image: string,
  location: string
  rating: number
}

const SearchCard: React.FC<OwnProps> = ({name, type, description, image, location, rating}) => {
  const router = useRouter();

  return (
    <Box
      width={["xs", null, "sm", "md"]}
      height={["xs", null, "sm", "md"]}
      borderWidth={"1px"}
      borderRadius="xl"
      overflow="hidden">
      <Flex
      direction="row"
      >
        <Box width={'100%'} height={'100%'}>
          <Image
            width={"100%"}
            height={"100%"}
            objectFit="fill"
            src={image}
            alt={name}
            fallback={
              <Spinner />
            }
          />
          
          <Box p="3">
            <HStack justify={"space-between"}>
              <Box>
                <Box
                fontWeight="semibold"
                as="h4"
                lineHeight="tight"
                isTruncated
                d="flex"
                alignItems="baseline"
                >
                  {name}
                </Box>
                <HStack justify={"space-around"}>
                  <Box d="flex" alignSelf="baseline">
                    <Badge borderRadius="lg" px="2" colorScheme="red">
                      {location}
                    </Badge>
                  </Box>
                  <Box d="flex" alignSelf="baseline">
                    <Badge borderRadius="lg" px="2" colorScheme="green">
                      {type}
                    </Badge>
                  </Box>
                </HStack>
                <HStack justify={"space-around"} mt="1">
                  {
                    Array(5)
                    .fill("")
                    .map((_, i) => (
                      <StarIcon
                        key={i}
                        color={i < rating ? "teal.500" : "gray.300"}
                      />
                    ))
                  }
                </HStack>
              </Box>
              <Button colorScheme="teal" onClick={() => router.push('/booking')}>
                Book Now!
              </Button>
            </HStack>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default SearchCard;
