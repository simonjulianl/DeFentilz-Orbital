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
  useBreakpointValue,
  NumberInput,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  NumberInputField,
  Alert,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/react";
import { errorObj } from "~/firebase/authHandlersInterface";
import React, { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";

interface OwnProps {
  isOpen: boolean;
  onClose: () => void;
  getTopUpConfig: (topUpValue: number) => AxiosRequestConfig;
}

const TopUpModal: React.FC<OwnProps> = ({
  isOpen,
  onClose,
  getTopUpConfig,
}) => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [topUpValue, setTopUpValue] = useState<number>(10);
  const [error, setError] = useState<errorObj>(null);

  useEffect(() => {
    if (error) {
      setLoading(false);
    }
  }, [error, isLoading]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        setError(null);
      }}
      size={useBreakpointValue({ base: "xs", md: "md", xl: "xl" })}
      isCentered={true}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Top Up Wallet</ModalHeader>
        <ModalCloseButton isDisabled={isLoading} />
        <ModalBody>
          <FormControl pb="3" id="topUpValue" isRequired>
            <FormLabel>{"Amount to add to your wallet"}</FormLabel>
            <NumberInput
              defaultValue={10.0}
              precision={2}
              step={0.05}
              onChange={(_: string, valueAsNumber: number) => {
                setTopUpValue(valueAsNumber);
              }}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <Stack w="100%" justifyContent="center">
            <Button
              data-cy="topup-button"
              colorScheme="teal"
              onClick={(event) => {
                event.preventDefault();
                // Prevent topping up again if successful:
                if (error && error.code === "200") {
                  setError({
                    code: "200",
                    message: "Request sent to top up",
                  });
                }
                const config = getTopUpConfig(topUpValue);

                setLoading(true);
                axios(config)
                  .then((response) => {
                    console.log(response);
                    if (response.status < 300) {
                      setError({
                        code: "200",
                        message: "Top Up Request Sent!",
                      });
                      setTimeout(() => {
                        setError(null);
                        onClose();
                      }, 1000);
                    } else if (response.status >= 400) {
                      setError({
                        code: response.statusText,
                        message: response.data.message,
                      });
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                    setError({
                      code: "400",
                      message: "error in sending top up",
                    });
                  })
                  .finally(() => setLoading(false));
              }}
              isLoading={isLoading}
              isDisabled={isLoading}
            >
              Top Up
            </Button>
          </Stack>
        </ModalBody>
        <ModalFooter>
          {error ? (
            <Alert status={error.code === "200" ? "success" : "error"}>
              <AlertIcon />
              <AlertTitle>{error.message}</AlertTitle>
            </Alert>
          ) : (
            <></>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TopUpModal;
