
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Check } from 'lucide-react';

const dietaryOptions = [
  "Vegetarian", "Vegan", "Pescatarian", "Keto", "Paleo", 
  "Gluten-Free", "Dairy-Free", "Low-Carb", "Low-Fat", "Mediterranean"
];

const allergyOptions = [
  "Nuts", "Peanuts", "Dairy", "Eggs", "Shellfish", "Fish", 
  "Soy", "Wheat", "Gluten", "Sesame"
];

const cuisineOptions = [
  "Italian", "Chinese", "Indian", "Mexican", "Japanese", 
  "Thai", "French", "Spanish", "Greek", "Middle Eastern", 
  "American", "Korean", "Vietnamese"
];

const PreferencesForm = () => {
  const { user, updatePreferences } = useAuth();
  
  const [selectedDietary, setSelectedDietary] = useState<string[]>(
    user?.preferences?.dietary || []
  );
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>(
    user?.preferences?.allergies || []
  );
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>(
    user?.preferences?.favoriteCategories || []
  );
  const [weight, setWeight] = useState<number | undefined>(
    user?.preferences?.weight || undefined
  );
  const [height, setHeight] = useState<number | undefined>(
    user?.preferences?.height || undefined
  );
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const handleDietaryToggle = (option: string) => {
    if (selectedDietary.includes(option)) {
      setSelectedDietary(selectedDietary.filter(item => item !== option));
    } else {
      setSelectedDietary([...selectedDietary, option]);
    }
  };
  
  const handleAllergyToggle = (option: string) => {
    if (selectedAllergies.includes(option)) {
      setSelectedAllergies(selectedAllergies.filter(item => item !== option));
    } else {
      setSelectedAllergies([...selectedAllergies, option]);
    }
  };
  
  const handleCuisineToggle = (option: string) => {
    if (selectedCuisines.includes(option)) {
      setSelectedCuisines(selectedCuisines.filter(item => item !== option));
    } else {
      setSelectedCuisines([...selectedCuisines, option]);
    }
  };
  
  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };
  
  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Save preferences
    const preferences = {
      dietary: selectedDietary,
      allergies: selectedAllergies,
      favoriteCategories: selectedCuisines,
      weight,
      height
    };
    
    // Simulate API delay
    setTimeout(() => {
      updatePreferences(preferences);
      setLoading(false);
    }, 1000);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-3xl mx-auto"
    >
      <div className="glass-card rounded-xl p-6 md:p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Complete Your Profile</h2>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-8">
          Help us personalize your experience by sharing your food preferences and details
        </p>
        
        <form onSubmit={handleSubmit}>
          {/* Step 1: Dietary Preferences */}
          {currentStep === 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-semibold mb-4">Dietary Preferences</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Select all that apply to you
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {dietaryOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleDietaryToggle(option)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedDietary.includes(option)
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              
              <div className="flex justify-end mt-8">
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-2 bg-primary text-white rounded-lg flex items-center"
                >
                  Next
                </button>
              </div>
            </motion.div>
          )}
          
          {/* Step 2: Allergies */}
          {currentStep === 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-semibold mb-4">Food Allergies</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Select any allergies or food intolerances you have
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {allergyOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleAllergyToggle(option)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedAllergies.includes(option)
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              
              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-2 border border-gray-300 dark:border-gray-700 rounded-lg"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-2 bg-primary text-white rounded-lg"
                >
                  Next
                </button>
              </div>
            </motion.div>
          )}
          
          {/* Step 3: Favorite Cuisines */}
          {currentStep === 3 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-semibold mb-4">Favorite Cuisines</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Select cuisines you enjoy the most
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {cuisineOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleCuisineToggle(option)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedCuisines.includes(option)
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              
              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-2 border border-gray-300 dark:border-gray-700 rounded-lg"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-2 bg-primary text-white rounded-lg"
                >
                  Next
                </button>
              </div>
            </motion.div>
          )}
          
          {/* Step 4: Personal Stats */}
          {currentStep === 4 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-semibold mb-4">Personal Stats</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Optional: Add your weight and height for more personalized nutrition recommendations
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="weight" className="block text-sm font-medium mb-2">
                    Weight (kg)
                  </label>
                  <input
                    id="weight"
                    type="number"
                    value={weight || ''}
                    onChange={(e) => setWeight(Number(e.target.value) || undefined)}
                    className="input-field w-full"
                    placeholder="Enter your weight in kg"
                  />
                </div>
                
                <div>
                  <label htmlFor="height" className="block text-sm font-medium mb-2">
                    Height (cm)
                  </label>
                  <input
                    id="height"
                    type="number"
                    value={height || ''}
                    onChange={(e) => setHeight(Number(e.target.value) || undefined)}
                    className="input-field w-full"
                    placeholder="Enter your height in cm"
                  />
                </div>
              </div>
              
              <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                <p>This information is optional and will only be used to provide you with personalized nutrition recommendations.</p>
              </div>
              
              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-2 border border-gray-300 dark:border-gray-700 rounded-lg"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-6 py-2 rounded-lg font-medium text-white flex items-center ${
                    loading ? 'bg-primary/70' : 'bg-primary'
                  }`}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Check className="w-5 h-5 mr-2" />
                      Save Preferences
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </form>
      </div>
    </motion.div>
  );
};

export default PreferencesForm;
