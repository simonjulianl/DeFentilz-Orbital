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
} from "@chakra-ui/react"
import GeneralButton from "~/components/Button/Button";

import { faBars, faUserPlus, faSignInAlt, faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  navButtons: { label: string; path: string; icon: any }[];
  onCloseDrawer : () => void;
  isOpenDrawer : boolean;
  onOpenSignup : () => void;
  onOpenLogin : () => void;
  logOutHandler : () => void;
}

function NavDrawer({navButtons, onCloseDrawer, isOpenDrawer, onOpenSignup, onOpenLogin, logOutHandler} : Props) {
  const { auth } = useAuth();
  const router = useRouter();
  
    return (
        <Drawer placement="right" onClose={onCloseDrawer} isOpen={isOpenDrawer}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerHeader borderBottomWidth="1px">Navigation</DrawerHeader>
                <DrawerBody>
                    {
                        auth ? (
                            <VStack alignItems="flex-start">
                                { navButtons.map(
                                    button =>
                                    GeneralButton(button, () => router.push(button.path), router))
                                }
                                { GeneralButton(
                                    { 
                                    label: "Log Out",
                                    path: null,
                                    icon: <FontAwesomeIcon icon={faSignOutAlt}/> },
                                    logOutHandler,
                                    router
                                )}
                            </VStack>
                            )
                            : (
                            <VStack alignItems="flex-start">
                                { GeneralButton(
                                    {
                                    label: "Sign Up",
                                    path: "/signup",
                                    icon: <FontAwesomeIcon icon={faUserPlus} />,
                                    },
                                    onOpenSignup,
                                    router
                                )}
                                { GeneralButton(
                                    {
                                    label: "Log In",
                                    path: "/signin",
                                    icon: <FontAwesomeIcon icon={faSignInAlt} />,
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
    return (
      <IconButton
      icon={<FontAwesomeIcon icon={faBars} />}
      aria-label="Navigation Drawer"
      onClick={() => onOpenDrawer()} />
    );
}

export default NavDrawer;
