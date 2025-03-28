
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import { auth, provider, signInWithPopup } from "@/firebase";
import { FirebaseError } from 'firebase/app';

// Define types
type User = {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar?: string;
  preferences?: {
    dietary?: string[];
    allergies?: string[];
    favoriteCategories?: string[];
    weight?: number;
    height?: number;
  };
  joinedDate: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  signup: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  updatePreferences: (preferences: User['preferences']) => void;
  hasCompletedPreferences: boolean;
};

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasCompletedPreferences, setHasCompletedPreferences] = useState(false);
  const navigate = useNavigate();

  // Check if user is already logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('cookAI_user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setHasCompletedPreferences(!!parsedUser.preferences);
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('cookAI_user');
      }
    }
    setIsLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulating API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful login
      const userData: User = {
        id: '1234',
        name: 'Alex Johnson',
        username: email.split('@')[0],
        email,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&q=60&w=300&h=300',
        joinedDate: new Date().toLocaleString('default', { month: 'long', year: 'numeric' }),
        preferences: undefined, // New users don't have preferences yet
      };
      
      // Save user to state and localStorage
      setUser(userData);
      localStorage.setItem('cookAI_user', JSON.stringify(userData));
      
      // Show success message
      toast.success("Login successful! Welcome to CookAI.");
      
      // Redirect to home page
      setTimeout(() => {
        navigate('/');
      }, 1000);
      
      return Promise.resolve();
    } catch (error) {
      toast.error("Login failed. Please check your credentials and try again.");
      return Promise.reject(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Google Login function
  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userData: User = {
        id: user.uid,
        name: user.displayName || "User",
        username: user.email?.split("@")[0] || "user",
        email: user.email || "",
        avatar: user.photoURL || "https://via.placeholder.com/150",
        joinedDate: new Date().toLocaleString("default", { month: "long", year: "numeric" }),
      };

      setUser(userData);
      localStorage.setItem("cookAI_user", JSON.stringify(userData));
      toast.success(`Welcome ${user.displayName || "User"}!`);
      
      // Redirect to home page
      setTimeout(() => {
        navigate('/');
      }, 1000);
      
      return Promise.resolve();
    } catch (error) {
      console.error("Google login error:", error);
      
      // Handle specific Firebase errors
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/unauthorized-domain':
            toast.error("The domain isn't authorized for Google authentication. Please try in a production environment.");
            break;
          case 'auth/popup-closed-by-user':
            toast.error("Authentication popup was closed. Please try again.");
            break;
          case 'auth/cancelled-popup-request':
            toast.error("Authentication request cancelled. Please try again.");
            break;
          default:
            toast.error("Google Sign-In failed. Try again.");
        }
      } else {
        toast.error("Google Sign-In failed. Try again.");
      }
      
      return Promise.reject(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Signup function
  const signup = async (username: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulating API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success message
      toast.success("Signup successful! You may now log in.");
      
      // Redirect to login page
      setTimeout(() => {
        navigate('/login');
      }, 1000);
      
      return Promise.resolve();
    } catch (error) {
      toast.error("Signup failed. Please try again.");
      return Promise.reject(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('cookAI_user');
    toast.success("Logged out successfully");
    navigate('/');
  };

  // Update user function
  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('cookAI_user', JSON.stringify(updatedUser));
    }
  };

  // Update preferences function
  const updatePreferences = (preferences: User['preferences']) => {
    if (user) {
      const updatedUser = { 
        ...user, 
        preferences: { 
          ...user.preferences,
          ...preferences 
        } 
      };
      setUser(updatedUser);
      setHasCompletedPreferences(true);
      localStorage.setItem('cookAI_user', JSON.stringify(updatedUser));
      toast.success("Preferences saved successfully!");
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    loginWithGoogle,
    signup,
    logout,
    updateUser,
    updatePreferences,
    hasCompletedPreferences
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
