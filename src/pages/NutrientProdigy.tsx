import { useState } from 'react';
import { ChefHat, Clock, PieChart, Utensils, Volume2, VolumeX, Trash2, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';

const mockRecipe = {
  id: 'high-protein-chicken-quinoa-bowl',
  title: "High-Protein Chicken & Quinoa Power Bowl",
  image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&q=80",
  time: "35 mins",
  calories: "550 kcal",
  macros: {
    protein: "42g",
    carbs: "45g",
    fat: "18g",
    fiber: "8g"
  },
  ingredients: [
    "6 oz grilled chicken breast, sliced",
    "3/4 cup cooked quinoa",
    "1 cup roasted broccoli",
    "1/2 avocado, sliced",
    "1/4 cup cherry tomatoes, halved",
    "2 tbsp pumpkin seeds",
    "1 tbsp olive oil",
    "1 tbsp lemon juice",
    "1 clove garlic, minced",
    "1/2 tsp dried oregano",
    "Salt and pepper to taste",
    "Fresh cilantro for garnish"
  ],
  instructions: [
    "Cook quinoa according to package instructions and let cool slightly.",
    "Season chicken breast with salt, pepper, and garlic powder. Grill until internal temperature reaches 165°F (74°C).",
    "Toss broccoli with 1 tsp olive oil, salt, and pepper. Roast at 425°F (220°C) for 15-20 minutes until crisp-tender.",
    "In a small bowl, whisk together remaining olive oil, lemon juice, garlic, oregano, salt, and pepper to make the dressing.",
    "Assemble the bowl: place quinoa at the base, then arrange chicken, broccoli, avocado, and cherry tomatoes on top.",
    "Sprinkle with pumpkin seeds and drizzle with the prepared dressing.",
    "Garnish with fresh cilantro before serving."
  ],
  category: "Dinner"
};

const dietaryOptions = [
  { value: "vegetarian", label: "Vegetarian"},
  { value: "non-vegetarian", label: "Non Vegetarian" },
  { value: "vegan", label: "Vegan"},
  { value: "eggetarian", label: "Eggetarian"}
];

const mealTypeOptions = [
  { value: "breakfast", label: "Breakfast" },
  { value: "lunch", label: "Lunch" },
  { value: "dinner", label: "Dinner" },
  { value: "snack", label: "Snack" }
];

const NutrientProdigy = () => {
  const [protein, setProtein] = useState(30);
  const [carbs, setCarbs] = useState(45);
  const [fats, setFats] = useState(25);
  const [mealType, setMealType] = useState("");
  const [dietaryRequirements, setDietaryRequirements] = useState<string[]>([]);
  
  const [recipe, setRecipe] = useState<typeof mockRecipe | null>(null);
  const [loading, setLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const { isAuthenticated } = useAuth();
  
  const [selectedDiet, setSelectedDiet] = useState<string>("");
  
  const { playText, isPlaying: textToSpeechIsPlaying } = useTextToSpeech();
  
  const handleMacroChange = (
    value: number, 
    setter: React.Dispatch<React.SetStateAction<number>>,
    otherSetters: Array<React.Dispatch<React.SetStateAction<number>>>
  ) => {
    const remaining = 100 - value;
    const currentOtherValues = otherSetters.map(s => {
      const stateValue = s === setProtein ? protein : s === setCarbs ? carbs : fats;
      return stateValue;
    });
    const currentOtherTotal = currentOtherValues.reduce((a, b) => a + b, 0);
    
    setter(value);
    
    if (currentOtherTotal > 0) {
      const factor = remaining / currentOtherTotal;
      otherSetters.forEach((s, i) => {
        s(Math.round(currentOtherValues[i] * factor));
      });
    }
  };
  
  const totalMacros = protein + carbs + fats;
  
  const generateRecipe = () => {
    if (totalMacros !== 100) {
      alert("Macronutrient percentages must add up to 100%");
      return;
    }
    
    setLoading(true);
    
    setTimeout(() => {
      const recipeWithId = {
        ...mockRecipe,
        id: `${mockRecipe.title.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`
      };
      setRecipe(recipeWithId);
      setLoading(false);
    }, 2000);
  };

  const handlePlayInstructions = () => {
    if (recipe) {
      const instructions = recipe.instructions.join('. ');
      playText(instructions);
    }
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
            <span className="px-3 py-1 bg-cook-secondary/10 text-cook-secondary rounded-full text-sm font-medium">
              Nutrient Prodigy
            </span>
            <h1 className="text-3xl md:text-4xl font-display font-bold mt-4 mb-3">
              Recipes Tailored to Your Nutritional Goals
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Create delicious meals optimized for your specific macronutrient targets and dietary requirements.
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
            
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium">Macronutrient Distribution (%)</label>
                <span className={`text-sm font-medium ${totalMacros === 100 ? 'text-green-500' : 'text-red-500'}`}>
                  Total: {totalMacros}%
                </span>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Protein</span>
                  <span className="text-sm font-medium">{protein}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="60"
                  value={protein}
                  onChange={(e) => handleMacroChange(parseInt(e.target.value), setProtein, [setCarbs, setFats])}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-cook-secondary"
                />
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Carbohydrates</span>
                  <span className="text-sm font-medium">{carbs}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="60"
                  value={carbs}
                  onChange={(e) => handleMacroChange(parseInt(e.target.value), setCarbs, [setProtein, setFats])}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-cook-secondary"
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Fats</span>
                  <span className="text-sm font-medium">{fats}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="60"
                  value={fats}
                  onChange={(e) => handleMacroChange(parseInt(e.target.value), setFats, [setProtein, setCarbs])}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-cook-secondary"
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Meal Type</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {mealTypeOptions.map(option => (
                  <button
                    key={option.value}
                    onClick={() => setMealType(option.value)}
                    className={`px-3 py-2 rounded border text-sm transition-colors ${
                      mealType === option.value
                        ? 'bg-cook-secondary text-white border-cook-secondary'
                        : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mb-8">
              <label className="block text-sm font-medium mb-2">Dietary Preference</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {dietaryOptions.map(option => (
                  <button
                    key={option.value}
                    onClick={() => setSelectedDiet(option.value)}
                    className={`px-3 py-2 rounded border text-sm transition-colors flex items-center justify-center gap-2 ${
                      selectedDiet === option.value
                        ? 'bg-cook-secondary text-white border-cook-secondary'
                        : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            
            <button
              onClick={generateRecipe}
              disabled={loading || totalMacros !== 100 || !mealType}
              className={`w-full py-3 rounded-lg font-medium text-white flex items-center justify-center transition-all ${
                loading || totalMacros !== 100 || !mealType 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-cook-secondary hover:bg-cook-secondary/90'
              }`}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  Generating Recipe...
                </>
              ) : (
                <>
                  <Heart className="mr-2 w-5 h-5" />
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
                
                <div className="grid grid-cols-4 divide-x divide-gray-200 dark:divide-gray-800 border-b border-gray-200 dark:border-gray-800">
                  <MacroNutrient label="Protein" value={recipe.macros.protein} color="bg-blue-500" />
                  <MacroNutrient label="Carbs" value={recipe.macros.carbs} color="bg-green-500" />
                  <MacroNutrient label="Fat" value={recipe.macros.fat} color="bg-yellow-500" />
                  <MacroNutrient label="Fiber" value={recipe.macros.fiber} color="bg-purple-500" />
                </div>
                
                <div className="flex flex-wrap gap-3 p-6 border-b border-gray-200 dark:border-gray-800">
                  <div className="flex items-center gap-1.5 text-sm">
                    <Clock className="w-4 h-4 text-cook-secondary" />
                    <span>{recipe.time}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm">
                    <PieChart className="w-4 h-4 text-cook-secondary" />
                    <span>{recipe.calories}</span>
                  </div>
                  <div className="ml-auto">
                    <button
                      onClick={handlePlayInstructions}
                      className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-cook-secondary/10 text-cook-secondary hover:bg-cook-secondary/20"
                    >
                      {isPlaying || textToSpeechIsPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      {isPlaying || textToSpeechIsPlaying ? "Stop Voice" : "Play Voice Instructions"}
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-bold mb-3 flex items-center">
                        <Utensils className="w-5 h-5 mr-2 text-cook-secondary" />
                        Ingredients
                      </h3>
                      <ul className="space-y-2">
                        {recipe.ingredients.map((ingredient, index) => (
                          <li key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                            <div className="w-1.5 h-1.5 rounded-full bg-cook-secondary mt-2"></div>
                            <span>{ingredient}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-bold mb-3 flex items-center">
                        <ChefHat className="w-5 h-5 mr-2 text-cook-secondary" />
                        Instructions
                      </h3>
                      <ol className="space-y-3">
                        {recipe.instructions.map((instruction, index) => (
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
                  
                  <div className="mt-6 flex justify-end">
                    <button 
                      onClick={() => setRecipe(null)}
                      className="button-outline flex items-center gap-1.5"
                    >
                      <Trash2 className="w-4 h-4" />
                      Clear Recipe
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-gray-50 dark:bg-gray-800/50 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700">
                <Heart className="w-16 h-16 text-gray-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">No Recipe Generated Yet</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
                  Set your macronutrient targets and preferences, then click "Generate Recipe" to get a nutritionally optimized meal!
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
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

export default NutrientProdigy;
