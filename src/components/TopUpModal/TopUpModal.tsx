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
  const [topUpValue, setTopUpValue] = useState<number>(0);
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
                    message: "Your top up was successful",
                  });
                }
                const config = getTopUpConfig(topUpValue);

                setLoading(true);
                axios(config)
                  .then((response) => response.data)
                  .then((response) => {
                    console.log(response.message);
                    if (
                      // TO BE CHANGED
                      response.message ===
                      "Cannot update user with email=amadeus.winarto@u.nus.edu. "
                    ) {
                      setError({
                        code: "500",
                        message: response.message,
                      });
                    } else if (
                      response.message === "User was updated successfully !"
                    ) {
                      setError({
                        code: "200",
                        message: "Top Up Successful!",
                      });
                    }
                  })
                  .catch((error) => console.error(error))
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