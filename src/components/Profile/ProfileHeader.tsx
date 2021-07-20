import React from "react";
import { chakra } from "@chakra-ui/react";
import { HStack, Text, Box, VStack, Button } from "@chakra-ui/react";

import ProfileAvatar from "~/components/Profile/ProfileAvatar";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface OwnProps {
  // To be fetched from the page
  displayName: string;
  photoUrl: string;
  email: string;
  walletValue: number;
  showWallet: boolean;
  disableTopUp?: boolean;
  onTopUp?: () => void;
}

const ProfileHeader: React.FC<OwnProps> = ({
  displayName,
  photoUrl,
  walletValue,
  showWallet,
  disableTopUp,
  onTopUp,
}) => {
  return (
    <Box mb={5}>
      <VStack paddingX={[5]} justifyContent="space-between">
        <ProfileAvatar photoUrl={photoUrl} />
        <HStack>
          <Text fontSize="xl">Welcome back,</Text>
          <Text aria-label="Display Name" fontSize="xl" fontWeight="extrabold">
            {" "}
            {displayName}!{" "}
          </Text>
        </HStack>
        <VStack lineHeight="1">
          {showWallet ? (
            <Text aria-label="Wallet Value" fontSize="4xl">
              {" "}
              SG${walletValue}{" "}
            </Text>
          ) : (
            <></>
          )}
          <Button
            colorScheme="teal"
            aria-label={"topup"}
            onClick={onTopUp}
            leftIcon={<FontAwesomeIcon icon={faPlusCircle} />}
            isDisabled={disableTopUp}
          >
            Top Up
          </Button>
        </VStack>
      </VStack>
    </Box>
  );
};

export default chakra(ProfileHeader);
