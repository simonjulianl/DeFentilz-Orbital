import firebase from "./firebase";

export const addUser = async (authUser: any) => {
  const resp = await firebase
    .firestore()
    .collection("users")
    .doc(authUser.uid as string)
    .set({ ...authUser }, { merge: true });
  return resp;
};
