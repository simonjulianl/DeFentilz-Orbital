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
  useBreakpointValue,
} from "@chakra-ui/react";
import { FormControl, FormLabel, Link, Input } from "@chakra-ui/react";
import { FaGoogle } from "react-icons/fa";
import { EmailIcon } from "@chakra-ui/icons";
import {
  emailSignInHandler,
  errorObj,
  googleSignInHandler,
  hookVars,
  onChangeHandler,
  toReqPwdHandler,
  toSignUpHandler,
} from "~/firebase/authHandlersInterface";
import React, { useEffect, useState } from "react";
import Alert from "~/components/BonusAlert/BonusAlert";
import { useAuth } from "~/firebase/auth";

interface OwnProps {
  isOpen: boolean;
  onClose: () => void;
  hookVars: hookVars;
  onChangeHandler: onChangeHandler;
  toReqPwdHandler: toReqPwdHandler;
  toSignUpHandler: toSignUpHandler;
  emailSignInHandler: emailSignInHandler;
  googleSignInHandler: googleSignInHandler;
  error: errorObj;
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
  error,
}) => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const authContext = useAuth();
  useEffect(() => {
    if (authContext.auth || error) {
      setLoading(false);
    }
  }, [authContext.auth, error]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={useBreakpointValue({ base: "xs", md: "md", xl: "xl" })}
      isCentered={true}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Sign In</ModalHeader>
        <ModalCloseButton isDisabled={isLoading} />
        <ModalBody>
          <FormControl pb="3" id="userEmail" isRequired>
            <FormLabel>NUS Email address</FormLabel>
            <Input
              type="email"
              placeholder="E.g: Maruq123@u.nus.edu"
              onChange={(event) => onChangeHandler(event)}
              isDisabled={isLoading}
            />
          </FormControl>
          <FormControl pb="3" id="userPassword" isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              onChange={(event) => onChangeHandler(event)}
              isDisabled={isLoading}
            />
          </FormControl>
          <Flex justifyContent="space-between">
            <Link
              pb="3"
              color="blue.600"
              onClick={() => {
                toReqPwdHandler();
              }}
            >
              Forgot Password?
            </Link>
            <Link
              color="blue.600"
              onClick={() => {
                toSignUpHandler();
              }}
            >
              Create an account
            </Link>
          </Flex>
          <Stack w="100%" justifyContent="center">
            <Button
              leftIcon={<EmailIcon />}
              colorScheme="blue"
              onClick={(event) => {
                setLoading(true);
                emailSignInHandler(event);
              }}
              isDisabled={isLoading}
            >
              Log In
            </Button>
            <Button
              leftIcon={<FaGoogle />}
              colorScheme="red"
              onClick={(event) => {
                setLoading(true);
                googleSignInHandler(event);
              }}
              isDisabled={isLoading}
            >
              Log In With Google
            </Button>
          </Stack>
        </ModalBody>
        <ModalFooter>
          {hookVars.error ? (
            <Alert status={"error"} code={hookVars.error.code} />
          ) : (
            <></>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SignInModal;
