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
  } from "@chakra-ui/react";
  import { FormControl, FormLabel, Link, Input } from "@chakra-ui/react";
  import { FaGoogle } from "react-icons/fa";
  import { EmailIcon } from "@chakra-ui/icons";
  import { NextRouter } from "next/router";
  
  type closeModalCallback = {
    (): void;
    (): void;
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
  };
  
  function requestpwdModal(
    isOpen: boolean,
    onClose: closeModalCallback,
    handlers,
    router : NextRouter
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
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    );
  }
  export default requestpwdModal;
  