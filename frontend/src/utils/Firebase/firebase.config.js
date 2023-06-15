// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCtqdA8GnAPkLaqPnGdQusAwH5D15JUfzY",
  authDomain: "maitrigyan-a989c.firebaseapp.com",
  projectId: "maitrigyan-a989c",
  storageBucket: "maitrigyan-a989c.appspot.com",
  messagingSenderId: "768951886895",
  appId: "1:768951886895:web:49688ade90cd795c7152da",
  measurementId: "G-P5TBYNV3F6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);