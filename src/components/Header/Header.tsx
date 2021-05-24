import { useAuth } from "~/firebase/auth";
import { NextRouter, useRouter } from "next/router";

import { Image, Button, useDisclosure } from "@chakra-ui/react";

import { Modal } from "@chakra-ui/react";
import { Flex, Box, HStack } from "@chakra-ui/layout";
import signinModal from "~/components/SignInModal/SignInModal";
import signupModal from "~/components/SignUpModal/SignUpModal";
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
        {authContext.auth ? (
          buttonFactory(
            { rightPadding: 5, leftPadding: 0, path: null, label: "Log Out" },
            logOutHandler,
            router
          )
        ) : (
          <HStack>
            {buttonFactory(
              {
                rightPadding: 0,
                leftPadding: 5,
                path: "/signup",
                label: "Sign Up",
              },
              onOpenSignup,
              router
            )}
            {buttonFactory(
              {
                rightPadding: 5,
                leftPadding: 0,
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
      </Flex>
    </>
  );
};
export default Header;

// Helper function
interface Property {
  label: string;
  path: string | null;
  leftPadding: number;
  rightPadding: number;
}
type onClickCallback = (event: React.MouseEvent<HTMLButtonElement>) => void;

function buttonFactory(
  property: Property,
  callback: onClickCallback,
  router: NextRouter
) {
  return (
    <Box
      paddingRight={property.rightPadding}
      paddingLeft={property.leftPadding}
    >
      <Button
        width={"90px"}
        borderRadius="15px"
        onClick={callback}
        as="button"
        fontWeight={router.pathname === property.path ? "extrabold" : "normal"}
      >
        {property.label}
      </Button>
    </Box>
  );
}
