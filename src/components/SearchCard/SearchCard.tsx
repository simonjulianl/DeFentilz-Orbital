import { Text, Spinner, Badge, Image, useDisclosure } from "@chakra-ui/react";
import { Box, Flex, HStack} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import SearchCardModal from "../SearchCardModal/SearchCardModal";

interface OwnProps {
  name: string,
  type: string, 
  description: string, 
  image: string,
  location: string
  rating: number
}

const SearchCard: React.FC<OwnProps> = ({name, type, description, image, location, rating}) => {
  const {
    isOpen: isOpen,
    onOpen: onOpen,
    onClose: onClose,
  } = useDisclosure();

  return (
    <Box
      width={["2xs", "xs", "sm", "md"]}
      borderWidth={"1px"}
      borderRadius="xl"
      overflow="hidden"
      onClick={() => onOpen()}
      shadow="lg"
      >
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
              </Box>
              <HStack fontSize="md" letterSpacing="tight" spacing="1">
                <Text paddingTop="1.5"> {rating} </Text>
                <StarIcon viewBox="0 0 24 24" color="yellow.400"/>
              </HStack>              
            </HStack>
          </Box>
        </Box>
      </Flex>
      <SearchCardModal
        isOpen={isOpen}
        onClose={onClose}
        name={name}
        type={type} 
        description={description} 
        image={image}
        location={location}
        rating={rating} />
    </Box>
  );
};

export default SearchCard;
