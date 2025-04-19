
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { getSavedRecipes as getSavedRecipesFromFirebase } from '@/firebase';

export function useRecipes() {
  const { user, isAuthenticated } = useAuth();
  const [savedRecipes, setSavedRecipes] = useState<any[]>([]);
  const [isFetchingRecipes, setIsFetchingRecipes] = useState(false);

  // Load saved recipes on auth change
  useEffect(() => {
    if (isAuthenticated && user) {
      fetchSavedRecipes();
    } else {
      setSavedRecipes([]);
    }
  }, [isAuthenticated, user]);

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

  return {
    fetchSavedRecipes,
    savedRecipes,
    isFetchingRecipes
  };
}
