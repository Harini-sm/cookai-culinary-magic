
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Utensils, Clock, Flame, Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    setIsVisible(true);
    
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-section pt-32 pb-20 md:pt-40 md:pb-24">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 title-gradient">
              CookAI – From Pantry to Plate, Instantly!
            </h1>
            
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Transform your available ingredients into delicious recipes using advanced AI. 
              Get personalized cooking guidance based on your preferences, dietary needs, and kitchen tools.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <Link to="/pantry-prodigy" className="button-primary text-lg flex items-center justify-center">
                Get Started <ChevronRight className="ml-1 w-5 h-5" />
              </Link>
              
              <Link to="/about" className="button-outline text-lg flex items-center justify-center">
                Learn More <ChevronRight className="ml-1 w-5 h-5" />
              </Link>
            </div>
            
            <div className="mt-16 relative">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&q=80" 
                  alt="Delicious food" 
                  className="rounded-xl shadow-2xl border border-white/20 mx-auto w-full max-w-4xl object-cover"
                />
                
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 glass-card rounded-full px-6 py-3 text-sm md:text-base font-medium">
                  Create amazing dishes with what you already have
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
        
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-b from-blue-500/10 to-transparent rounded-full blur-3xl transform translate-x-1/4 -translate-y-1/4"></div>
          <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-t from-green-500/10 to-transparent rounded-full blur-3xl transform -translate-x-1/4 translate-y-1/4"></div>
        </div>
      </section>
      
      {/* Features Overview */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900" ref={sectionRef}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Discover Our AI-Powered Features
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                CookAI offers three powerful AI assistants to transform your cooking experience
              </p>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              title="Pantry Prodigy"
              description="Transform your available ingredients into delicious recipes. Just input what you have and get personalized recipes!"
              icon={<Utensils className="w-8 h-8 text-primary" />}
              delay={0.1}
              isVisible={isVisible}
              linkTo="/pantry-prodigy"
            />
            
            <FeatureCard 
              title="Plate Prodigy"
              description="Select a specific recipe or type of dish and let AI adapt it to your preferences, dietary needs, and skill level."
              icon={<Flame className="w-8 h-8 text-cook-accent" />}
              delay={0.3}
              isVisible={isVisible}
              linkTo="/plate-prodigy"
            />
            
            <FeatureCard 
              title="Nutrient Prodigy"
              description="Focus on your nutritional goals with recipes tailored to specific macronutrient values and dietary requirements."
              icon={<Sparkles className="w-8 h-8 text-cook-secondary" />}
              delay={0.5}
              isVisible={isVisible}
              linkTo="/nutrient-prodigy"
            />
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              How CookAI Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Our AI technology transforms your cooking experience in just a few simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: 1,
                title: "Input Your Ingredients",
                description: "Tell us what ingredients you have available in your pantry."
              },
              {
                step: 2,
                title: "Set Preferences",
                description: "Select your preferences, dietary needs, and cooking skill level."
              },
              {
                step: 3,
                title: "Generate Recipe",
                description: "Our AI generates a personalized recipe just for you."
              },
              {
                step: 4,
                title: "Cook & Enjoy",
                description: "Follow the step-by-step instructions to create your delicious meal."
              }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-primary">{item.step}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                
                {index < 3 && (
                  <div className="hidden lg:block w-24 h-0.5 bg-gray-200 absolute right-0 top-1/2 transform translate-x-1/2"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/90 to-cook-secondary/90 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Ready to Transform Your Cooking Experience?
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-10">
            Join thousands of home cooks who are discovering new recipes and saving time with CookAI's AI-powered recipe generation.
          </p>
          
          <Link to="/signup" className="button bg-white text-primary hover:bg-white/90 text-lg inline-flex items-center px-8 py-3">
            Get Started Now <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

type FeatureCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
  isVisible: boolean;
  linkTo: string;
};

const FeatureCard = ({ title, description, icon, delay, isVisible, linkTo }: FeatureCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
    transition={{ duration: 0.5, delay }}
    className="feature-card"
  >
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400 mb-6">{description}</p>
    
    <Link 
      to={linkTo}
      className="inline-flex items-center text-primary font-medium hover:underline"
    >
      Try it now <ArrowRight className="ml-1 w-4 h-4" />
    </Link>
  </motion.div>
);

export default Index;
