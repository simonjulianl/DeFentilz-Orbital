import {
  Button,
  Stack,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from "@chakra-ui/react";
import { FormControl, FormLabel, Link, Input } from "@chakra-ui/react";
import { FaGoogle } from "react-icons/fa";
import { EmailIcon } from "@chakra-ui/icons";
import ErrorAlert from "~/components/ErrorAlert/errorAlert";

type closeModalCallback = {
  (): void;
  (): void;
  (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
};

function signinModal(
  isOpen: boolean,
  onClose: closeModalCallback,
  handlers: any, // Lazy make type for this. Refer to authHandlers.tsx for type
  hookVars: any
) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Sign In</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl pb="3" id="userEmail" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              placeholder="E.g: Maruq123@u.nus.edu"
              onChange={(event) => handlers.onChangeHandler(event)}
            />
          </FormControl>
          <FormControl pb="3" id="userPassword" isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              onChange={(event) => handlers.onChangeHandler(event)}
            />
          </FormControl>
          <Flex justifyContent="space-between">
            <Link
              pb="3"
              color="blue.600"
              onClick={() => handlers.toReqPwdHandler()} // Find a better way to do this
            >
              Forgot Password?
            </Link>
            <Link color="blue.600" onClick={() => handlers.toSignupHandler()}>
              Create an account
            </Link>
          </Flex>
          <Stack w="100%" justifyContent="center">
            <Button
              leftIcon={<EmailIcon />}
              colorScheme="blue"
              onClick={(event) => handlers.emailSignInHandler(event)}
            >
              Log In
            </Button>
            <Button
              leftIcon={<FaGoogle />}
              colorScheme="red"
              onClick={(event) => handlers.googleSignInHandler(event)}
            >
              Log In With Google
            </Button>
          </Stack>
        </ModalBody>
        <ModalFooter>
          {hookVars.error.errorCode != null && ErrorAlert({status: 'error', error: hookVars.error})}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
export default signinModal;
