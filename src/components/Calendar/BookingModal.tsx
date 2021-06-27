import {
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalBody,
  ModalFooter,
  HStack,
  Text,
  Heading,
  Button,
  Spacer,
  VStack,
} from "@chakra-ui/react";
import { ModalState } from "~/components/Calendar/BookingType";
import { Booking } from "~/config/interface";

interface OwnProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (booking: Booking) => void;
  onDelete: (booking: Booking) => void;
  booking: Booking;
  state: ModalState;
}

const BookingModal: React.FC<OwnProps> = ({
  isOpen,
  onClose,
  onSubmit,
  onDelete,
  booking,
  state,
}) => {
  const dateFormat = (date: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return new Intl.DateTimeFormat("en-GB", options)
      .format(new Date(date))
      .toString();
  };

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
        <ModalHeader>
          <Heading>
            Confirm {state === ModalState.Delete ? "Delete" : "Booking"}?
          </Heading>
        </ModalHeader>
        <ModalBody>
          <Text fontWeight="semibold" as="h4">
            Starting Time
          </Text>
          <Text>{booking ? dateFormat(booking.startingTime) : null}</Text>
          <Text fontWeight="semibold" as="h4">
            Ending Time
          </Text>
          <Text>{booking ? dateFormat(booking.endingTime) : null}</Text>
        </ModalBody>
        <ModalFooter>
          <VStack>
            {state === ModalState.Submit ? (
              <Text fontSize="xs">
                "Failure to attend confirmed booking will be penalised."
              </Text>
            ) : (
              <></>
            )}
            <HStack>
              <Button onClick={onClose} colorScheme={"red"}>
                Cancel
              </Button>
              <Spacer />
              <Button
                onClick={() => {
                  if (state === ModalState.Delete) {
                    onDelete(booking);
                  } else {
                    onSubmit(booking);
                  }
                  onClose();
                }}
                colorScheme={"teal"}
              >
                {state === ModalState.Delete ? "Delete" : "Book"}
              </Button>
            </HStack>
          </VStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default BookingModal;
