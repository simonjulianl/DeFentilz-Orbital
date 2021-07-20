import axios from "axios";
import { Context, createContext, useContext, useEffect, useState } from "react";
import { errorObj } from "./authHandlersInterface";
import APIUrl from "~/config/backendUrl";
import { User } from "~/config/interface";
import firebase from "./firebase";

interface Auth {
  uid: string;
  email: string | null;
  name: string | null;
  photoUrl: string | null;
  token: string | null;
  emailVerified: boolean;
  user: User | null;
}

export interface AuthContext {
  auth: Auth | null;
  loading: boolean;
  signUpWithEmail: (
    email: string,
    password: string,
    displayName: string,
    resolveHandler: () => void,
    errorHandler: (error: errorObj) => void
  ) => Promise<void>;
  signInWithEmail: (
    email: string,
    password: string,
    resolveHandler: () => void,
    errorHandler: (error: errorObj) => void
  ) => Promise<void>;
  signInWithGoogle: (
    errorHandler: () => void,
    resolveHandler: (error: errorObj) => void
  ) => Promise<void>;
  changePassword: (
    email: string,
    resolveHandler: () => void,
    errorHandler: (error: errorObj) => void
  ) => Promise<void>;
  signOut: () => Promise<void>;
}

const authContext: Context<AuthContext> = createContext<AuthContext>({
  auth: null,
  loading: true,
  signUpWithEmail: async () => {
    // Empty arrow function
  },
  signInWithEmail: async () => {
    // Empty arrow function
  },
  signInWithGoogle: async () => {
    // Empty arrow function
  },
  changePassword: async () => {
    // Empty arrow function
  },
  signOut: async () => {
    // Empty arrow function
  },
});

const formatAuthState = (user: firebase.User): Auth => {
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    photoUrl: user.photoURL,
    token: null,
    emailVerified: user.emailVerified,
    user: null,
  };
};

function useProvideAuth() {
  const [auth, setAuth] = useState<Auth | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const basicEmailChecker = (email: string | null) =>
    email.split("@")[1] !== "u.nus.edu";

  async function getUser(userEmail: string) {
    return axios
      .get<User>(APIUrl.getSingleUserByEmail + `/${userEmail}`)
      .then((response) => response.data)
      .catch((err) => {
        console.log(err);
        return null;
      });
  }

  async function createUser(userEmail: string, name: string): Promise<User> {
    return axios({
      method: "POST",
      url: APIUrl.createUser,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        email: userEmail,
        name: name,
      },
    })
      .then((response) => response.data)
      .catch((err) => console.log(err));
  }

  const handleAuthChange = async (user: firebase.User | null) => {
    if (!user) {
      setLoading(false);
      return;
    }

    const formattedAuth = formatAuthState(user);
    formattedAuth.token = await user.getIdToken();
    const fetchedUser = await getUser(user.email);

    if (user.emailVerified && fetchedUser === "") {
      // user is verified but not in database yet, first time logging in
      const newUser = await createUser(user.email, user.displayName);
      formattedAuth.user = newUser;
    } else {
      formattedAuth.user = fetchedUser;
    }

    setAuth(formattedAuth);
    setLoading(false);
  };

  const clear = () => {
    setAuth(null);
    setLoading(true);
  };

  const signedIn = async (response: firebase.auth.UserCredential) => {
    if (!response.user) {
      throw {
        code: "no-user",
        message: "No User",
      };
    } else if (!response.user.emailVerified) {
      throw {
        code: "unverified-email",
        message: "Unverified Email",
      };
    }

    const authUser = formatAuthState(response.user);
    authUser.user = await getUser(response.user.email);
    setAuth(authUser);
  };

  const signedUp = async (
    response: firebase.auth.UserCredential,
    displayName: string
  ) => {
    if (!response.user) {
      throw {
        code: "no-user",
        message: "No User",
      };
    }

    await response.user.updateProfile({
      displayName: displayName,
    });

    setAuth(null);
    return response;
  };

  const signInWithGoogle = async (
    resolveHandler: () => void,
    errorHandler: (error: errorObj) => void
  ) => {
    setLoading(true);
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((response) => signedIn(response))
      .then(() => resolveHandler())
      .catch((error) => errorHandler(error));
  };

  const signUpWithEmail = async (
    email: string,
    password: string,
    displayName: string,
    resolveHandler: () => void,
    errorHandler: (error: errorObj) => void
  ) => {
    setLoading(true);
    if (displayName === "") {
      errorHandler({
        code: "no-name",
        message: "Please input display name",
      });
      return;
    } else if (basicEmailChecker(email)) {
      errorHandler({
        code: "wrong-email-format",
        message: "Incorrect Email",
      });
      return;
    }
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => signedUp(response, displayName))
      .then((response) => response.user.sendEmailVerification())
      .then(() =>
        firebase
          .auth()
          .signOut()
          .then(() => clear())
      )
      .then(() => resolveHandler())
      .catch((error) => errorHandler(error));
  };

  const signInWithEmail = async (
    email: string,
    password: string,
    resolveHandler: () => void,
    errorHandler: (error: errorObj) => void
  ) => {
    setLoading(true);
    if (basicEmailChecker(email)) {
      errorHandler({
        code: "wrong-email-format",
        message: "Incorrect Email",
      });
      return;
    }

    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => signedIn(response))
      .catch((unverifiedError) =>
        firebase
          .auth()
          .signOut()
          .then(clear)
          .then(() => {
            throw unverifiedError;
          })
      )
      .then(() => resolveHandler())
      .catch((error) => {
        console.log(error);
        errorHandler(error);
      });
  };

  const changePassword = async (
    email: string,
    resolveHandler: () => void,
    errorHandler: (error: errorObj) => void
  ) => {
    setLoading(true);
    if (basicEmailChecker(email)) {
      errorHandler({
        code: "wrong-email-format",
        message: "Incorrect Email",
      });
      return;
    }
    return firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => resolveHandler())
      .catch((error) => errorHandler(error));
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
