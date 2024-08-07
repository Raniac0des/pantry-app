// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
//import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDih4BlIPB7vcPWUjM1Qw-tBuJPi-f29-g",
  authDomain: "pantry-app-37353.firebaseapp.com",
  projectId: "pantry-app-37353",
  storageBucket: "pantry-app-37353.appspot.com",
  messagingSenderId: "1094146343591",
  appId: "1:1094146343591:web:ecbb736d7c7c1aa7a55182"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
