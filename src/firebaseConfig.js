// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBpPwWIMN6CFUzkRDySAsjeOQ9rYs2Jk74",
  authDomain: "my-portfolio-1d239.firebaseapp.com",
  projectId: "my-portfolio-1d239",
  storageBucket: "my-portfolio-1d239.firebasestorage.app",
  messagingSenderId: "563487715483",
  appId: "1:563487715483:web:3881d2482d2ae3fe25963e",
  measurementId: "G-0DP19YZS4P",
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Firestore Database
export const db = getFirestore(app);

// Firebase Authentication
export const auth = getAuth(app);

// Firestore Server Timestamp
export { serverTimestamp };
