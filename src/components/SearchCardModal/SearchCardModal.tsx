 
import { StarIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalBody,
  ModalFooter,
  Box, 
  Center,
  HStack, 
  Text,
  Heading,
  Image,
  Spinner, 
  Button,
} from "@chakra-ui/react";

interface OwnProps {
  isOpen: boolean;
  onClose: () => void;
  name: string,
  type: string, 
  description: string, 
  image: string,
  location: string
  rating: number
}

const SearchCardModal: React.FC<OwnProps> = ({
  isOpen,
  onClose,
  name, 
  type, 
  description, 
  image,
  location, 
  rating
}) => {
  return (
    <Modal 
      isOpen={isOpen}
      onClose={onClose}
      size="xs"
      isCentered={true}
      scrollBehavior={"inside"}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader marginX="-5">
          <Image
            borderRadius="lg"
            width={"100%"}
            height={"100%"}
            objectFit="fill"
            src={image}
            alt={name}
            fallback={
              <Spinner />
            }
          />
        </ModalHeader>
        <ModalBody>
        <Center>
          <Heading size="lg">
              {name}
          </Heading>
          </Center>
          <HStack justifyContent="space-between">
            <Box>
              <Text
                mt="3"
                fontWeight="semibold"
                as="h4">
                  Facility Type
              </Text>
              <Text>
                {type}
              </Text>          
            </Box>
            <Box>
              <Text
                mt="3"
                fontWeight="semibold"
                as="h4">
                  Location
              </Text>
              <Text>
                {location}
              </Text>      
            </Box>
            <Box>
              <Text
                mt="3"
                fontWeight="semibold"
                as="h4">
                  Rating
              </Text>
              <Box justifyContent="left">
                {Array(5)
                  .fill("")
                  .map((_, idx) => 
                    <StarIcon
                      key={idx}
                      viewBox="0 0 30 30"
                      color={idx < rating ? "yellow.300" : "gray.300"}
                    />)}    
              </Box>
            </Box>    
          </HStack>
          <Text
            mt="3"
            fontWeight="semibold"
            as="h4">
            About this place
          </Text>
          <Text>
            {description}
          </Text>          
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal">
            Book Now!
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SearchCardModal;
