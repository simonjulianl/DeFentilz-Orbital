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
  errorObj,
  hookVars,
  onChangeHandler,
} from "~/firebase/authHandlersInterface";
import { useEffect, useState } from "react";

interface OwnProps {
  isOpen: boolean;
  onClose: () => void;
  hookVars: hookVars;
  onChangeHandler: onChangeHandler;
  changePasswordHandler: changePasswordHandler;
  error: errorObj;
}

const ReqPwdModal: React.FC<OwnProps> = ({
  isOpen,
  onClose,
  hookVars,
  onChangeHandler,
  changePasswordHandler,
  error,
}) => {
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(false);
  }, [hookVars.error, hookVars.success]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xs" isCentered={true}>
      <ModalOverlay />
      <ModalContent aria-label="request_pwd_modal">
        <ModalHeader>Request Password Change</ModalHeader>
        <ModalCloseButton isDisabled={isLoading} />
        <ModalBody>
          <FormControl pb="3" id="userEmail" isRequired>
            <FormLabel>NUS Email address of Account</FormLabel>
            <Input
              type="email"
              placeholder="E.g: faruq123@yahoo.com"
              onChange={(event) => onChangeHandler(event)}
              isDisabled={isLoading}
            />
          </FormControl>
          <Stack w="100%" justifyContent="center">
            <Button
              leftIcon={<EmailIcon />}
              colorScheme="blue"
              onClick={(event) => {
                setLoading(true);
                changePasswordHandler(event);
              }}
              isDisabled={isLoading}
            >
              Request Password Change
            </Button>
          </Stack>
        </ModalBody>
        <ModalFooter>
          {hookVars.success &&
          hookVars.success.code === "password-change-successful" ? (
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

export default ReqPwdModal;
