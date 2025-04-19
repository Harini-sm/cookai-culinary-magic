import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { getFirestore, collection, addDoc, query, where, getDocs, deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";

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
const db = getFirestore(app);

// Get user's saved recipes
const getSavedRecipes = async (userId: string) => {
  try {
    const recipesRef = collection(db, "savedRecipes");
    const q = query(recipesRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    
    const recipes: any[] = [];
    querySnapshot.forEach((doc) => {
      recipes.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return { success: true, recipes };
  } catch (error) {
    console.error("Error getting saved recipes:", error);
    return { success: false, message: "Failed to fetch saved recipes" };
  }
};

export { 
  auth, provider, FirebaseError, db,
  getSavedRecipes
};
export { signInWithPopup } from "firebase/auth";
