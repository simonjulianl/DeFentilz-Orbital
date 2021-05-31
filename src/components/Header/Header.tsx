import { Button, Image, Modal, useDisclosure } from "@chakra-ui/react";
import { Flex, Box, HStack, Spacer } from "@chakra-ui/layout";

import signinModal from "~/components/SignInModal/SignInModal";
import signupModal from "~/components/SignUpModal/SignUpModal";
import requestpwdModal from "~/components/ReqPwdModal/ReqPwdModal";

import HeaderButton from "~/components/HeaderButton/HeaderButton";
import { NavDrawerButton } from "~/components/NavDrawer/NavDrawer";
import NavDrawer from "~/components/NavDrawer/NavDrawer";

import { useRouter } from "next/router";
import { useState } from "react";
import { useAuth } from "~/firebase/auth";
import authHandlers from "~/firebase/authHandlers";
import { GenButtonInterface } from "~/interfaces/GeneralButtonInterface";

import {HeaderConfig} from "~/configs/HeaderConfig";

interface Props {
  navButtons: GenButtonInterface[];
  isNotMobile: boolean;
}

function Header({ isNotMobile} : Props) {
  const router = useRouter();
  const authContext = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successChange, setSuccessChange] = useState(undefined);
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

  const hookVars = { name, email, password, error, successChange};
  const settersObject = { setName, setEmail, setPassword, setError, setSuccessChange };
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
        <Button paddingLeft={[2, 5, 10]} variant="link" onClick={() => router.push("/")}>
          <Image src="/4.png" fit="contain" alt="BoNUS Logo" boxSize="100px"/>
        </Button>
        <NavDrawer
          onCloseDrawer={onCloseDrawer}
          isOpenDrawer={isOpenDrawer}
          onOpenLogin={onOpenLogin}
          onOpenSignup={onOpenSignup}
          logOutHandler={handlerObject.logOutHandler} />
        <Spacer />
          {
            isNotMobile 
            ? (
              <Box width={[null,null, "30em", "32em", "40em"]} paddingRight={[2, 5, 10]}>
                <HStack justify="space-between">  
                  {HeaderConfig
                            .filter(button => button.signature != (authContext.auth ? 'signin' : 'logout'))
                            .map((button) => {console.log(button.signature == 'signin'); return HeaderButton(button, 
                                                          () => button.signature != 'signin' && button.signature != 'logout' 
                                                                  ? router.push(button.path)
                                                                  : button.signature == 'signin'
                                                                  ? onOpenLogin()
                                                                  : button.signature == 'logout'
                                                                  ? handlerObject.logOutHandler()
                                                                  : router.push('/errorPage'),
                                                          router)})
                  }
                </HStack>
              </Box>
            )
            : (
              <Box paddingRight={[3, 5]}>
                <NavDrawerButton onOpenDrawer={onOpenDrawer}/>
              </Box>
            )
          }
           </Flex>
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
    </>
  );
};
export default Header;