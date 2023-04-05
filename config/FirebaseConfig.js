// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth/react-native";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const auth = initializeAuth(app);

export { auth };