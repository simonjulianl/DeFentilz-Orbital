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
  useBreakpointValue,
} from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  Link,
  Input,
  FormHelperText,
} from "@chakra-ui/react";
import { EmailIcon } from "@chakra-ui/icons";
import React from "react";
import {
  hookVars,
  emailSignInHandler,
  onChangeHandler,
  toLoginHandler,
} from "~/firebase/authHandlersInterface";
import Alert from "~/components/BonusAlert/BonusAlert";

interface OwnProps {
  isOpen: boolean;
  onClose: () => void;
  hookVars: hookVars;
  onChangeHandler: onChangeHandler;
  toLoginHandler: toLoginHandler;
  emailSignUpHandler: emailSignInHandler;
}

const SignUpModal: React.FC<OwnProps> = ({
  isOpen,
  onClose,
  hookVars,
  onChangeHandler,
  toLoginHandler,
  emailSignUpHandler,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={useBreakpointValue({ base: "xs", md: "md", xl: "xl" })}
      isCentered={true}
    >
      <ModalOverlay />
      <ModalContent aria-label="sign-up-modal">
        <ModalHeader>Sign Up</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl pb="3" id="displayName" isRequired>
            <FormLabel>Display Name</FormLabel>
            <Input
              type="string"
              placeholder="E.g: Maruq"
              onChange={(event) => onChangeHandler(event)}
            />
          </FormControl>
          <FormControl pb="3" id="userEmail" isRequired>
            <FormLabel>NUS Email address</FormLabel>
            <Input
              type="email"
              placeholder="E.g: Maruq123@u.nus.edu"
              onChange={(event) => onChangeHandler(event)}
            />
            <FormHelperText>
              {'Please use your email address ending with "u.nus.edu"'}
            </FormHelperText>
          </FormControl>
          <FormControl pb="3" id="userPassword" isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              onChange={(event) => onChangeHandler(event)}
            />
          </FormControl>
          <Flex justifyContent="space-between">
            <Link color="blue.600" onClick={() => toLoginHandler()}>
              Have an account? Login instead
            </Link>
          </Flex>
          <Stack w="100%" justifyContent="center">
            <Button
              leftIcon={<EmailIcon />}
              colorScheme="blue"
              onClick={(event) => emailSignUpHandler(event)}
            >
              Sign Up
            </Button>
          </Stack>
        </ModalBody>
        <ModalFooter>
          {hookVars.success && hookVars.success.code === "signup-successful" ? (
            <Alert status={"success"} code={hookVars.success.code} />
          ) : hookVars.error ? (
            <Alert status={"error"} code={hookVars.error.code} />
          ) : (
            <></>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SignUpModal;
