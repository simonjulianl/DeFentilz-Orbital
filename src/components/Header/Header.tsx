import { Button, IconButton, Image, useDisclosure } from "@chakra-ui/react";
import { Flex, Box, Spacer } from "@chakra-ui/layout";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useAuth } from "~/firebase/auth";
import authHandlers from "~/firebase/authHandlers";
import NavDrawer from "../NavDrawer/NavDrawer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import SignUpModal from "../SignUpModal/SignUpModal";
import SignInModal from "../SignInModal/SignInModal";
import ReqPwdModal from "../ReqPwdModal/ReqPwdModal";
import { errorObj, successObj } from "~/firebase/authHandlersInterface";

const Header: React.FC<{}> = () => {
  const router = useRouter();
  const authContext = useAuth();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [success, setSuccess] = useState<successObj | null>(null);
  const [error, setError] = useState<errorObj | null>(null);

  // login modal callback state
  const {
    isOpen: isOpenLogin,
    onOpen: onOpenLogin,
    onClose: onCloseLoginTemp,
  } = useDisclosure();

  // signup modal callback state
  const {
    isOpen: isOpenSignup,
    onOpen: onOpenSignup,
    onClose: onCloseSignupTemp,
  } = useDisclosure();

  // password modal callback state
  const {
    isOpen: isOpenPwd,
    onOpen: onOpenPwd,
    onClose: onClosePwdTemp,
  } = useDisclosure();

  // drawer callback state
  const {
    isOpen: isOpenDrawer,
    onOpen: onOpenDrawer,
    onClose: onCloseDrawer,
  } = useDisclosure();

  const resetSuccess = () => setSuccess(null);
  const resetError = () => setError(null);
  const onCloseLogin = () => {
    resetError();
    resetSuccess();
    onCloseLoginTemp();
  };
  const onCloseSignup = () => {
    resetError();
    resetSuccess();
    onCloseSignupTemp();
  };
  const onClosePwd = () => {
    resetError();
    resetSuccess();
    onClosePwdTemp();
  };

  const hookVars = { name, email, password, error, success };
  const settersObject = {
    setName,
    setEmail,
    setPassword,
    setError,
    setSuccess,
  };
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
        <Button
          paddingLeft={[2, 5, 10]}
          variant="link"
          onClick={() => router.push("/")}
        >
          <Image
            marginTop={2}
            marginBottom={2}
            src="/bonus_header.png"
            fit="contain"
            alt="BoNUS Logo"
          />
        </Button>
        <NavDrawer
          onCloseDrawer={onCloseDrawer}
          isOpenDrawer={isOpenDrawer}
          onOpenLogin={onOpenLogin}
          onOpenSignup={onOpenSignup}
          logOutHandler={handlerObject.logOutHandler}
        />
        <Spacer />
        <Box paddingRight={[3, 5]}>
          <IconButton
            icon={<FontAwesomeIcon icon={faBars} />}
            aria-label="Navigation Drawer"
            onClick={() => {
              onCloseLogin();
              onClosePwd();
              onCloseSignup();
              isOpenDrawer ? onCloseDrawer() : onOpenDrawer();
            }}
          />
        </Box>
      </Flex>
      <SignInModal
        isOpen={isOpenLogin}
        onClose={onCloseLogin}
        hookVars={hookVars}
        onChangeHandler={handlerObject.onChangeHandler}
        toReqPwdHandler={handlerObject.toReqPwdHandler}
        toSignUpHandler={handlerObject.toSignupHandler}
        emailSignInHandler={handlerObject.emailSignInHandler}
        googleSignInHandler={handlerObject.googleSignInHandler}
      />
      <SignUpModal
        isOpen={isOpenSignup}
        onClose={onCloseSignup}
        onChangeHandler={handlerObject.onChangeHandler}
        hookVars={hookVars}
        toLoginHandler={handlerObject.toLoginHandler}
        emailSignUpHandler={handlerObject.emailSignUpHandler}
      />
      <ReqPwdModal
        isOpen={isOpenPwd}
        onClose={onClosePwd}
        hookVars={hookVars}
        onChangeHandler={handlerObject.onChangeHandler}
        changePasswordHandler={handlerObject.changePasswordHandler}
      />
    </>
  );
};

export default Header;