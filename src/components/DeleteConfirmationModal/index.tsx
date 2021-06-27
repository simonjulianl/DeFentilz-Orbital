import { Button, useBreakpointValue, useDisclosure } from "@chakra-ui/react";
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
  onDelete: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isOpen: boolean;
  onClose: () => void;
}

const DeleteConfirmationModal: React.FC<OwnProps> = ({
  message,
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
          <ModalHeader>Confirmation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{message}</ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onDelete}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteConfirmationModal;
