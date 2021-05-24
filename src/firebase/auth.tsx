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
    errorHandler: Function
  ) => Promise<void>;
  signInWithEmail: (
    email: string,
    password: string,
    errorHandler: Function
  ) => Promise<void>;
  signInWithGoogle: (errorHandler: Function) => Promise<void>;
  changePassword: (
    email: string,
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
    errorHandler: Function
  ) => {},
  signInWithEmail: async (
    email: string,
    password: string,
    errorHandler: Function
  ) => {},
  signInWithGoogle: async (
    errorHandler: Function
  ) => {},
  changePassword: async (
    email: string, 
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
  const basicEmailChecker = (email: string | null, errorHandler: Function) => {
    if (email === "") {
      errorHandler("404", "Please fill in your email address");
      return false;
    } else if (email.split('@')[1] !== "u.nus.edu") {
      errorHandler("404", "This is not a valid NUS email address");
      return false;
    }
    errorHandler(null, null);
    return true;
  }

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
    // Error throwing here
    response: firebase.auth.UserCredential,
    provider: String = "google"
  ) => {
    if (!response.user) {
      throw new Error("No User");
    }
    const authUser = formatAuthState(response.user);
    setAuth(authUser);
    await addUser({ ...authUser, provider });
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

  const signInWithGoogle = async (errorHandler: Function) => {
    setLoading(true);
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((response) => signedIn(response, "google"))
      .catch((error) => {
        errorHandler(error.code, error.message);
      });
  };

  const signUpWithEmail = async (
    email: string,
    password: string,
    displayName: string,
    errorHandler: Function
  ) => {
    setLoading(true);
    if(displayName === ''){
      errorHandler("404", "Please input display name");
      return;
    }
    if(basicEmailChecker(email, errorHandler)){
      return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => signedUpandIn(response, "email", displayName))
      .catch((error) => {
        errorHandler(error.code, error.message);
      });
    }
    return ;
  };

  const signInWithEmail = async (
    email: string,
    password: string,
    errorHandler: Function
  ) => {
    setLoading(true);
    if (basicEmailChecker(email, errorHandler)) {
      return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => signedIn(response, "email"))
      .catch((error) => {
        errorHandler(error.code, error.message);
      });
    }
    return ;
  };

  const changePassword = async (
    email: string,
    errorHandler: Function
  ) => {
    setLoading(true);
    return firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then((response) => console.log(response))
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
