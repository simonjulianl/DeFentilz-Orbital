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
};

interface modalCallbacks {
    onOpenLogin: () => void,
    onCloseLogin: () => void, 
    onOpenSignup: () => void, 
    onCloseSignup: () => void,
    onOpenPwd: () => void,
}

function authHandlers(  hookVars : hookVars,
                        settersObject: settersObject,
                        modalCallbacks: modalCallbacks,
                        authContext: AuthContext,
                        router: NextRouter) {
                            
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
      (errorCode: string, errorMessage: string) => {
        console.error(errorCode + " " + errorMessage);
      }
    );
  };

  const emailSignUpHandler = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    authContext.signUpWithEmail(hookVars.email, hookVars.password, hookVars.name, (errorCode: string, errorMessage: string) => {
      console.error(errorCode + " " + errorMessage);
    });
  }

  const googleSignInHandler = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    authContext.signInWithGoogle(event);
  };

  const changePasswordHandler = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    authContext.changePassword(hookVars.email, (errorCode: string, errorMessage: string) => {
      console.error(errorCode + " " + errorMessage);
    })
  }

  const logOutHandler = () => {
    authContext.signOut();
    router.push("/");
    modalCallbacks.onCloseLogin();
    modalCallbacks.onCloseSignup();
  };

  const toLoginHandler = () => {
    modalCallbacks.onCloseSignup();
    modalCallbacks.onOpenLogin();
  };

  const toSignupHandler = () => {
    modalCallbacks.onCloseLogin();
    modalCallbacks.onOpenSignup();
  };

  const toReqPwdHandler = () => {
    modalCallbacks.onCloseLogin();
    modalCallbacks.onOpenPwd();
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
