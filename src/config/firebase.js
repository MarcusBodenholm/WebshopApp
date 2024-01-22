// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBRz82-FrAmIDja7kyxo6Upbanl2RPp73E",
  authDomain: "webshop-2f805.firebaseapp.com",
  projectId: "webshop-2f805",
  storageBucket: "webshop-2f805.appspot.com",
  messagingSenderId: "263480837179",
  appId: "1:263480837179:web:3bae51f3d54fd05a01c81e",
  measurementId: "G-6M839YEBFB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider(app);
export const db = getFirestore(app);

