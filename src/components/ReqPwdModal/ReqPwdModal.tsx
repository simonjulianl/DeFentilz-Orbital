import {
    Button,
    Stack,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
  } from "@chakra-ui/react";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { EmailIcon } from "@chakra-ui/icons";
import ErrorAlert from "~/components/ErrorAlert/errorAlert";


type closeModalCallback = {
    (): void;
    (): void;
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
};

function requestpwdModal(
    isOpen: boolean,
    onClose: closeModalCallback,
    handlers,
    hookVars: any
) {
return (
    <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
        <ModalHeader>Request Password Change</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
        <FormControl pb="3" id="userEmail" isRequired>
            <FormLabel>Email address of Account</FormLabel>
            <Input
            type="email"
            placeholder="E.g: faruq123@yahoo.com"
            onChange={(event) => handlers.onChangeHandler(event)}
            />
        </FormControl>
        <Stack w="100%" justifyContent="center">
            <Button
            leftIcon={<EmailIcon />}
            colorScheme="blue"
            onClick={(event) => handlers.changePasswordHandler(event)}
            >
            Request Password Change
            </Button>
        </Stack>
        </ModalBody>
        <ModalFooter>
            {hookVars.error.errorCode != null && ErrorAlert({status: 'error', error: hookVars.error})}
            {hookVars.successChange != null && ErrorAlert({status: 'success', error: {errorCode: null, errorMessage: "We have sent a password change link to the above email!"}})}
        </ModalFooter>
    </ModalContent>
    </Modal>
);
}
  export default requestpwdModal;
  