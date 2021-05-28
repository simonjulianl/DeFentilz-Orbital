import { Button, Image, Modal, useDisclosure } from "@chakra-ui/react";
import { Flex, Box, HStack } from "@chakra-ui/layout";

import GeneralButton from "~/components/Button/Button";
import signinModal from "~/components/SignInModal/SignInModal";
import signupModal from "~/components/SignUpModal/SignUpModal";
import requestpwdModal from "~/components/ReqPwdModal/ReqPwdModal";
import {NavDrawerButton} from "~/components/NavDrawer/NavDrawer";
import NavDrawer from "~/components/NavDrawer/NavDrawer";
import { GenButtonInterface } from "~/interfaces/GeneralButtonInterface";

import { useRouter } from "next/router";
import { useState } from "react";
import { useAuth } from "~/firebase/auth";
import authHandlers from "~/firebase/authHandlers";

import { faUserPlus, faSignInAlt, faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  navButtons: GenButtonInterface[];
  isNotMobile: boolean;
}

function Header({ navButtons, isNotMobile} : Props) {
  const router = useRouter();
  const authContext = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ errorCode: null, errorMessage: null });

  const {
    isOpen: isOpenLogin,
    onOpen: onOpenLogin,
    onClose: onCloseLoginTemp,
  } = useDisclosure();
  const {
    isOpen: isOpenSignup,
    onOpen: onOpenSignup,
    onClose: onCloseSignupTemp,
  } = useDisclosure();
  const {
    isOpen: isOpenPwd,
    onOpen: onOpenPwd,
    onClose: onClosePwdTemp,
  } = useDisclosure();
  const {
    isOpen: isOpenDrawer, 
    onOpen: onOpenDrawer,
    onClose: onCloseDrawer,
  } = useDisclosure();

  const resetError = () => setError({ errorCode: null, errorMessage: null });
  const onCloseLogin = () => {
    resetError();
    onCloseLoginTemp();
  };
  const onCloseSignup = () => {
    resetError();
    onCloseSignupTemp();
  };
  const onClosePwd = () => {
    resetError();
    onClosePwdTemp();
  };

  const hookVars = { name, email, password, error };
  const settersObject = { setName, setEmail, setPassword, setError };
  const modalCallbacks = {
    onOpenLogin,
    onCloseLogin,
    onOpenSignup,
    onCloseSignup,
    onOpenPwd,
    onClosePwd,
    onCloseDrawer,
  };
  const handlerObject = authHandlers(
    hookVars,
    settersObject,
    modalCallbacks,
    authContext,
    router
  );

  return (
    <>
      <Flex justify="space-between" align="center" bgColor="red.800">
        <Button paddingLeft={[5, 10]} variant="link" onClick={() => router.push("/")}>
          <Image src="/4.png" fit="contain" alt="BoNUS Logo" boxSize="100px"/>
        </Button>
        <NavDrawer
          navButtons={ navButtons }
          onCloseDrawer={onCloseDrawer}
          isOpenDrawer={isOpenDrawer}
          onOpenLogin={onOpenLogin}
          onOpenSignup={onOpenSignup}
          logOutHandler={handlerObject.logOutHandler} />
        <Box paddingRight={5} justifyContent="space-around" align="center">
          {
            isNotMobile 
            ? (
              authContext.auth ? (
                <HStack>
                  { GeneralButton(
                        { 
                        label: "Log Out",
                        path: null,
                        icon: <FontAwesomeIcon icon={faSignOutAlt}/>
                        },
                        handlerObject.logOutHandler,
                        router
                  )}
                </HStack>
                ) : (
                <HStack justifyContent="space-between">
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
                </HStack>
              )
            )
            : (
              <NavDrawerButton onOpenDrawer={onOpenDrawer}/>
            )
          }
          <Modal isOpen={isOpenLogin} onClose={onCloseLogin}>
          {signinModal(
            isOpenLogin,
            onCloseLogin,
            handlerObject,
            hookVars
          )}
        </Modal>
        <Modal isOpen={isOpenSignup} onClose={onCloseSignup}>
          {signupModal(
            isOpenSignup,
            onCloseSignup,
            handlerObject,
            hookVars
          )}
        </Modal>
        <Modal isOpen={isOpenPwd} onClose={onClosePwd}>
          {requestpwdModal(
            isOpenPwd,
            onClosePwd,
            handlerObject,
            hookVars
          )}
        </Modal>
        </Box>
      </Flex>
    </>
  );
};
export default Header;
