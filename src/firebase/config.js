// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyARPs1lyRtRIDHwtGvn1EE6lnkMXyy4zug",
  authDomain: "miniblog-6476a.firebaseapp.com",
  projectId: "miniblog-6476a",
  storageBucket: "miniblog-6476a.appspot.com",
  messagingSenderId: "865270643259",
  appId: "1:865270643259:web:63b29da5aac86bc9dbfa1e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const db = getFirestore(app)

export {db};