// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getStorage, ref } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBnz1HlO9J2b2Zmk5IM2wqPNAU0KhWzVC8",
  authDomain: "react-firebase-4721e.firebaseapp.com",
  projectId: "react-firebase-4721e",
  storageBucket: "react-firebase-4721e.appspot.com",
  messagingSenderId: "534731508010",
  appId: "1:534731508010:web:d94e27cd8b29acce767653",
  measurementId: "G-KC7E658MDP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage();
// const analytics = getAnalytics(app);