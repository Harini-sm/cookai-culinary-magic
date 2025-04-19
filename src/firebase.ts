
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

// Save a recipe to user's saved recipes
const saveRecipe = async (userId: string, recipe: any) => {
  try {
    // Check if recipe already exists for this user
    const recipesRef = collection(db, "savedRecipes");
    const q = query(recipesRef, 
      where("userId", "==", userId), 
      where("recipeId", "==", recipe.id)
    );
    
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      // Recipe already saved
      return { success: false, message: "Recipe already saved" };
    }
    
    // Add recipe to savedRecipes collection
    const savedRecipeData = {
      userId,
      recipeId: recipe.id,
      title: recipe.title,
      image: recipe.image,
      savedAt: new Date().toISOString(),
      recipeData: recipe
    };
    
    await addDoc(collection(db, "savedRecipes"), savedRecipeData);
    return { success: true, message: "Recipe saved successfully" };
    
  } catch (error) {
    console.error("Error saving recipe:", error);
    return { success: false, message: "Failed to save recipe" };
  }
};

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

// Remove a saved recipe
const removeSavedRecipe = async (userId: string, recipeId: string) => {
  try {
    const recipesRef = collection(db, "savedRecipes");
    const q = query(recipesRef, 
      where("userId", "==", userId), 
      where("recipeId", "==", recipeId)
    );
    
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return { success: false, message: "Recipe not found" };
    }
    
    // Delete all matching documents
    const deletePromises = querySnapshot.docs.map(document => 
      deleteDoc(doc(db, "savedRecipes", document.id))
    );
    
    await Promise.all(deletePromises);
    return { success: true, message: "Recipe removed successfully" };
    
  } catch (error) {
    console.error("Error removing saved recipe:", error);
    return { success: false, message: "Failed to remove recipe" };
  }
};

// Share a recipe (creates a shareable link and social media sharing options)
const shareRecipe = async (recipe: any) => {
  try {
    // Generate a unique ID for the shared recipe
    const shareId = `share-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Store the recipe in a shared recipes collection
    await setDoc(doc(db, "sharedRecipes", shareId), {
      recipeData: recipe,
      sharedAt: new Date().toISOString(),
      viewCount: 0
    });
    
    // Create share URL for the web app
    const appShareUrl = `${window.location.origin}/shared-recipe/${shareId}`;
    
    // Create social media sharing URLs
    const encodedTitle = encodeURIComponent(`Check out this recipe: ${recipe.title}`);
    const encodedUrl = encodeURIComponent(appShareUrl);
    
    const socialShareLinks = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      email: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`
    };
    
    return { 
      success: true, 
      shareId,
      shareUrl: appShareUrl,
      socialShareLinks
    };
  } catch (error) {
    console.error("Error sharing recipe:", error);
    return { success: false, message: "Failed to share recipe" };
  }
};

// Get a shared recipe by ID
const getSharedRecipe = async (shareId: string) => {
  try {
    const docRef = doc(db, "sharedRecipes", shareId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      // Increment view count
      await setDoc(docRef, { 
        ...docSnap.data(), 
        viewCount: (docSnap.data().viewCount || 0) + 1 
      }, { merge: true });
      
      return { success: true, recipe: docSnap.data().recipeData };
    } else {
      return { success: false, message: "Shared recipe not found" };
    }
  } catch (error) {
    console.error("Error getting shared recipe:", error);
    return { success: false, message: "Failed to fetch shared recipe" };
  }
};

export { 
  auth, provider, FirebaseError, db,
  saveRecipe, getSavedRecipes, removeSavedRecipe,
  shareRecipe, getSharedRecipe 
};
export { signInWithPopup } from "firebase/auth";
