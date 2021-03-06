import { StarIcon } from "@chakra-ui/icons";
import { Box, Flex, HStack } from "@chakra-ui/react";
import { Text, Spinner, Badge, Image, useDisclosure } from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";

import SearchCardModal from "~/components/SearchCardModal/SearchCardModal";

export interface OwnProps {
  id: number;
  name: string;
  type: string;
  description: string;
  image: string;
  location: string;
  rating: number;
  showModal?: boolean;
}

const SearchCard: React.FC<OwnProps> = ({
  id,
  name,
  type,
  description,
  image,
  location,
  rating,
  showModal = true,
}) => {
  const [error, setError] = useState(false);

  useEffect(() => {
    // empty arrow function
  }, [error]);

  const { isOpen: isOpen, onOpen: onOpen, onClose: onClose } = useDisclosure();

  return (
    <Box
      minHeight={"25vh"}
      width={["2xs", "2xs", "sm"]}
      borderWidth={"1px"}
      borderRadius="xl"
      overflow="hidden"
      onClick={() => showModal && onOpen()}
      shadow="xl"
      data-cy="search-card"
    >
      <Flex direction="row">
        <Box width={"100%"} height={"100%"}>
          <Image
            width={"100%"}
            height={"100%"}
            objectFit="fill"
            src={error ? "/notAvail.png" : image}
            alt={name}
            fallback={<Spinner />}
            onError={() => setError(true)}
          />

          <Box p="3">
            <HStack justify={"space-between"}>
              <Box>
                <Box
                  fontWeight="semibold"
                  as="h4"
                  lineHeight="tight"
                  d="flex"
                  alignItems="baseline"
                >
                  <Text noOfLines={2} fontSize={["sm", "md", "xl"]}>
                    {name}
                  </Text>
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
              </Box>
              <HStack fontSize="md" letterSpacing="tight" spacing="1">
                <Text paddingTop="1.5">
                  {" "}
                  {rating === null ? "No Rating Yet" : rating}{" "}
                </Text>
                {rating === null ? (
                  <></>
                ) : (
                  <StarIcon viewBox="0 0 24 24" color="yellow.400" />
                )}
              </HStack>
            </HStack>
          </Box>
        </Box>
      </Flex>
      <SearchCardModal
        isOpen={isOpen}
        onClose={onClose}
        id={id}
        name={name}
        type={type}
        description={description}
        image={image}
        location={location}
        rating={rating}
      />
    </Box>
  );
};

export default SearchCard;
