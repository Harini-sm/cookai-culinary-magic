import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import ThemeToggle from '../ui/ThemeToggle';
import Logo from '../ui/Logo';
import { cn } from '@/lib/utils';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMenuOpen(false);
    setFeaturesOpen(false);
    setProfileOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "py-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-sm" : "py-5 bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo - Using the new Logo component */}
        <Logo />

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          <NavLink to="/">Home</NavLink>
          
          {/* Features Dropdown */}
          <div className="relative group">
            <button 
              className="flex items-center gap-1 py-2 text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors"
              onClick={() => setFeaturesOpen(!featuresOpen)}
            >
              Features <ChevronDown className="w-4 h-4" />
            </button>
            
            <div className={cn(
              "absolute top-full left-0 mt-1 w-56 rounded-lg overflow-hidden transition-all duration-300 origin-top-left",
              "glass-card shadow-xl",
              featuresOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
            )}>
              <div className="py-2">
                <NavLink to="/pantry-prodigy" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                  Pantry Prodigy
                </NavLink>
                <NavLink to="/plate-prodigy" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                  Plate Prodigy
                </NavLink>
                <NavLink to="/nutrient-prodigy" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                  Nutrient Prodigy
                </NavLink>
              </div>
            </div>
          </div>
          
          <NavLink to="/about">About</NavLink>
        </nav>

        {/* Auth & Profile Actions - Desktop */}
        <div className="hidden lg:flex items-center gap-4">
          <NavLink to="/login" className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors">
            Login
          </NavLink>
          
          <Link to="/signup" className="button-primary">
            Sign Up
          </Link>
          
          {/* Profile Dropdown */}
          <div className="relative">
            <button 
              className="flex items-center gap-1 py-2 text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors"
              onClick={() => setProfileOpen(!profileOpen)}
            >
              Profile <ChevronDown className="w-4 h-4" />
            </button>
            
            <div className={cn(
              "absolute top-full right-0 mt-1 w-48 rounded-lg overflow-hidden transition-all duration-300 origin-top-right",
              "glass-card shadow-xl",
              profileOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
            )}>
              <div className="py-2">
                <NavLink to="/profile" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                  My Profile
                </NavLink>
                <NavLink to="/settings" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                  Settings
                </NavLink>
                <hr className="my-1 border-gray-200 dark:border-gray-700" />
                <button className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 dark:hover:bg-gray-800">
                  Logout
                </button>
              </div>
            </div>
          </div>
          
          <ThemeToggle />
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-3 lg:hidden">
          <ThemeToggle />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "fixed inset-0 z-40 lg:hidden transition-all duration-300",
        isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
        
        <div className={cn(
          "absolute right-0 top-0 h-full w-72 bg-white dark:bg-gray-900 shadow-xl transition-all duration-300 transform",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}>
          <div className="flex flex-col h-full overflow-y-auto pt-16 pb-8 px-5">
            <nav className="flex flex-col gap-1">
              <NavLink to="/" mobile>Home</NavLink>
              
              <button 
                className="flex items-center justify-between py-3 px-4 rounded-lg text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setFeaturesOpen(!featuresOpen)}
              >
                <span>Features</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${featuresOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {featuresOpen && (
                <div className="ml-4 border-l-2 border-gray-200 dark:border-gray-700 pl-4 py-1 mt-1 mb-2">
                  <NavLink to="/pantry-prodigy" mobile>Pantry Prodigy</NavLink>
                  <NavLink to="/plate-prodigy" mobile>Plate Prodigy</NavLink>
                  <NavLink to="/nutrient-prodigy" mobile>Nutrient Prodigy</NavLink>
                </div>
              )}
              
              <NavLink to="/about" mobile>About</NavLink>
              
              <hr className="my-3 border-gray-200 dark:border-gray-700" />
              
              <NavLink to="/login" mobile>Login</NavLink>
              <NavLink to="/signup" mobile>Sign Up</NavLink>
              
              <button 
                className="flex items-center justify-between py-3 px-4 rounded-lg text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 mt-2"
                onClick={() => setProfileOpen(!profileOpen)}
              >
                <span>Profile</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {profileOpen && (
                <div className="ml-4 border-l-2 border-gray-200 dark:border-gray-700 pl-4 py-1 mt-1">
                  <NavLink to="/profile" mobile>My Profile</NavLink>
                  <NavLink to="/settings" mobile>Settings</NavLink>
                  <button className="w-full text-left py-3 px-4 rounded-lg text-red-500 hover:bg-gray-100 dark:hover:bg-gray-800">
                    Logout
                  </button>
                </div>
              )}
            </nav>
            
            <div className="mt-auto pt-5 text-center text-sm text-gray-500">
              &copy; {new Date().getFullYear()} CookAI
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

// NavLink component
type NavLinkProps = {
  to: string;
  children: React.ReactNode;
  className?: string;
  mobile?: boolean;
};

const NavLink = ({ to, children, className, mobile }: NavLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      className={cn(
        mobile 
          ? "py-3 px-4 rounded-lg block hover:bg-gray-100 dark:hover:bg-gray-800" 
          : "py-2 transition-colors",
        isActive 
          ? "text-primary font-medium" 
          : "text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary",
        className
      )}
    >
      {children}
    </Link>
  );
};

export default Header;
