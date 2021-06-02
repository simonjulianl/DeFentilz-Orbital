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
} from "@chakra-ui/react";

import GeneralButton from "~/components/Button/Button";
import { GenButtonInterface } from "~/interfaces/GeneralButtonInterface";

import {
  faBars,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  onCloseDrawer: () => void;
  isOpenDrawer: boolean;
  onOpenSignup: () => void;
  onOpenLogin: () => void;
  logOutHandler: () => void;
}

function NavDrawer({
  onCloseDrawer,
  isOpenDrawer,
  onOpenSignup,
  onOpenLogin,
  logOutHandler,
}: Props) {
  const { auth } = useAuth();
  const router = useRouter();

  return (
    <Drawer placement="right" onClose={onCloseDrawer} isOpen={isOpenDrawer}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader borderBottomWidth="1px">Navigation</DrawerHeader>
        <DrawerBody>
          {auth ? (
            <VStack alignItems="flex-start">
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
              {/* {GeneralButton(
                {
                  label: "Sign Up",
                  path: "/signup",
                  icon: <FontAwesomeIcon icon={faUserPlus} />,
                  color: "black",
                  bgColor: "white",
                },
                onOpenSignup,
                router
              )} */}
              {/* {GeneralButton(
                {
                  label: "Log In",
                  path: "/signin",
                  icon: <FontAwesomeIcon icon={faSignInAlt} />,
                  color: "black",
                  bgColor: "white",
                },
                onOpenLogin,
                router
              )} */}
            </VStack>
          )}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

export const NavDrawerButton = ({ onOpenDrawer }) => {
  return (
    <IconButton
      icon={<FontAwesomeIcon icon={faBars} />}
      aria-label="Navigation Drawer"
      onClick={() => onOpenDrawer()}
    />
  );
};

export default NavDrawer;
