// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore();

// const [dummy, setDummy] = useState([]);

const signupUser = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredentials) => {
      const user = userCredentials.user;
      console.log("User : ", user);
    })
    .catch((error) => {
      console.log("Error Code: ", error.code);
      console.log("Error Message: ", error.message);
    });
};

const loginUser = (email, password) => {
  signInWithEmailAndPassword(auth, email, password).then((cred) => {
    const user = cred.user;
    console.log("Logged in successfully! ", user);
  });
};

const logout = () => {
  signOut(auth).then(() => {
    console.log("Logged out successfully");
  });
};

const onUserStateChange = () => {
  onAuthStateChanged(auth,  (user) => {
    if (user) {
      return user
    } else {
      console.log("User Logged out");
      return null
    }
  });
};

// const getDataCollection = async (dbName) => {
//   try {
//     const snapshot = await getDocs(collection(db, dbName));
//     return snapshot.docs;
//   } catch (error) {
//     console.error("Error fetching collection:", error);
//     throw error;
//   }
// };

export {
  app,
  auth,
  db,
  signupUser,
  loginUser,
  logout,
  onUserStateChange,
};
