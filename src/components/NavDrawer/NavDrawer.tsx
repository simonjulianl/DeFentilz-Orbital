import { useAuth } from "~/firebase/auth";
import { useRouter } from "next/router";

import { VStack } from "@chakra-ui/layout";
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useMediaQuery,
    IconButton,
  } from "@chakra-ui/react"
import GeneralButton from "~/components/Button/Button";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  navButtons: { label: string; path: string; icon: any }[];
  onCloseDrawer : () => void;
  isOpenDrawer : boolean;
  onOpenSignup : () => void;
  onOpenLogin : () => void;
}

function NavDrawer({navButtons, onCloseDrawer, isOpenDrawer, onOpenSignup, onOpenLogin} : Props) {
  const { auth } = useAuth();
  const router = useRouter();
  
    return (
        <Drawer placement="left" onClose={onCloseDrawer} isOpen={isOpenDrawer}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerHeader borderBottomWidth="1px">Navigation</DrawerHeader>
                <DrawerBody>
                    {
                        auth ? (
                            <VStack alignItems="flex-start">
                                {navButtons.map(button => GeneralButton(button, () => router.push(button.path), router))}
                            </VStack>
                            )
                            : (
                            <VStack alignItems="flex-start">
                                {/* {navButtons.map(button => GeneralButton(button, () => router.push(button.path), router))} */}
                                {GeneralButton(
                                    {
                                    icon: null,
                                    path: "/signup",
                                    label: "Sign Up",
                                    },
                                    onOpenSignup,
                                    router
                                )}
                                {GeneralButton(
                                    {
                                    icon: null,
                                    path: "/signin",
                                    label: "Log In",
                                    },
                                    onOpenLogin,
                                    router
                                )}
                            </VStack>
                            )
                    }
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    )
}


export const NavDrawerButton = ({onOpenDrawer}) => {
    const [isBig, isDisplayingInBrowser] = useMediaQuery(["(min-width: 768px)", "(display-mode: browser"]);
    const isNotMobile = isBig && isDisplayingInBrowser;
    return isNotMobile ? (<></>) : (
      <IconButton
      icon={<FontAwesomeIcon icon={faBars} />}
      aria-label="Navigation Drawer"
      onClick={() => onOpenDrawer()} />
    )
  
}

export default NavDrawer;
