
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6n2IVFoMQh3QIxGkRxidHPjL6Smh2o8s",
  authDomain: "cookai-8bcdd.firebaseapp.com",
  projectId: "cookai-8bcdd",
  storageBucket: "cookai-8bcdd.firebasestorage.app",
  messagingSenderId: "1020772905560",
  appId: "1:1020772905560:web:e0d0853be3e4086c20d02d",
  measurementId: "G-MTRBW3QJRG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
export { signInWithPopup } from "firebase/auth";
