import { Image, Modal, useDisclosure } from "@chakra-ui/react";
import { Flex, Box, HStack } from "@chakra-ui/layout";

import GeneralButton from "~/components/Button/Button";
import signinModal from "~/components/SignInModal/SignInModal";
import signupModal from "~/components/SignUpModal/SignUpModal";

import { useRouter } from "next/router";
import { useState } from "react";
import { useAuth } from "~/firebase/auth";
import authHandlers from "~/firebase/authHandlers";
import requestpwdModal from "../ReqPwdModal/ReqPwdModal";

const Header: React.FC<{}> = () => {
  const router = useRouter();
  const authContext = useAuth();
  const [name, setName ] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({errorCode: null, errorMessage: null});
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
  const resetError = () => setError({errorCode: null, errorMessage: null});
  const onCloseLogin = () => { resetError(); onCloseLoginTemp(); }
  const onCloseSignup = () => { resetError(); onCloseSignupTemp(); }
  const onClosePwd = () => { resetError(); onClosePwdTemp(); }

  const hookVars = {name, email, password, error};
  const settersObject = {setName, setEmail, setPassword, setError};
  const modalCallbacks = { onOpenLogin, onCloseLogin, onOpenSignup, onCloseSignup, onOpenPwd, onClosePwd};
  const handlerObject = authHandlers(hookVars, settersObject, modalCallbacks, authContext, router); 

  return (
    <>
      <Flex justify="space-between" align="center" bgColor="red.800">
        <Box
          paddingLeft={10}
          paddingRight={10}
          onClick={() => router.push("/")}
          as="button"
        >
          <Image src="/4.png" fit="contain" alt="BoNUS Logo" boxSize="100px" />
        </Box>
        <Box justifyContent="space-around" align="center">
        {authContext.auth ? (
          <HStack paddingRight="5">
            {GeneralButton(
            {label : "Log Out", path : null, icon : null},
            handlerObject.logOutHandler,
            router
          )}
          </HStack>
        ) : (
          <HStack paddingRight="5" justifyContent="space-between">
            {GeneralButton(
              {
                icon : null,
                path: "/signup",
                label: "Sign Up",
              },
              onOpenSignup,
              router
            )}
            {GeneralButton(
              {
                icon : null,
                path: "/signin",
                label: "Log In",
              },
              onOpenLogin,
              router
            )}
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
          </HStack>
        )}
        </Box>
      </Flex>
    </>
  );
};
export default Header;
