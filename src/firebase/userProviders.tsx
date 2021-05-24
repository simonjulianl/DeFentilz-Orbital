import {
  Component,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import firebase from "./firebase";

const useProvideUser = () => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setAuth(user);
    });
  });

  return { auth };
};

const UserProvider = (props) => {
  const user = useProvideUser();

  return (
    <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
  );
};
export const UserContext = createContext({ auth: null });
export default UserProvider;
