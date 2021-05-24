import { Image, Modal, useDisclosure } from "@chakra-ui/react";
import { Flex, Box, HStack } from "@chakra-ui/layout";

import GeneralButton from "~/components/Button/Button";
import signinModal from "~/components/SignInModal/SignInModal";
import signupModal from "~/components/SignUpModal/SignUpModal";

import { useAuth } from "~/firebase/auth";
import { useRouter } from "next/router";
import { useState } from "react";

const Header: React.FC<{}> = () => {
  const router = useRouter();
  const authContext = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {
    isOpen: isOpenLogin,
    onOpen: onOpenLogin,
    onClose: onCloseLogin,
  } = useDisclosure();
  const {
    isOpen: isOpenSignup,
    onOpen: onOpenSignup,
    onClose: onCloseSignup,
  } = useDisclosure();

  const onChangeHandler = (event) => {
    const { id, value } = event.currentTarget;
    if (id === "userEmail") {
      setEmail(value);
    } else if (id === "userPassword") {
      setPassword(value);
    }
  };

  const emailSignInHandler = (event) => {
    event.preventDefault();
    authContext.signInWithEmail(
      email,
      password,
      (errorCode: string, errorMessage: string) => {
        if (errorCode === "auth/invalid-email") {
          console.error("404");
        } else if (errorCode === "auth/user-not-found") {
          console.error("404");
        }
      }
    );
    return <></>;
  };

  const logOutHandler = () => {
    authContext.signOut();
    router.push("/");
    onCloseLogin();
    onCloseSignup();
  };

  const toLoginHandler = () => {
    onCloseSignup();
    onOpenLogin();
  };

  const toSignupHandler = () => {
    onCloseLogin();
    onOpenSignup();
  };

  const handlerObject = {
    emailSignInHandler,
    onChangeHandler,
    toLoginHandler,
    toSignupHandler,
  };

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
            logOutHandler,
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
                authContext,
                handlerObject,
                router
              )}
            </Modal>
            <Modal isOpen={isOpenSignup} onClose={onCloseSignup}>
              {signupModal(
                isOpenSignup,
                onCloseSignup,
                authContext,
                handlerObject,
                router
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
