import { useState } from 'react';
import { ChefHat, Clock, PieChart, Utensils, Volume2, VolumeX, Trash2, Search, Egg, Leaf, Drumstick } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';

const mockRecipe = {
  title: "Mediterranean Chickpea Buddha Bowl",
  image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&q=80",
  time: "25 mins",
  calories: "480 kcal",
  difficulty: "Easy",
  ingredients: [
    "1 cup cooked quinoa",
    "1 cup chickpeas, drained and rinsed",
    "1 cucumber, diced",
    "1 cup cherry tomatoes, halved",
    "1/2 red onion, thinly sliced",
    "1/4 cup Kalamata olives, pitted",
    "1/4 cup feta cheese, crumbled",
    "2 tbsp extra virgin olive oil",
    "1 tbsp lemon juice",
    "1 clove garlic, minced",
    "1 tsp dried oregano",
    "Salt and pepper to taste",
    "Fresh parsley for garnish"
  ],
  instructions: [
    "Cook quinoa according to package instructions and let cool slightly.",
    "In a small bowl, whisk together olive oil, lemon juice, garlic, oregano, salt, and pepper to make the dressing.",
    "In a large bowl, combine cooked quinoa, chickpeas, cucumber, cherry tomatoes, red onion, and olives.",
    "Drizzle the dressing over the salad and toss to combine.",
    "Transfer to serving bowls and top with crumbled feta cheese.",
    "Garnish with fresh parsley before serving.",
    "For meal prep, store in airtight containers in the refrigerator for up to 3 days."
  ]
};

const dietaryOptions = [
  { value: "vegetarian", label: "Vegetarian" },
  { value: "vegan", label: "Vegan" },
  { value: "pescatarian", label: "Pescatarian" },
  { value: "gluten-free", label: "Gluten-Free" },
  { value: "dairy-free", label: "Dairy-Free" },
  { value: "keto", label: "Keto" },
  { value: "paleo", label: "Paleo" }
];

const PlateProdigy = () => {
  const [recipeQuery, setRecipeQuery] = useState("");
  const [servings, setServings] = useState("2");
  const [cookingTime, setCookingTime] = useState("30");
  const [skillLevel, setSkillLevel] = useState("beginner");
  const [dietaryRequirements, setDietaryRequirements] = useState<string[]>([]);
  
  const [recipe, setRecipe] = useState<typeof mockRecipe | null>(null);
  const [loading, setLoading] = useState(false);
  
  const { isPlaying, playText, stopPlaying } = useTextToSpeech();
  
  const toggleDietaryRequirement = (value: string) => {
    if (dietaryRequirements.includes(value)) {
      setDietaryRequirements(dietaryRequirements.filter(r => r !== value));
    } else {
      setDietaryRequirements([value]);
    }
  };
  
  const generateRecipe = () => {
    if (!recipeQuery.trim()) {
      alert("Please enter a recipe or dish type");
      return;
    }
    
    setLoading(true);
    
    setTimeout(() => {
      const mockRecipe = {
        title: "Greek Moussaka",
        image: "https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=800&q=80",
        time: "75 mins",
        calories: "650 kcal",
        difficulty: skillLevel,
        ingredients: [
          "2 large eggplants, sliced",
          "500g ground lamb",
          "1 onion, finely chopped",
          "3 cloves garlic, minced",
          "2 tbsp tomato paste",
          "1 can crushed tomatoes",
          "2 tbsp fresh parsley, chopped",
          "1 tsp ground cinnamon",
          "1/2 tsp ground allspice",
          "2 cups bechamel sauce",
          "1 cup grated Parmesan cheese",
          "Salt and pepper to taste",
          "Olive oil for cooking"
        ],
        instructions: [
          "Slice eggplants and salt them to remove bitterness. Let sit for 30 minutes.",
          "Meanwhile, prepare meat sauce by browning lamb with onions and garlic.",
          "Add tomato paste, crushed tomatoes, and spices. Simmer for 20 minutes.",
          "Rinse and pat dry eggplant slices. Brush with olive oil and grill until tender.",
          "Prepare bechamel sauce if not already made.",
          "Layer in baking dish: eggplant, meat sauce, bechamel, cheese.",
          "Repeat layers ending with bechamel and cheese on top.",
          "Bake at 350°F (175°C) for 45 minutes until golden brown.",
          "Let rest for 15 minutes before serving."
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
            <span className="px-3 py-1 bg-cook-accent/10 text-cook-accent rounded-full text-sm font-medium">
              Plate Prodigy
            </span>
            <h1 className="text-3xl md:text-4xl font-display font-bold mt-4 mb-3">
              Customize Recipes to Your Preferences
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Select a specific recipe or type of dish and let AI adapt it to your preferences and dietary needs.
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
            <h2 className="text-2xl font-bold mb-6">Customize Your Recipe</h2>
            
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Enter Recipe or Dish Type</label>
              <div className="relative">
                <input
                  type="text"
                  value={recipeQuery}
                  onChange={(e) => setRecipeQuery(e.target.value)}
                  placeholder="e.g. Pasta Carbonara, Vegetable Curry, Breakfast Bowl"
                  className="input-field w-full pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">Number of Servings</label>
                <select 
                  value={servings} 
                  onChange={(e) => setServings(e.target.value)}
                  className="input-field w-full"
                >
                  <option value="1">1 serving</option>
                  <option value="2">2 servings</option>
                  <option value="4">4 servings</option>
                  <option value="6">6 servings</option>
                  <option value="8">8 servings</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Cooking Time (minutes)</label>
                <input
                  type="number"
                  min="5"
                  max="180"
                  value={cookingTime}
                  onChange={(e) => setCookingTime(e.target.value)}
                  className="input-field w-full"
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Cooking Skill Level</label>
              <div className="grid grid-cols-3 gap-3">
                {["beginner", "intermediate", "advanced"].map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setSkillLevel(level)}
                    className={`py-2 rounded-lg border text-sm capitalize transition-colors ${
                      skillLevel === level 
                        ? 'bg-cook-accent text-white border-cook-accent'
                        : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Dietary Preference</label>
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-2">
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
                        ? 'bg-cook-accent text-white border-cook-accent'
                        : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {name}
                  </button>
                ))}
              </div>
            </div>
            
            <button
              onClick={generateRecipe}
              disabled={loading || !recipeQuery.trim()}
              className={`w-full py-3 rounded-lg font-medium text-white flex items-center justify-center transition-all ${
                loading || !recipeQuery.trim() ? 'bg-gray-400 cursor-not-allowed' : 'bg-cook-accent hover:bg-cook-accent/90'
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
                
                <div className="flex flex-wrap gap-3 p-6 border-b border-gray-200 dark:border-gray-800">
                  <div className="flex items-center gap-1.5 text-sm">
                    <Clock className="w-4 h-4 text-cook-accent" />
                    <span>{recipe.time}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm">
                    <PieChart className="w-4 h-4 text-cook-accent" />
                    <span>{recipe.calories}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm">
                    <ChefHat className="w-4 h-4 text-cook-accent" />
                    <span>{recipe.difficulty}</span>
                  </div>
                  <div className="ml-auto">
                    <button
                      onClick={() => {
                        const instructionsText = recipe.instructions.join('. ');
                        playText(instructionsText);
                      }}
                      className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-cook-accent/10 text-cook-accent hover:bg-cook-accent/20"
                    >
                      {isPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      {isPlaying ? "Stop Voice" : "Play Voice Instructions"}
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-bold mb-3 flex items-center">
                        <Utensils className="w-5 h-5 mr-2 text-cook-accent" />
                        Ingredients
                      </h3>
                      <ul className="space-y-2">
                        {recipe.ingredients.map((ingredient, index) => (
                          <li key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                            <div className="w-1.5 h-1.5 rounded-full bg-cook-accent mt-2"></div>
                            <span>{ingredient}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-bold mb-3 flex items-center">
                        <ChefHat className="w-5 h-5 mr-2 text-cook-accent" />
                        Instructions
                      </h3>
                      <ol className="space-y-3">
                        {recipe.instructions.map((instruction, index) => (
                          <li key={index} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-cook-accent/10 text-cook-accent flex items-center justify-center text-sm font-medium">
                              {index + 1}
                            </div>
                            <span>{instruction}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                  
                  <div className="mt-6">
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
                <ChefHat className="w-16 h-16 text-gray-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">No Recipe Generated Yet</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
                  Enter a recipe or dish type, set your preferences, and click "Generate Recipe" to see a customized version!
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PlateProdigy;
