import { useAuth } from "~/firebase/auth";
import { VStack } from "@chakra-ui/layout";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  IconButton,
  Button,
} from "@chakra-ui/react";
import {
  faUserPlus,
  faSignInAlt,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface OwnProps {
  onCloseDrawer: () => void;
  isOpenDrawer: boolean;
  onOpenSignup: () => void;
  onOpenLogin: () => void;
  logOutHandler: () => void;
}

/**
 * https://chakra-ui.com/guides/z-index
 * As a general rule, we recommend not exceeding z-index values of more than 1 or 2, and to use stacking contexts to combat more complex stacking issues.
 */
const NavDrawer: React.FC<OwnProps> = ({
  onCloseDrawer,
  isOpenDrawer,
  onOpenSignup,
  onOpenLogin,
  logOutHandler,
}) => {
  const { auth } = useAuth();

  return (
    <Drawer
      placement="right"
      onClose={onCloseDrawer}
      isOpen={isOpenDrawer}
      size="xs"
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader borderBottomWidth="1px">Navigation</DrawerHeader>
        <DrawerBody>
          {auth ? (
            <VStack alignItems="flex-start">
              <Button
                label="log-out"
                leftIcon={<FontAwesomeIcon icon={faSignOutAlt} />}
                color="black"
                bgColor="white"
                onClick={logOutHandler}
              >
                Log Out
              </Button>
            </VStack>
          ) : (
            <VStack alignItems="flex-start" marginTop={15}>
              <Button
                label="sign-up"
                leftIcon={<FontAwesomeIcon icon={faUserPlus} />}
                color="black"
                bgColor="white"
                onClick={onOpenSignup}
              >
                Sign up
              </Button>
              <Button
                label="sign-in"
                leftIcon={<FontAwesomeIcon icon={faSignInAlt} />}
                color="black"
                bgColor="white"
                onClick={onOpenLogin}
              >
                Sign in
              </Button>
            </VStack>
          )}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default NavDrawer;
