import { NextRouter } from "next/router";
import { AuthContext } from "~/firebase/auth";
import {
  hookVars,
  settersObject,
  modalCallbacks,
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
    errorCode: string | null,
    errorMessage: string | null
  ) => {
    console.error("Error Code: " + errorCode + "; Error Message: " + errorMessage);
    settersObject.setError({
      errorCode: errorCode,
      errorMessage: errorMessage,
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
      resolveHandler,
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
      () => settersObject.setSuccessChange(true),
      errorHandler
    );
  };

  const logOutHandler = () => {
    settersObject.setError({ errorCode: null, errorMessage: null });
    settersObject.setSuccessChange(null);
    authContext.signOut();
    router.push("/");
    modalCallbacks.onCloseLogin();
    modalCallbacks.onCloseSignup();
    modalCallbacks.onCloseDrawer();
  };

  // the naming convention here becomes inconsistent given logOutHandler, the naming convention above
  // and after this line is different
  const toLoginHandler = () => {
    settersObject.setError({ errorCode: null, errorMessage: null });
    settersObject.setSuccessChange(null);
    modalCallbacks.onCloseSignup();
    modalCallbacks.onCloseDrawer();
    modalCallbacks.onOpenLogin();
  };

  const toSignupHandler = () => {
    settersObject.setError({ errorCode: null, errorMessage: null });
    settersObject.setSuccessChange(null);
    modalCallbacks.onCloseLogin();
    modalCallbacks.onCloseDrawer();
    modalCallbacks.onOpenSignup();
  };

  const toReqPwdHandler = () => {
    settersObject.setError({ errorCode: null, errorMessage: null });
    settersObject.setSuccessChange(null);
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
