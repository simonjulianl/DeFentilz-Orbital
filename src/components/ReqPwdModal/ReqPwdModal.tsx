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
import Alert from "../BonusAlert/BonusAlert";

import {
  changePasswordHandler,
  hookVars,
  onChangeHandler,
} from "~/firebase/authHandlersInterface";
import { PASSWORD_CHANGE_SUCCESS } from "../BonusAlert/AlertConfig";

interface OwnProps {
  isOpen: boolean;
  onClose: () => void;
  hookVars: hookVars;
  onChangeHandler: onChangeHandler;
  changePasswordHandler: changePasswordHandler;
}

const ReqPwdModal: React.FC<OwnProps> = ({
  isOpen,
  onClose,
  hookVars,
  onChangeHandler,
  changePasswordHandler,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xs">
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
              onChange={(event) => onChangeHandler(event)}
            />
          </FormControl>
          <Stack w="100%" justifyContent="center">
            <Button
              leftIcon={<EmailIcon />}
              colorScheme="blue"
              onClick={(event) => changePasswordHandler(event)}
            >
              Request Password Change
            </Button>
          </Stack>
        </ModalBody>
        <ModalFooter>
          {hookVars.error.errorCode && (
            <Alert status={"error"} code={hookVars.error.errorCode} />
          )}
          {hookVars.error.errorCode != null && (
            <Alert status={"success"} code={PASSWORD_CHANGE_SUCCESS} />
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ReqPwdModal;
