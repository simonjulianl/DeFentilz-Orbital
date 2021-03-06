import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

try {
  firebase.initializeApp(firebaseConfig);
  // sign out after initialization in production
  switch (process.env.ENVIRONMENT) {
    case "PRODUCTION":
      firebase.auth().signOut();
      break;
    default:
      break;
  }
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.error("Firebase initialization error", err.stack);
  }
}

export default firebase;
