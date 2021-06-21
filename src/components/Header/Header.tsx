import {
  Button,
  Icon,
  IconButton,
  Image,
  Link,
  Stack,
  useBreakpointValue,
  useColorModeValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
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
import { HeaderData, HeaderConfig, adminHeader } from "./HeaderConfig";
import SearchBar from "../SearchBar/SearchBar";
import { useEffect } from "react";
import { User } from "~/config/interface";
import APIUrl from "~/config/backendUrl";
import axios, { AxiosRequestConfig } from "axios";

const Header: React.FC<{}> = () => {
  const router = useRouter();
  const authContext = useAuth();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [success, setSuccess] = useState<successObj | null>(null);
  const [error, setError] = useState<errorObj | null>(null);

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (user != null) return;
    if (authContext.auth && authContext.auth.emailVerified) {
      async function checkUserIsAdmin() {
        const response = await axios
          .get<User>(APIUrl.getSingleUserByEmail + `/${authContext.auth.email}`)
          .then((response) => response.data)
          .catch((err) => {
            throw err;
          });

        setUser(response);
      }

      checkUserIsAdmin();
    }
  });

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

  const desktopHeaderBox = (navItem: HeaderData) => {
    return (
      <Box key={navItem.label}>
        <Link
          p={8}
          onClick={() => {
            switch (navItem.label) {
              case "Sign In":
                onOpenLogin();
                break;
              case "Log Out":
                handlerObject.logOutHandler();
                break;
              default:
                router.push({
                  pathname: navItem.path,
                });
                break;
            }
          }}
          fontSize={"large"}
          fontWeight={500}
          color={router.pathname.startsWith(navItem.path) ? "#FFB775" : "white"}
          _hover={{
            textDecoration: "none",
            color: "black",
          }}
        >
          {navItem.label} {navItem.icon}
        </Link>
      </Box>
    );
  };

  const desktopNav = () => {
    return (
      <Stack direction={"row"} spacing={4}>
        {user && user.isAdmin && desktopHeaderBox(adminHeader)}
        {HeaderConfig.map((navItem) =>
          authContext.auth
            ? navItem.showAfterLogged && desktopHeaderBox(navItem)
            : navItem.showBeforeLogged && desktopHeaderBox(navItem)
        )}
      </Stack>
    );
  };

  return (
    <>
      <Flex
        justify="space-between"
        align="center"
        bgColor="red.800"
        height={"8vh"}
      >
        <Button
          paddingLeft={[2, 5, 10]}
          variant="link"
          onClick={() => router.push("/")}
        >
          <Image
            my={2}
            src="/bonus_header.png"
            fit="contain"
            alt="BoNUS Logo"
          />
        </Button>
        {useBreakpointValue({
          // for phone, we can use the navigation bar
          base: (
            <>
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
            </>
          ),
          // for web version, header is used as the navbar
          md: (
            <>
              <Box marginLeft="5vh" width={"23vw"}>
                <SearchBar
                  name="header-search"
                  onSubmit={(content: string) =>
                    router.push({
                      pathname: "/explore",
                      query: {
                        keyword: content,
                      },
                    })
                  }
                />
              </Box>
              <Spacer />
              <Flex direction="column" marginRight={{ md: 25, "2xl": 150 }}>
                {desktopNav()}
              </Flex>
            </>
          ),
        })}
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
