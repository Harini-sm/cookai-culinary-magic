
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, LogOut, Heart, Share2, Star, Clock, Search, Filter, Trash2 } from 'lucide-react';

// Mock data for saved recipes
const savedRecipes = [
  {
    id: 1,
    title: "Garlic Butter Shrimp Pasta",
    image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&q=80",
    cookingTime: "20 min",
    difficulty: "Easy",
    rating: 4.5,
    category: "Dinner"
  },
  {
    id: 2,
    title: "Mediterranean Chickpea Bowl",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&q=80",
    cookingTime: "25 min",
    difficulty: "Easy",
    rating: 4.8,
    category: "Lunch"
  },
  {
    id: 3,
    title: "Classic French Toast",
    image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&q=80",
    cookingTime: "15 min",
    difficulty: "Easy",
    rating: 4.3,
    category: "Breakfast"
  },
  {
    id: 4,
    title: "Spicy Thai Basil Chicken",
    image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&q=80",
    cookingTime: "30 min",
    difficulty: "Medium",
    rating: 4.7,
    category: "Dinner"
  }
];

// Mock user data
const user = {
  name: "Alex Johnson",
  username: "alexj",
  email: "alex.johnson@example.com",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&q=60&w=300&h=300",
  joinedDate: "January 2023",
  preferences: {
    dietary: ["Vegetarian", "Gluten-Free"],
    allergies: ["Peanuts", "Shellfish"],
    favoriteCategories: ["Italian", "Thai", "Mexican"]
  }
};

const Profile = () => {
  const [activeTab, setActiveTab] = useState('saved');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  
  // Filter recipes based on search query and category
  const filteredRecipes = savedRecipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || recipe.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Avatar */}
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* User Info */}
            <div className="flex-grow">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <div className="text-center md:text-left mb-4 md:mb-0">
                  <h1 className="text-3xl font-display font-bold mb-1">{user.name}</h1>
                  <p className="text-gray-600 dark:text-gray-400">@{user.username} • Joined {user.joinedDate}</p>
                </div>
                
                <div className="flex items-center gap-3">
                  <button className="button-outline flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    Settings
                  </button>
                  <button className="button-outline flex items-center gap-2 text-red-500 hover:text-red-600 hover:border-red-300">
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </div>
              
              {/* User Preferences */}
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
                <h3 className="font-bold mb-3">Your Preferences</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Dietary Preferences</h4>
                    <div className="flex flex-wrap gap-2">
                      {user.preferences.dietary.map((item, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Allergies</h4>
                    <div className="flex flex-wrap gap-2">
                      {user.preferences.allergies.map((item, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full text-sm"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Favorite Cuisines</h4>
                    <div className="flex flex-wrap gap-2">
                      {user.preferences.favoriteCategories.map((item, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Tabs */}
        <div className="mb-8 border-b border-gray-200 dark:border-gray-800">
          <div className="flex overflow-x-auto hide-scrollbar">
            <button
              onClick={() => setActiveTab('saved')}
              className={`px-6 py-4 font-medium text-sm transition-colors border-b-2 ${
                activeTab === 'saved' 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              Saved Recipes
            </button>
            
            <button
              onClick={() => setActiveTab('history')}
              className={`px-6 py-4 font-medium text-sm transition-colors border-b-2 ${
                activeTab === 'history' 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              Recipe History
            </button>
            
            <button
              onClick={() => setActiveTab('favorite')}
              className={`px-6 py-4 font-medium text-sm transition-colors border-b-2 ${
                activeTab === 'favorite' 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              Favorite Recipes
            </button>
            
            <button
              onClick={() => setActiveTab('shared')}
              className={`px-6 py-4 font-medium text-sm transition-colors border-b-2 ${
                activeTab === 'shared' 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              Shared Recipes
            </button>
          </div>
        </div>
        
        {/* Search and Filter Bar */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="flex-grow relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search recipes..."
              className="input-field w-full pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
          
          <div className="sm:w-64 relative">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="input-field w-full appearance-none pl-10 pr-10"
            >
              <option value="All">All Categories</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
              <option value="Dessert">Dessert</option>
              <option value="Snack">Snack</option>
            </select>
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>
        
        {/* Recipes Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {filteredRecipes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-bold mb-2">No recipes found</h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                We couldn't find any recipes matching your search criteria. Try adjusting your filters or search query.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

type RecipeCardProps = {
  recipe: typeof savedRecipes[0];
};

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card rounded-xl overflow-hidden h-full flex flex-col"
    >
      <div className="relative">
        <img 
          src={recipe.image} 
          alt={recipe.title} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 flex gap-2">
          <button className="w-8 h-8 rounded-full bg-white/90 dark:bg-black/50 flex items-center justify-center text-red-500 hover:bg-white hover:text-red-600 transition-colors">
            <Heart className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 rounded-full bg-white/90 dark:bg-black/50 flex items-center justify-center text-blue-500 hover:bg-white hover:text-blue-600 transition-colors">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
        
        {/* Category Label */}
        <div className="absolute bottom-2 left-2 px-2 py-1 rounded-full bg-black/50 text-white text-xs">
          {recipe.category}
        </div>
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="font-bold text-lg mb-2">{recipe.title}</h3>
        
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400">
            <Clock className="w-4 h-4" />
            <span>{recipe.cookingTime}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400">
            <Star className="w-4 h-4 text-yellow-500" />
            <span>{recipe.rating}</span>
          </div>
        </div>
        
        <div className="mt-auto flex justify-between">
          <button className="text-sm text-red-500 flex items-center gap-1.5 hover:text-red-600">
            <Trash2 className="w-4 h-4" />
            Remove
          </button>
          <button className="text-sm text-primary flex items-center gap-1.5 hover:underline">
            View Recipe
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;
