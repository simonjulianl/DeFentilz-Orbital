import { Context, createContext, useContext, useEffect, useState } from "react";
import firebase from "./firebase";

interface Auth {
  uid: string;
  email: string | null;
  name: string | null;
  photoUrl: string | null;
  token: string | null;
  emailVerified: boolean;
}

export interface AuthContext {
  auth: Auth | null;
  loading: boolean;
  signUpWithEmail: (
    email: string,
    password: string,
    displayName: string,
    resolveHandler: Function,
    errorHandler: Function
  ) => Promise<void>;
  signInWithEmail: (
    email: string,
    password: string,
    resolveHandler: Function,
    errorHandler: Function
  ) => Promise<void>;
  signInWithGoogle: (
    errorHandler: Function,
    resolveHandler: Function
  ) => Promise<void>;
  changePassword: (
    email: string,
    resolveHandler: Function,
    errorHandler: Function
  ) => Promise<void>;
  signOut: () => Promise<void>;
}

const authContext: Context<AuthContext> = createContext<AuthContext>({
  auth: null,
  loading: true,
  signUpWithEmail: async (
    email: string,
    password: string,
    displayName: string,
    resolveHandler: Function,
    errorHandler: Function
  ) => {},
  signInWithEmail: async (
    email: string,
    password: string,
    resolveHandler: Function,
    errorHandler: Function
  ) => {},
  signInWithGoogle: async (
    resolveHandler: Function,
    errorHandler: Function
  ) => {},
  changePassword: async (
    email: string,
    resolveHandler: Function,
    errorHandler: Function
  ) => {},
  signOut: async () => {},
});

const formatAuthState = (user: firebase.User): Auth => ({
  uid: user.uid,
  email: user.email,
  name: user.displayName,
  photoUrl: user.photoURL,
  token: null,
  emailVerified: user.emailVerified
});

function useProvideAuth() {
  const [auth, setAuth] = useState<Auth | null>(null); // Declares state variable "auth" with setter "setAuth"
  const [loading, setLoading] = useState<boolean>(true);

  const basicEmailChecker = (email: string | null) => email.split("@")[1] !== "u.nus.edu";

  const handleAuthChange = async (user: firebase.User | null) => {
    if (!user) {
      setLoading(false);
      return;
    }

    const formattedAuth = formatAuthState(user);
    formattedAuth.token = await user.getIdToken();
    setAuth(formattedAuth);
    setLoading(false);
  };

  const clear = () => {
    setAuth(null);
    setLoading(true);
  };

  const signedIn = async (
    response: firebase.auth.UserCredential
  ) => {
    if (!response.user) {
      throw {
        code: "no-user",
        message: "No User"
      }
    } else if (!response.user.emailVerified) {
      throw {
        code: "unverified-email",
        message: "Unverified Email"
      };
    }

    console.log(response.user.displayName);
    const authUser = formatAuthState(response.user);
    setAuth(authUser);
  };

  const signedUp = async (
    response: firebase.auth.UserCredential,
    displayName: string
  ) => {
    if (!response.user) {
      throw {
        code: "no-user",
        message: "No User"
      }
    }

    await response.user.updateProfile({
      displayName: displayName
    });

    setAuth(null);
    return response;
  };

  const signInWithGoogle = async (
    resolveHandler: Function,
    errorHandler: Function
  ) => {
    setLoading(true);
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((response) => signedIn(response))
      .then(() => resolveHandler())
      .catch((error) => errorHandler(error.code, error.message));
  };

  const signUpWithEmail = async (
    email: string,
    password: string,
    displayName: string,
    resolveHandler: Function,
    errorHandler: Function
  ) => {
    setLoading(true);
    if (displayName === "") {
      errorHandler("no-name", "Please input display name");
      return;
    } else if (basicEmailChecker(email)) {
      errorHandler("wrong-email-format", "Incorrect Email");
      return;
    }
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(response => signedUp(response, displayName))
      .then(response => response.user.sendEmailVerification())
      .then(() => firebase.auth().signOut().then(() => clear()))
      .then(() => resolveHandler())
      .catch((error) => errorHandler(error.code, error.message));
  };

  const signInWithEmail = async (
    email: string,
    password: string,
    resolveHandler: Function = () => {},
    errorHandler: Function
  ) => {
    setLoading(true);
    if (basicEmailChecker(email)) {
      errorHandler("wrong-email-format", "Incorrect Email");
      return;
    }

    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => signedIn(response))
      .catch((unverifiedError) => 
        firebase.auth()
        .signOut()
        .then(clear)
        .then(() => { throw unverifiedError }))
      .then(() => resolveHandler())
      .catch((error) => errorHandler(error.code, error.message));
  };

  const changePassword = async (
    email: string,
    resolveHandler: Function,
    errorHandler: Function,
  ) => {
    setLoading(true);
    if (basicEmailChecker(email)) {
      errorHandler("wrong-email-format", "Incorrect Email");
      return;
    }
    return firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => resolveHandler())
      .catch((error) => errorHandler(error.code, error.message));
  };

  const signOut = async () => {
    return firebase.auth().signOut().then(clear);
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(handleAuthChange);
    return () => unsubscribe();
  }, []);

  return {
    auth,
    loading,
    signUpWithEmail,
    signInWithEmail,
    signInWithGoogle,
    changePassword,
    signOut,
  };
}

export function AuthProvider({ children }: any) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => useContext(authContext);
