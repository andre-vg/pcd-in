// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth/react-native";
import { getReactNativePersistence } from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDLRFyE-Z01UmC2uxCGQ8AZLp6lfAWAaYQ",
  authDomain: "pcd-in.firebaseapp.com",
  projectId: "pcd-in",
  storageBucket: "pcd-in.appspot.com",
  messagingSenderId: "467455222369",
  appId: "1:467455222369:web:ec0e16ea25b4a2987dc020",
  measurementId: "G-V66GD8KZFN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = initializeAuth(
  app, {
    persistence: getReactNativePersistence(AsyncStorage),
  }
);

export { auth, db };