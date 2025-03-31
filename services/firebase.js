// services/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your Firebase config (Replace with your actual Firebase credentials)
const firebaseConfig = {
  apiKey: "AIzaSyAaMCCpj12gFutuUkPSwsRPy41KI9Uug3s",
  authDomain: "e-commerce-4e924.firebaseapp.com",
  projectId: "e-commerce-4e924",
  storageBucket: "e-commerce-4e924.firebasestorage.app",
  messagingSenderId: "261587367103",
  appId: "1:261587367103:web:f14e5e95becb66d822420a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };