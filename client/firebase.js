// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-d9268.firebaseapp.com",
  projectId: "mern-auth-d9268",
  storageBucket: "mern-auth-d9268.appspot.com",
  messagingSenderId: "1046957874498",
  appId: "1:1046957874498:web:53d9009bf69aa69f9a3cdb"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);