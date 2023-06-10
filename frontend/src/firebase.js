import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCtqdA8GnAPkLaqPnGdQusAwH5D15JUfzY",
  authDomain: "maitrigyan-a989c.firebaseapp.com",
  projectId: "maitrigyan-a989c",
  storageBucket: "maitrigyan-a989c.appspot.com",
  messagingSenderId: "768951886895",
  appId: "1:768951886895:web:49688ade90cd795c7152da",
  measurementId: "G-P5TBYNV3F6",
};

firebase.initializeApp(firebaseConfig)
let auth = firebase.auth()
export {auth, firebase}