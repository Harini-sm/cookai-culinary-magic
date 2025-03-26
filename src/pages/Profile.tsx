
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, LogOut, Heart, Share2, Star, Clock, Search, Filter } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import PreferencesForm from '@/components/profile/PreferencesForm';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, isAuthenticated, hasCompletedPreferences, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('saved');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const navigate = useNavigate();
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-24 pb-20 flex flex-col items-center justify-center text-center px-4">
        <div className="mb-6 text-5xl">👨‍🍳</div>
        <h1 className="text-3xl font-display font-bold mb-4">Login Required</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
          Please log in to view your profile and saved recipes.
        </p>
        <button 
          onClick={() => navigate('/login')}
          className="px-6 py-3 bg-primary text-white rounded-lg font-medium"
        >
          Go to Login
        </button>
      </div>
    );
  }
  
  // Show preferences form if user hasn't completed it yet
  if (!hasCompletedPreferences) {
    return (
      <div className="min-h-screen pt-24 pb-20">
        <div className="container mx-auto px-4">
          <PreferencesForm />
        </div>
      </div>
    );
  }

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
                src={user?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&q=60&w=300&h=300"} 
                alt={user?.name || "User"} 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* User Info */}
            <div className="flex-grow">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <div className="text-center md:text-left mb-4 md:mb-0">
                  <h1 className="text-3xl font-display font-bold mb-1">{user?.name}</h1>
                  <p className="text-gray-600 dark:text-gray-400">@{user?.username} • Joined {user?.joinedDate}</p>
                </div>
                
                <div className="flex items-center gap-3">
                  <button 
                    className="button-outline flex items-center gap-2"
                    onClick={() => navigate('/settings')}
                  >
                    <Settings className="w-4 h-4" />
                    Settings
                  </button>
                  <button 
                    className="button-outline flex items-center gap-2 text-red-500 hover:text-red-600 hover:border-red-300"
                    onClick={logout}
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </div>
              
              {/* User Preferences */}
              {user?.preferences && (
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
                  <h3 className="font-bold mb-3">Your Preferences</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Dietary Preferences</h4>
                      <div className="flex flex-wrap gap-2">
                        {user.preferences.dietary?.map((item, index) => (
                          <span 
                            key={index}
                            className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm"
                          >
                            {item}
                          </span>
                        ))}
                        {!user.preferences.dietary?.length && (
                          <span className="text-gray-500 dark:text-gray-400 text-sm">No preferences set</span>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Allergies</h4>
                      <div className="flex flex-wrap gap-2">
                        {user.preferences.allergies?.map((item, index) => (
                          <span 
                            key={index}
                            className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full text-sm"
                          >
                            {item}
                          </span>
                        ))}
                        {!user.preferences.allergies?.length && (
                          <span className="text-gray-500 dark:text-gray-400 text-sm">No allergies set</span>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Favorite Cuisines</h4>
                      <div className="flex flex-wrap gap-2">
                        {user.preferences.favoriteCategories?.map((item, index) => (
                          <span 
                            key={index}
                            className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm"
                          >
                            {item}
                          </span>
                        ))}
                        {!user.preferences.favoriteCategories?.length && (
                          <span className="text-gray-500 dark:text-gray-400 text-sm">No favorites set</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
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
        
        {/* Empty State - No Saved Recipes Yet */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center py-16"
        >
          <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-bold mb-3">No recipes yet</h3>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8">
            You haven't saved any recipes yet. Explore our features to discover delicious recipes and save them to your profile.
          </p>
          <button 
            onClick={() => navigate('/pantry-prodigy')}
            className="button-primary"
          >
            Explore Recipes
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
