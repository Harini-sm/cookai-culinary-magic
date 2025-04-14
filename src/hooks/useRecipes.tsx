
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { 
  saveRecipe as saveRecipeToFirebase,
  getSavedRecipes as getSavedRecipesFromFirebase,
  removeSavedRecipe as removeSavedRecipeFromFirebase,
  shareRecipe as shareRecipeToFirebase
} from '@/firebase';

export function useRecipes() {
  const { user, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [savedRecipes, setSavedRecipes] = useState<any[]>([]);
  const [isFetchingRecipes, setIsFetchingRecipes] = useState(false);

  // Save recipe
  const saveRecipe = async (recipe: any) => {
    if (!isAuthenticated || !user) {
      toast.error("Please login to save recipes");
      return { success: false };
    }

    setIsLoading(true);
    try {
      const result = await saveRecipeToFirebase(user.id, recipe);
      
      if (result.success) {
        toast.success("Recipe saved successfully!");
        // Refresh saved recipes list
        await fetchSavedRecipes();
      } else {
        toast.error(result.message || "Failed to save recipe");
      }
      
      return result;
    } catch (error) {
      console.error("Error in saveRecipe:", error);
      toast.error("An error occurred while saving the recipe");
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch user's saved recipes
  const fetchSavedRecipes = async () => {
    if (!isAuthenticated || !user) {
      setSavedRecipes([]);
      return [];
    }

    setIsFetchingRecipes(true);
    try {
      const result = await getSavedRecipesFromFirebase(user.id);
      
      if (result.success) {
        setSavedRecipes(result.recipes);
        return result.recipes;
      } else {
        toast.error(result.message || "Failed to fetch saved recipes");
        return [];
      }
    } catch (error) {
      console.error("Error in fetchSavedRecipes:", error);
      toast.error("An error occurred while fetching saved recipes");
      return [];
    } finally {
      setIsFetchingRecipes(false);
    }
  };

  // Remove a saved recipe
  const removeSavedRecipe = async (recipeId: string) => {
    if (!isAuthenticated || !user) {
      return { success: false };
    }

    setIsLoading(true);
    try {
      const result = await removeSavedRecipeFromFirebase(user.id, recipeId);
      
      if (result.success) {
        toast.success("Recipe removed from saved list");
        // Update the local state to remove the recipe
        setSavedRecipes(prevRecipes => 
          prevRecipes.filter(recipe => recipe.recipeId !== recipeId)
        );
      } else {
        toast.error(result.message || "Failed to remove recipe");
      }
      
      return result;
    } catch (error) {
      console.error("Error in removeSavedRecipe:", error);
      toast.error("An error occurred while removing the recipe");
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  // Check if a recipe is saved
  const isRecipeSaved = (recipeId: string): boolean => {
    return savedRecipes.some(recipe => recipe.recipeId === recipeId);
  };

  // Share recipe
  const shareRecipe = async (recipe: any) => {
    setIsLoading(true);
    try {
      const result = await shareRecipeToFirebase(recipe);
      
      if (result.success) {
        // Copy share URL to clipboard
        await navigator.clipboard.writeText(result.shareUrl);
        toast.success("Recipe link copied to clipboard!");
      } else {
        toast.error(result.message || "Failed to share recipe");
      }
      
      return result;
    } catch (error) {
      console.error("Error in shareRecipe:", error);
      toast.error("An error occurred while sharing the recipe");
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    saveRecipe,
    fetchSavedRecipes,
    removeSavedRecipe,
    shareRecipe,
    isRecipeSaved,
    savedRecipes,
    isLoading,
    isFetchingRecipes
  };
}
