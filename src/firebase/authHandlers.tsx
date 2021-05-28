import { NextRouter } from "next/router";
import { AuthContext } from "~/firebase/auth";

interface hookVars {
    name : string,
    email : string,
    password : string,
};

interface settersObject {
    setName : (arg0: string) => void,
    setEmail : (arg0: string) => void,
    setPassword : (arg0: string) => void,
    setError : (arg0: { errorCode: string,
                        errorMessage: string}) => void,
};

interface modalCallbacks {
    onOpenLogin: () => void,
    onCloseLogin: () => void, 
    onOpenSignup: () => void, 
    onCloseSignup: () => void,
    onOpenPwd: () => void,
    onClosePwd: () => void,
    onCloseDrawer: () => void,
}

function authHandlers(  hookVars : hookVars,
                        settersObject: settersObject,
                        modalCallbacks: modalCallbacks,
                        authContext: AuthContext,
                        router: NextRouter) {
  const errorHandler = (errorCode: string | null, errorMessage: string | null) => {
    console.error(errorCode + " " + errorMessage);
    settersObject.setError({errorCode: errorCode, errorMessage: errorMessage});
  }
                            
  const onChangeHandler = (event: { currentTarget: { id: any; value: any; }; }) => {
    const { id, value } = event.currentTarget;
    if (id === "displayName") {
        settersObject.setName(value);
    } else if (id === "userEmail") {
        settersObject.setEmail(value);
    } else if (id === "userPassword") {
        settersObject.setPassword(value);
    }
  };

  const emailSignInHandler = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    authContext.signInWithEmail(
      hookVars.email,
      hookVars.password,
      errorHandler
    );
    modalCallbacks.onCloseLogin();
    modalCallbacks.onCloseDrawer();
  };

  const emailSignUpHandler = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    authContext.signUpWithEmail(hookVars.email, hookVars.password, hookVars.name, errorHandler);
    modalCallbacks.onCloseSignup();
    modalCallbacks.onCloseDrawer();
  }

  const googleSignInHandler = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    authContext.signInWithGoogle(errorHandler);
    modalCallbacks.onCloseLogin();
    modalCallbacks.onCloseDrawer();
  };

  const changePasswordHandler = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    authContext.changePassword(hookVars.email, errorHandler);
    modalCallbacks.onClosePwd();
    modalCallbacks.onCloseDrawer();
  }

  const logOutHandler = () => {
    settersObject.setError({errorCode: null, errorMessage: null});
    authContext.signOut();
    router.push("/");
    modalCallbacks.onCloseLogin();
    modalCallbacks.onCloseSignup();
    modalCallbacks.onCloseDrawer();
  };

  const toLoginHandler = () => {
    settersObject.setError({errorCode: null, errorMessage: null});
    modalCallbacks.onCloseSignup();
    modalCallbacks.onOpenLogin();
    modalCallbacks.onCloseDrawer();
  };

  const toSignupHandler = () => {
    settersObject.setError({errorCode: null, errorMessage: null});
    modalCallbacks.onCloseLogin();
    modalCallbacks.onOpenSignup();
    modalCallbacks.onCloseDrawer();
  };

  const toReqPwdHandler = () => {
    settersObject.setError({errorCode: null, errorMessage: null});
    modalCallbacks.onCloseLogin();
    modalCallbacks.onOpenPwd();
    modalCallbacks.onCloseDrawer();
  }

  return {
      onChangeHandler, 
      emailSignUpHandler,
      emailSignInHandler,
      googleSignInHandler,
      changePasswordHandler,
      logOutHandler,
      toLoginHandler,
      toSignupHandler,
      toReqPwdHandler
  };
}

export default authHandlers;
