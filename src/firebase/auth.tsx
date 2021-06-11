import { Context, createContext, useContext, useEffect, useState } from "react";
import { addUser } from "./db";
import firebase from "./firebase";

interface Auth {
  uid: string;
  email: string | null;
  name: string | null;
  photoUrl: string | null;
  token: string | null;
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
});

function useProvideAuth() {
  const [auth, setAuth] = useState<Auth | null>(null); // Declares state variable "auth" with setter "setAuth"
  const [loading, setLoading] = useState<boolean>(true);
  const basicEmailChecker = (email: string | null) => {
    if (email.split("@")[1] !== "u.nus.edu") {
      return true;
    }
    return false;
  };

  const handleAuthChange = async (authState: firebase.User | null) => {
    if (!authState) {
      setLoading(false);
      return;
    }
    const formattedAuth = formatAuthState(authState);
    formattedAuth.token = await authState.getIdToken();
    setAuth(formattedAuth);
    setLoading(false);
  };

  const signedIn = async (
    response: firebase.auth.UserCredential,
    provider: String = "google"
  ) => {
    if (!response.user) {
      throw new Error("No User");
    }
    const authUser = formatAuthState(response.user);
    setAuth(authUser);
    // await addUser({ ...authUser, provider });
  };

  const signedUpandIn = async (
    response: firebase.auth.UserCredential,
    provider: String = "email",
    displayName: string | null = null
  ) => {
    if (!response.user) {
      throw new Error("No User");
    }

    await response.user.updateProfile({
      displayName: displayName,
      photoURL: null,
    });

    const authUser = formatAuthState(firebase.auth().currentUser);
    authUser.name = displayName;
    setAuth(authUser);
    await addUser({ ...authUser, provider });
  };

  const clear = () => {
    setAuth(null);
    setLoading(true);
  };

  const signInWithGoogle = async (
    resolveHandler: Function,
    errorHandler: Function
  ) => {
    setLoading(true);
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((response) => {
        signedIn(response, "google");
        resolveHandler();
      })
      .catch((error) => {
        errorHandler(error.code, error.message);
      });
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
    }
    if (basicEmailChecker(email)) {
      errorHandler("wrong-email-format", "Incorrect Email");
      return;
    }
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        signedUpandIn(response, "email", displayName);
        resolveHandler();
      })
      .catch((error) => {
        errorHandler(error.code, error.message);
      });
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
      .then((response) => {
        signedIn(response, "email");
        resolveHandler();
      })
      .catch((error) => {
        errorHandler(error.code, error.message);
      });
  };

  const changePassword = async (
    email: string,
    resolveHandler: Function,
    errorHandler: Function
  ) => {
    setLoading(true);
    if (basicEmailChecker(email)) {
      errorHandler("wrong-email-format", "Incorrect Email");
      return;
    }
    return firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then((response) => {
        errorHandler("password_change_success", "Email Sent");
        resolveHandler();
      })
      .catch((error) => {
        errorHandler(error.code, error.message);
      });
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
