// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getStorage, ref } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDizEl-iCaL64yoDhW7X5-w002McANqYf8",
  authDomain: "contacts-app-d388e.firebaseapp.com",
  projectId: "contacts-app-d388e",
  storageBucket: "contacts-app-d388e.appspot.com",
  messagingSenderId: "784735145274",
  appId: "1:784735145274:web:3eb135a89ce3664cd19403",
  measurementId: "G-6LDRBH21S0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage();
// const analytics = getAnalytics(app);