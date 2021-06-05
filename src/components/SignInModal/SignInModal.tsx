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
  ModalOverlay,
  Box,
} from "@chakra-ui/react";
import { FormControl, FormLabel, Link, Input } from "@chakra-ui/react";
import { FaGoogle } from "react-icons/fa";
import { EmailIcon } from "@chakra-ui/icons";
import {
  emailSignInHandler,
  googleSignInHandler,
  hookVars,
  onChangeHandler,
  toReqPwdHandler,
  toSignUpHandler,
} from "~/firebase/authHandlersInterface";
import React from "react";
import Alert from "../BonusAlert/BonusAlert";

interface OwnProps {
  isOpen: boolean;
  onClose: () => void;
  hookVars: hookVars;
  onChangeHandler: onChangeHandler;
  toReqPwdHandler: toReqPwdHandler;
  toSignUpHandler: toSignUpHandler;
  emailSignInHandler: emailSignInHandler;
  googleSignInHandler: googleSignInHandler;
}

const SignInModal: React.FC<OwnProps> = ({
  isOpen,
  onClose,
  hookVars,
  onChangeHandler,
  toReqPwdHandler,
  toSignUpHandler,
  emailSignInHandler,
  googleSignInHandler,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xs">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Sign In</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl
            pb="3"
            id="userEmail"
            isRequired
            onSubmit={() => console.log("Submitted")}
          >
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              placeholder="E.g: Maruq123@u.nus.edu"
              onChange={(event) => onChangeHandler(event)}
            />
          </FormControl>
          <FormControl pb="3" id="userPassword" isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              onChange={(event) => onChangeHandler(event)}
            />
          </FormControl>
          <Flex justifyContent="space-between">
            <Link
              pb="3"
              color="blue.600"
              onClick={() => toReqPwdHandler()} // Find a better way to do this
            >
              Forgot Password?
            </Link>
            <Link color="blue.600" onClick={() => toSignUpHandler()}>
              Create an account
            </Link>
          </Flex>
          <Stack w="100%" justifyContent="center">
            <Button
              leftIcon={<EmailIcon />}
              colorScheme="blue"
              onClick={(event) => {
                console.log("Submitted by Clicking");
                emailSignInHandler(event);
              }}
            >
              Log In
            </Button>
            <Button
              leftIcon={<FaGoogle />}
              colorScheme="red"
              onClick={(event) => googleSignInHandler(event)}
            >
              Log In With Google
            </Button>
          </Stack>
        </ModalBody>
        <ModalFooter>
          {hookVars.error.errorCode && (
            <Alert status={"error"} code={hookVars.error.errorCode} />
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SignInModal;
