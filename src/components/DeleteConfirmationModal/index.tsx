import { Alert, AlertIcon, Button, useBreakpointValue } from "@chakra-ui/react";
import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

interface OwnProps {
  message: string;
  messageStatus: "info" | "warning" | "success" | "error", 
  onDelete: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isOpen: boolean;
  onClose: () => void;
}

const DeleteConfirmationModal: React.FC<OwnProps> = ({
  message,
  messageStatus,
  onDelete,
  isOpen,
  onClose,
}) => {
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered={true}
        size={useBreakpointValue({ base: "xs", md: "md", xl: "xl" })}
      >
        <ModalOverlay />
        <ModalContent>
          {
          messageStatus === 'success'
          ? <ModalHeader>Success!</ModalHeader>
          :  <ModalHeader>{messageStatus.toUpperCase()}</ModalHeader>
          }
          <ModalCloseButton />
          <ModalBody>{message}</ModalBody>
          <ModalFooter>
            {
              messageStatus === "info" || messageStatus === "success" || messageStatus === "warning"
              ? <Button colorScheme="teal" mr={3} onClick={onDelete}>
                  {messageStatus === "success" ? "OK" : "Confirm"}
                </Button>
              : <Button colorScheme="red" mr={3} onClick={onDelete}>
                  Return
                </Button>
            }
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteConfirmationModal;
