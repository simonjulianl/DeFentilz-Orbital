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
import axios, { AxiosRequestConfig } from "axios";
import { Booking, ModalState} from "~/components/Calendar/BookingType";

interface OwnProps {
  isOpen: boolean;
  onClose: () => void;
  onChange: () => void;
  booking: Booking;
  state: ModalState;
}

const BookingModal: React.FC<OwnProps> = ({
  isOpen,
  onClose,
  onChange,
  booking,
  state,
}) => {

    const dateFormat = (date: string) => {
        const options : Intl.DateTimeFormatOptions = {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            hour:'2-digit',
            minute: '2-digit',
            hour12: true}
        return new Intl.DateTimeFormat('en-GB', options).format(new Date(date)).toString();
    }

    const bookConfig: AxiosRequestConfig = {
        method: "post",
        url: encodeURI("https://60c6eb8f19aa1e001769feaf.mockapi.io/bookings"),
        data: {
            startingTime: booking.startingTime,
            endingTime: booking.endingTime,
            facilityId: booking.facilityId,
            userEmail: booking.userEmail            
        },
        timeout: 10000,
    }

    const delConfig: AxiosRequestConfig = {
        method: "delete",
        url: encodeURI("https://60c6eb8f19aa1e001769feaf.mockapi.io/bookings/" + booking.id),
        timeout: 10000,
    }

    const submitBooking = async () => {
        await axios(state === ModalState.Delete ? delConfig : bookConfig)
                .then((response) => console.log("Success"))
                .then(() => onChange())
                .then(() => onClose())
                .catch((error) => console.error(error))
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
            <Text
                fontWeight="semibold"
                as="h4">
                Starting Time
            </Text>
            <Text>
                {booking ? dateFormat(booking.startingTime) : null}
            </Text>
            <Text
                fontWeight="semibold"
                as="h4">
                Ending Time
            </Text>
            <Text>
                {booking ? dateFormat(booking.endingTime) : null}
            </Text>
        </ModalBody>
        <ModalFooter>
            <VStack>
                {state === ModalState.Submit
                ? (
                    <Text fontSize="xs">
                        "Failure to attend confirmed booking will be penalised."
                    </Text>
                )
                : <></>
                }
                <HStack>
                    <Button
                        onClick={onClose}
                        colorScheme={"red"}>
                        Cancel
                    </Button>
                    <Spacer/>
                    <Button
                        onClick={submitBooking}
                        colorScheme={"teal"}>
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
