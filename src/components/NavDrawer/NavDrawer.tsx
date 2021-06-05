import { useAuth } from "~/firebase/auth";
import { useRouter } from "next/router";
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
  faBars,
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
              <Button>Log Out</Button>
              {/* {GeneralButton(
                {
                  label: "Log Out",
                  path: null,
                  icon: <FontAwesomeIcon icon={faSignOutAlt} />,
                  color: "black",
                  bgColor: "white",
                },
                logOutHandler,
                router
              )} */}
            </VStack>
          ) : (
            <VStack alignItems="flex-start">
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
