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
import Alert from "~/components/BonusAlert/BonusAlert";

import {
  changePasswordHandler,
  hookVars,
  onChangeHandler,
} from "~/firebase/authHandlersInterface";

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
    <Modal isOpen={isOpen} onClose={onClose} size="xs" isCentered={true}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Request Password Change</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl pb="3" id="userEmail" isRequired>
            <FormLabel>NUS Email address of Account</FormLabel>
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
          {
            hookVars.success && hookVars.success.code === 'password-change-successful'
            ? <Alert status={"success"} code={hookVars.success.code} />
            : hookVars.error
            ? <Alert status={"error"} code={hookVars.error.code} />
            : <></>
          }
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ReqPwdModal;
