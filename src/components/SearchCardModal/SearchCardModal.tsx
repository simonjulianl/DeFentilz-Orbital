 
import { StarIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalCloseButton, 
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
import axios, { AxiosRequestConfig } from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "~/firebase/auth";

interface OwnProps {
  isOpen: boolean;
  onClose: () => void;
  id: number,
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
  id, 
  name, 
  type, 
  description, 
  image,
  location, 
  rating
}) => {
  const router = useRouter();
  const authContext = useAuth();
  
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
        <ModalCloseButton />
        <ModalHeader marginX="-5" marginY="1.5">
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
          {
            authContext.auth
            ? (
              <Button colorScheme="teal" onClick={() => router.push('/booking')}>
                Book Now!
              </Button>
            )
            : (
              <Button isDisabled>
                Sign In to Book
              </Button>
            )
          }
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SearchCardModal;
