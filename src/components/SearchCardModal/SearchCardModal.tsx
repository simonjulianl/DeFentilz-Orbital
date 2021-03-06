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
  useBreakpointValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "~/firebase/auth";

interface OwnProps {
  isOpen: boolean;
  onClose: () => void;
  id: number;
  name: string;
  type: string;
  description: string;
  image: string;
  location: string;
  rating: number;
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
  rating,
}) => {
  const router = useRouter();
  const authContext = useAuth();

  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    // setLoading(true);
  }, [error, isLoading]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={useBreakpointValue({ base: "xs", md: "md", xl: "xl" })}
      isCentered={true}
      scrollBehavior={"inside"}
    >
      <ModalOverlay />
      <ModalContent data-cy="search-card-modal">
        <ModalHeader marginX="-5">
          <Center width={"100%"}>
            <ModalCloseButton mt="3" />
            <Image
              borderRadius="lg"
              objectFit="cover"
              src={error ? "/notAvail2.png" : image}
              alt={name}
              fallback={<Spinner />}
              onError={() => setError(true)}
            />
          </Center>
        </ModalHeader>
        <ModalBody>
          <Center>
            <Heading size="lg">{name}</Heading>
          </Center>
          <HStack justifyContent="space-between">
            <Box>
              <Text mt="3" fontWeight="semibold" as="h4">
                Facility Type
              </Text>
              <Text>{type}</Text>
            </Box>
            <Box>
              <Text mt="3" fontWeight="semibold" as="h4">
                Location
              </Text>
              <Text>{location}</Text>
            </Box>
            <Box>
              <Text mt="3" fontWeight="semibold" as="h4">
                Rating
              </Text>
              <Box justifyContent="left">
                {rating === null ? (
                  <Text>{"No Rating"}</Text>
                ) : (
                  Array(5)
                    .fill("")
                    .map((_, idx) => (
                      <StarIcon
                        key={idx}
                        viewBox="0 0 30 30"
                        color={idx < rating ? "yellow.300" : "gray.300"}
                      />
                    ))
                )}
              </Box>
            </Box>
          </HStack>
          <Text mt="3" fontWeight="semibold" as="h4">
            About this place
          </Text>
          <Text>{description}</Text>
        </ModalBody>
        <ModalFooter>
          {authContext.auth ? (
            <Button
              isLoading={isLoading}
              data-cy="sign-in"
              colorScheme="teal"
              onClick={() => {
                setLoading(true);
                router.push({
                  pathname: `/explore/facilities/${id}`,
                });
              }}
            >
              Book Now!
            </Button>
          ) : (
            <Button isDisabled data-cy="sign-in">
              Sign In to Book
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SearchCardModal;
