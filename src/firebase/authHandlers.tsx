import { NextRouter } from "next/router";
import { AuthContext } from "~/firebase/auth";
import {
  hookVars,
  settersObject,
  modalCallbacks,
  errorObj
} from "./authHandlersInterface";

export default function authHandlers(
  hookVars: hookVars,
  settersObject: settersObject,
  modalCallbacks: modalCallbacks,
  authContext: AuthContext,
  router: NextRouter
) {
  const resolveHandler = () => {
    modalCallbacks.onCloseSignup();
    modalCallbacks.onCloseLogin();
    modalCallbacks.onCloseDrawer();
    modalCallbacks.onClosePwd();
  };

  const errorHandler = (
    error: errorObj,
  ) => {
    settersObject.setError({
      code: error.code,
      message: error.message,
    });
  };

  const onChangeHandler = (event: {
    currentTarget: { id: any; value: any };
  }) => {
    const { id, value } = event.currentTarget;
    if (id === "displayName") {
      settersObject.setName(value);
    } else if (id === "userEmail") {
      settersObject.setEmail(value);
    } else if (id === "userPassword") {
      settersObject.setPassword(value);
    }
  };

  const emailSignInHandler = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    authContext.signInWithEmail(
      hookVars.email,
      hookVars.password,
      resolveHandler,
      errorHandler
    );
  };

  const emailSignUpHandler = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    authContext.signUpWithEmail(
      hookVars.email,
      hookVars.password,
      hookVars.name,
      () => {
        settersObject.setSuccess({
          code: "signup-successful",
          message: "Sign up is successful",
        });
      },
      errorHandler
    );
  };

  const googleSignInHandler = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    authContext.signInWithGoogle(resolveHandler, errorHandler);
  };

  const changePasswordHandler = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    authContext.changePassword(
      hookVars.email,
      () => {
        settersObject.setSuccess({
          code: "password-change-successful",
          message: "Password Change is Successful. Please check your email",
        });
      },
      errorHandler
    );
  };

  const logOutHandler = () => {
    settersObject.setError(null);
    authContext.signOut();
    router.push("/");
    modalCallbacks.onCloseLogin();
    modalCallbacks.onCloseSignup();
    modalCallbacks.onCloseDrawer();
  };

  // the naming convention here becomes inconsistent given logOutHandler, the naming convention above
  // and after this line is different
  const toLoginHandler = () => {
    settersObject.setError(null);
    modalCallbacks.onCloseSignup();
    modalCallbacks.onCloseDrawer();
    modalCallbacks.onOpenLogin();
  };

  const toSignupHandler = () => {
    settersObject.setError(null);
    modalCallbacks.onCloseLogin();
    modalCallbacks.onCloseDrawer();
    modalCallbacks.onOpenSignup();
  };

  const toReqPwdHandler = () => {
    settersObject.setError(null);
    modalCallbacks.onCloseLogin();
    modalCallbacks.onCloseDrawer();
    modalCallbacks.onOpenPwd();
  };

  return {
    onChangeHandler,
    emailSignUpHandler,
    emailSignInHandler,
    googleSignInHandler,
    changePasswordHandler,
    logOutHandler,
    toLoginHandler,
    toSignupHandler,
    toReqPwdHandler,
  };
}
