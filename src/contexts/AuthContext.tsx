import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";

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
  signup: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  updatePreferences: (preferences: User['preferences']) => void;
  hasCompletedPreferences: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasCompletedPreferences, setHasCompletedPreferences] = useState(false);
  const navigate = useNavigate();

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

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const userData: User = {
        id: '1234',
        name: 'Alex Johnson',
        username: email.split('@')[0],
        email,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&q=60&w=300&h=300',
        joinedDate: new Date().toLocaleString('default', { month: 'long', year: 'numeric' }),
        preferences: undefined,
      };
      
      setUser(userData);
      localStorage.setItem('cookAI_user', JSON.stringify(userData));
      toast.success("Login successful! Welcome to CookAI.");
      
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

  const signup = async (username: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success("Signup successful! You may now log in.");
      
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

  const logout = () => {
    setUser(null);
    localStorage.removeItem('cookAI_user');
    toast.success("Logged out successfully");
    navigate('/');
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('cookAI_user', JSON.stringify(updatedUser));
    }
  };

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
    signup,
    logout,
    updateUser,
    updatePreferences,
    hasCompletedPreferences
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
