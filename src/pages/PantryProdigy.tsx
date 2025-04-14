import { useState } from 'react';
import { Minus, Plus, ChefHat, Clock, PieChart, Utensils, Volume2, VolumeX, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Egg, Leaf, Drumstick } from 'lucide-react';

// Mock recipe data for demonstration
const mockRecipe = {
  title: "Garlic Butter Shrimp Pasta",
  image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&q=80",
  time: "20 mins",
  calories: "520 kcal",
  difficulty: "Easy",
  ingredients: [
    "8 oz fettuccine pasta",
    "1 lb large shrimp, peeled and deveined",
    "4 tbsp butter",
    "4 cloves garlic, minced",
    "1/2 tsp red pepper flakes",
    "1/4 cup white wine",
    "2 tbsp lemon juice",
    "1/4 cup chopped parsley",
    "Salt and pepper to taste",
    "Grated Parmesan cheese for serving"
  ],
  instructions: [
    "Cook pasta according to package directions. Reserve 1/2 cup pasta water before draining.",
    "In a large skillet, melt 2 tablespoons of butter over medium-high heat.",
    "Add shrimp in a single layer and cook until pink, about 1-2 minutes per side. Transfer to a plate.",
    "In the same skillet, add remaining butter and garlic. Cook until fragrant, about 30 seconds.",
    "Add red pepper flakes and white wine. Simmer until reduced by half, about 2 minutes.",
    "Return shrimp to skillet along with lemon juice, cooked pasta, and a splash of pasta water.",
    "Toss until well coated and heated through. Add more pasta water if needed for sauce consistency.",
    "Stir in chopped parsley and season with salt and pepper.",
    "Serve immediately with grated Parmesan cheese."
  ]
};

const PantryProdigy = () => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [newIngredient, setNewIngredient] = useState("");
  const [mealType, setMealType] = useState("");
  const [dietaryRequirements, setDietaryRequirements] = useState<string[]>([]);
  const [timeLimit, setTimeLimit] = useState("30");
  const [skillLevel, setSkillLevel] = useState("beginner");
  
  const [recipe, setRecipe] = useState<typeof mockRecipe | null>(null);
  const [loading, setLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Add an ingredient to the list
  const addIngredient = () => {
    if (newIngredient.trim() && !ingredients.includes(newIngredient.trim())) {
      setIngredients([...ingredients, newIngredient.trim()]);
      setNewIngredient("");
    }
  };
  
  // Remove an ingredient from the list
  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };
  
  // Toggle dietary requirement selection
  const toggleDietaryRequirement = (requirement: string) => {
    if (dietaryRequirements.includes(requirement)) {
      setDietaryRequirements(dietaryRequirements.filter(r => r !== requirement));
    } else {
      setDietaryRequirements([requirement]);
    }
  };
  
  // Generate recipe based on inputs
  const generateRecipe = () => {
    if (ingredients.length === 0) {
      alert("Please add at least one ingredient");
      return;
    }
    
    setLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setRecipe(mockRecipe);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
              Pantry Prodigy
            </span>
            <h1 className="text-3xl md:text-4xl font-display font-bold mt-4 mb-3">
              Create Recipes from Your Available Ingredients
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Tell us what's in your pantry, and we'll create a delicious recipe that uses what you have on hand.
            </p>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Input Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card rounded-xl p-6"
          >
            <h2 className="text-2xl font-bold mb-6">What's in your pantry?</h2>
            
            {/* Ingredients Input */}
            <div className="mb-8">
              <label className="block text-sm font-medium mb-2">Add Available Ingredients</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newIngredient}
                  onChange={(e) => setNewIngredient(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addIngredient()}
                  placeholder="e.g. Chicken, Rice, Olive Oil"
                  className="input-field flex-grow"
                />
                <button 
                  onClick={addIngredient}
                  className="button-primary"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              
              {/* Ingredients List */}
              {ingredients.length > 0 && (
                <div className="mt-4">
                  <div className="text-sm font-medium mb-2">Your Ingredients:</div>
                  <div className="flex flex-wrap gap-2">
                    {ingredients.map((ingredient, index) => (
                      <div 
                        key={index}
                        className="bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full flex items-center gap-1.5 text-sm"
                      >
                        {ingredient}
                        <button 
                          onClick={() => removeIngredient(index)} 
                          className="text-red-500 hover:text-red-700"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Meal Type */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Select Meal Type</label>
              <select 
                value={mealType} 
                onChange={(e) => setMealType(e.target.value)}
                className="input-field w-full"
              >
                <option value="">Select a meal type</option>
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="appetizer">Appetizer</option>
                <option value="dessert">Dessert</option>
                <option value="snack">Snack</option>
              </select>
            </div>
            
            {/* Dietary Requirements */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Dietary Preferences</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { name: 'Vegetarian', icon: Leaf },
                  { name: 'Vegan', icon: Leaf },
                  { name: 'Non-Vegetarian', icon: Drumstick },
                  { name: 'Eggitarian', icon: Egg }
                ].map(({ name, icon: Icon }) => (
                  <button
                    key={name}
                    onClick={() => toggleDietaryRequirement(name)}
                    className={`px-4 py-2 rounded border text-sm transition-colors flex items-center justify-center gap-2 ${
                      dietaryRequirements.includes(name)
                        ? 'bg-primary text-white border-primary'
                        : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {name}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Time Limit & Skill Level */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div>
                <label className="block text-sm font-medium mb-2">Time Limit (minutes)</label>
                <input
                  type="number"
                  min="5"
                  max="180"
                  value={timeLimit}
                  onChange={(e) => setTimeLimit(e.target.value)}
                  className="input-field w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Cooking Skill Level</label>
                <select 
                  value={skillLevel} 
                  onChange={(e) => setSkillLevel(e.target.value)}
                  className="input-field w-full"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </div>
            
            {/* Generate Button */}
            <button
              onClick={generateRecipe}
              disabled={loading || ingredients.length === 0}
              className={`w-full py-3 rounded-lg font-medium text-white flex items-center justify-center transition-all ${
                loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-primary/90'
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
          
          {/* Recipe Display */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {recipe ? (
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
                
                {/* Recipe Info Badges */}
                <div className="flex flex-wrap gap-3 p-6 border-b border-gray-200 dark:border-gray-800">
                  <div className="flex items-center gap-1.5 text-sm">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>{recipe.time}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm">
                    <PieChart className="w-4 h-4 text-primary" />
                    <span>{recipe.calories}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm">
                    <ChefHat className="w-4 h-4 text-primary" />
                    <span>{recipe.difficulty}</span>
                  </div>
                  <div className="ml-auto">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20"
                    >
                      {isPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      {isPlaying ? "Stop Voice" : "Play Voice Instructions"}
                    </button>
                  </div>
                </div>
                
                {/* Recipe Content */}
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Ingredients */}
                    <div>
                      <h3 className="text-lg font-bold mb-3 flex items-center">
                        <Utensils className="w-5 h-5 mr-2 text-primary" />
                        Ingredients
                      </h3>
                      <ul className="space-y-2">
                        {recipe.ingredients.map((ingredient, index) => (
                          <li key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                            <span>{ingredient}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Instructions */}
                    <div>
                      <h3 className="text-lg font-bold mb-3 flex items-center">
                        <ChefHat className="w-5 h-5 mr-2 text-primary" />
                        Instructions
                      </h3>
                      <ol className="space-y-3">
                        {recipe.instructions.map((instruction, index) => (
                          <li key={index} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-medium">
                              {index + 1}
                            </div>
                            <span>{instruction}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="mt-6 flex justify-between">
                    <button 
                      onClick={() => setRecipe(null)}
                      className="button-outline flex items-center gap-1.5"
                    >
                      <Trash2 className="w-4 h-4" />
                      Clear Recipe
                    </button>
                    
                    <div className="flex gap-3">
                      <button className="button-secondary">
                        Save Recipe
                      </button>
                      <button className="button-primary">
                        Share Recipe
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-gray-50 dark:bg-gray-800/50 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700">
                <ChefHat className="w-16 h-16 text-gray-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">No Recipe Generated Yet</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
                  Add your available ingredients and preferences, then click "Generate Recipe" to see what you can cook!
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PantryProdigy;
