import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChefHat } from 'lucide-react';

const NutrientProdigy = () => {
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState<any>(null);
  const [nutritionGoals, setNutritionGoals] = useState({
    calories: "",
    protein: "",
    carbs: "",
    fats: ""
  });
  
  const generateRecipe = () => {
    setLoading(true);
    
    // Mock high-protein recipe
    setTimeout(() => {
      const mockRecipe = {
        title: "High-Protein Chicken Quinoa Bowl",
        image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80",
        time: "35 mins",
        nutrition: {
          calories: "450 kcal",
          protein: "42g",
          carbs: "48g",
          fats: "12g"
        },
        ingredients: [
          "200g chicken breast",
          "1 cup quinoa",
          "2 cups mixed vegetables",
          "1 tbsp olive oil",
          "2 tbsp soy sauce",
          "1 tsp sesame oil",
          "1 tbsp honey",
          "Sesame seeds for garnish"
        ],
        instructions: [
          "Cook quinoa according to package instructions.",
          "Season chicken breast with salt and pepper.",
          "Grill chicken until fully cooked, about 6-8 minutes per side.",
          "Steam or stir-fry mixed vegetables until tender-crisp.",
          "Slice chicken and arrange over quinoa with vegetables.",
          "Mix soy sauce, sesame oil, and honey for dressing.",
          "Drizzle with dressing and sprinkle with sesame seeds.",
          "Serve immediately while warm."
        ]
      };
      
      setRecipe(mockRecipe);
      setLoading(false);
    }, 2000);
  };
  
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="px-3 py-1 bg-violet-500/10 text-violet-500 rounded-full text-sm font-medium">
              Nutrient Prodigy
            </span>
            <h1 className="text-3xl md:text-4xl font-display font-bold mt-4 mb-3">
              Generate Recipes Based on Nutritional Goals
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Input your nutritional requirements and let us create the perfect recipe for your dietary needs.
            </p>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card rounded-xl p-6"
          >
            <h2 className="text-2xl font-bold mb-6">Set Your Nutritional Goals</h2>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">Target Calories</label>
                <input
                  type="number"
                  value={nutritionGoals.calories}
                  onChange={(e) => setNutritionGoals({ ...nutritionGoals, calories: e.target.value })}
                  placeholder="e.g. 500"
                  className="input-field w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Protein (g)</label>
                <input
                  type="number"
                  value={nutritionGoals.protein}
                  onChange={(e) => setNutritionGoals({ ...nutritionGoals, protein: e.target.value })}
                  placeholder="e.g. 30"
                  className="input-field w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Carbs (g)</label>
                <input
                  type="number"
                  value={nutritionGoals.carbs}
                  onChange={(e) => setNutritionGoals({ ...nutritionGoals, carbs: e.target.value })}
                  placeholder="e.g. 50"
                  className="input-field w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Fats (g)</label>
                <input
                  type="number"
                  value={nutritionGoals.fats}
                  onChange={(e) => setNutritionGoals({ ...nutritionGoals, fats: e.target.value })}
                  placeholder="e.g. 20"
                  className="input-field w-full"
                />
              </div>
            </div>
            
            <button
              onClick={generateRecipe}
              disabled={loading}
              className={`w-full py-3 rounded-lg font-medium text-white flex items-center justify-center transition-all ${
                loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-violet-500 hover:bg-violet-600'
              }`}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  Generating Recipe...
                </>
              ) : (
                <>
                  <ChefHat className="mr-2 w-5 h-5" />
                  Generate Recipe
                </>
              )}
            </button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {recipe ? (
              <div className="glass-card rounded-xl overflow-hidden">
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
                
                <div className="p-6">
                  <div className="grid grid-cols-4 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-sm text-gray-600 dark:text-gray-400">Calories</div>
                      <div className="font-bold">{recipe.nutrition.calories}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-600 dark:text-gray-400">Protein</div>
                      <div className="font-bold">{recipe.nutrition.protein}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-600 dark:text-gray-400">Carbs</div>
                      <div className="font-bold">{recipe.nutrition.carbs}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-600 dark:text-gray-400">Fats</div>
                      <div className="font-bold">{recipe.nutrition.fats}</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-bold mb-3">Ingredients</h3>
                      <ul className="space-y-2">
                        {recipe.ingredients.map((ingredient: string, index: number) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-2"></div>
                            <span>{ingredient}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-bold mb-3">Instructions</h3>
                      <ol className="space-y-3">
                        {recipe.instructions.map((instruction: string, index: number) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-violet-500/10 text-violet-500 flex items-center justify-center text-sm font-medium">
                              {index + 1}
                            </div>
                            <span>{instruction}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-gray-50 dark:bg-gray-800/50 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700">
                <ChefHat className="w-16 h-16 text-gray-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">No Recipe Generated Yet</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
                  Set your nutritional goals and click "Generate Recipe" to get a customized recipe that meets your requirements!
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default NutrientProdigy;
