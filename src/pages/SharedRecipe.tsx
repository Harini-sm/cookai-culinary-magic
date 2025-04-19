
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ChefHat, Clock, PieChart, Utensils, Bookmark, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { getSharedRecipe } from '@/firebase';
import { useRecipes } from '@/hooks/useRecipes';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import SocialShareModal from '@/components/modals/SocialShareModal';

const SharedRecipe = () => {
  const { shareId } = useParams<{ shareId: string }>();
  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  
  const { isAuthenticated } = useAuth();
  const { saveRecipe, shareRecipe, isLoading, socialShareLinks } = useRecipes();
  
  useEffect(() => {
    async function fetchSharedRecipe() {
      if (!shareId) return;
      
      try {
        const result = await getSharedRecipe(shareId);
        if (result.success) {
          setRecipe(result.recipe);
        } else {
          setError(result.message || "Recipe not found");
        }
      } catch (err) {
        console.error("Error fetching shared recipe:", err);
        setError("An error occurred while fetching the recipe");
      } finally {
        setLoading(false);
      }
    }
    
    fetchSharedRecipe();
  }, [shareId]);
  
  const handleSaveRecipe = async () => {
    if (!recipe) return;
    await saveRecipe(recipe);
  };
  
  const handleShareRecipe = async () => {
    if (!recipe) return;
    const result = await shareRecipe(recipe);
    if (result.success) {
      setShowShareModal(true);
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (error || !recipe) {
    return (
      <div className="min-h-screen pt-24 pb-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
            <h1 className="text-2xl font-bold mb-4">Recipe Not Found</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">{error || "The shared recipe could not be found."}</p>
            <Link to="/" className="button-primary">
              Go Home
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="glass-card rounded-xl overflow-hidden">
              {/* Recipe Header with Image */}
              <div className="relative">
                <img 
                  src={recipe.image} 
                  alt={recipe.title} 
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-white">{recipe.title}</h2>
                  </div>
                </div>
              </div>
              
              {/* Macronutrient Info */}
              <div className="grid grid-cols-4 divide-x divide-gray-200 dark:divide-gray-800 border-b border-gray-200 dark:border-gray-800">
                <MacroNutrient label="Protein" value={recipe.macros.protein} color="bg-blue-500" />
                <MacroNutrient label="Carbs" value={recipe.macros.carbs} color="bg-green-500" />
                <MacroNutrient label="Fat" value={recipe.macros.fat} color="bg-yellow-500" />
                <MacroNutrient label="Fiber" value={recipe.macros.fiber} color="bg-purple-500" />
              </div>
              
              {/* Recipe Info Badges */}
              <div className="flex flex-wrap gap-3 p-6 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-1.5 text-sm">
                  <Clock className="w-4 h-4 text-cook-secondary" />
                  <span>{recipe.time}</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm">
                  <PieChart className="w-4 h-4 text-cook-secondary" />
                  <span>{recipe.calories}</span>
                </div>
              </div>
              
              {/* Recipe Content */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Ingredients */}
                  <div>
                    <h3 className="text-lg font-bold mb-3 flex items-center">
                      <Utensils className="w-5 h-5 mr-2 text-cook-secondary" />
                      Ingredients
                    </h3>
                    <ul className="space-y-2">
                      {recipe.ingredients.map((ingredient: string, index: number) => (
                        <li key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                          <div className="w-1.5 h-1.5 rounded-full bg-cook-secondary mt-2"></div>
                          <span>{ingredient}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Instructions */}
                  <div>
                    <h3 className="text-lg font-bold mb-3 flex items-center">
                      <ChefHat className="w-5 h-5 mr-2 text-cook-secondary" />
                      Instructions
                    </h3>
                    <ol className="space-y-3">
                      {recipe.instructions.map((instruction: string, index: number) => (
                        <li key={index} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-cook-secondary/10 text-cook-secondary flex items-center justify-center text-sm font-medium">
                            {index + 1}
                          </div>
                          <span>{instruction}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
                
                {/* Actions */}
                {isAuthenticated && (
                  <div className="mt-6 flex justify-end">
                    <div className="flex gap-3">
                      <button 
                        onClick={handleSaveRecipe}
                        disabled={isLoading}
                        className={`button-secondary flex items-center gap-1.5 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                      >
                        <Bookmark className="w-4 h-4" />
                        Save Recipe
                      </button>
                      <button 
                        onClick={handleShareRecipe}
                        disabled={isLoading}
                        className={`button-primary flex items-center gap-1.5 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                      >
                        <Share2 className="w-4 h-4" />
                        Share Recipe
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {showShareModal && socialShareLinks && (
        <SocialShareModal
          isOpen={showShareModal}
          onClose={() => setShowShareModal(false)}
          recipeTitle={recipe.title}
          shareUrl={`${window.location.origin}/shared-recipe/${shareId}`}
          socialLinks={socialShareLinks}
        />
      )}
    </div>
  );
};

type MacroNutrientProps = {
  label: string;
  value: string;
  color: string;
};

const MacroNutrient = ({ label, value, color }: MacroNutrientProps) => (
  <div className="p-4 text-center">
    <div className={`w-3 h-3 rounded-full ${color} mx-auto mb-2`}></div>
    <div className="text-sm font-medium">{value}</div>
    <div className="text-xs text-gray-500">{label}</div>
  </div>
);

export default SharedRecipe;
