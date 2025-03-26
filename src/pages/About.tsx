
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Code, Cpu, Database, FlaskConical, ChefHat } from 'lucide-react';
import { motion, useAnimation } from 'framer-motion';

const About = () => {
  const controls = useAnimation();
  
  useEffect(() => {
    controls.start(i => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2 },
    }));
  }, [controls]);

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-cook-primary/10 to-transparent">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              About CookAI
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              We're on a mission to transform home cooking through AI-powered recipe generation and personalized culinary guidance.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* AI Showcase */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl font-display font-bold mb-5">
                AI-Powered Recipe Generation
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                CookAI uses advanced artificial intelligence to create personalized recipes based on your ingredients, preferences, and nutritional needs.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                Our state-of-the-art Natural Language Processing models understand the nuances of cooking instructions, ingredient combinations, and flavor pairings to generate delicious, feasible recipes every time.
              </p>
              <Link 
                to="/pantry-prodigy" 
                className="button-primary inline-flex items-center"
              >
                Try Pantry Prodigy <ChevronRight className="ml-1 w-5 h-5" />
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="rounded-2xl overflow-hidden shadow-2xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&q=80" 
                alt="AI-powered cooking" 
                className="w-full h-auto"
              />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                How CookAI Works
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Our technology combines cutting-edge AI with culinary expertise
              </p>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Database className="w-10 h-10 text-cook-primary" />,
                title: "Ingredient Analysis",
                description: "Our AI recognizes thousands of ingredients and understands their culinary properties and flavor profiles."
              },
              {
                icon: <FlaskConical className="w-10 h-10 text-cook-accent" />,
                title: "Recipe Formulation",
                description: "Based on your inputs, our algorithm creates balanced, delicious recipes that make sense culinarily."
              },
              {
                icon: <Cpu className="w-10 h-10 text-cook-secondary" />,
                title: "Nutritional Optimization",
                description: "We analyze and optimize nutritional values to create meals that meet your dietary requirements."
              },
              {
                icon: <Code className="w-10 h-10 text-green-500" />,
                title: "Voice Generation",
                description: "Our text-to-speech system converts cooking instructions into clear, helpful voice guidance."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                custom={index}
                initial={{ opacity: 0, y: 20 }}
                animate={controls}
                className="glass-card p-6 rounded-xl"
              >
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Animation */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative h-96"
              >
                {/* Animated Feature Blocks */}
                <FeatureBlock
                  title="Pantry Prodigy"
                  description="Transform your available ingredients into delicious recipes"
                  icon={<ChefHat className="w-6 h-6" />}
                  color="bg-gradient-to-br from-blue-500 to-blue-600"
                  position="top-0 left-0"
                  delay={0.1}
                />
                
                <FeatureBlock
                  title="Plate Prodigy"
                  description="Customize specific recipes to your preferences"
                  icon={<ChefHat className="w-6 h-6" />}
                  color="bg-gradient-to-br from-orange-500 to-orange-600"
                  position="top-24 right-0"
                  delay={0.3}
                />
                
                <FeatureBlock
                  title="Nutrient Prodigy"
                  description="Create meals tailored to your nutritional goals"
                  icon={<ChefHat className="w-6 h-6" />}
                  color="bg-gradient-to-br from-green-500 to-green-600"
                  position="bottom-0 left-1/4"
                  delay={0.5}
                />
              </motion.div>
            </div>
            
            <div className="order-1 lg:order-2">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-display font-bold mb-5">
                  Features That Transform Your Cooking
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                  CookAI offers three powerful AI assistants that work together to provide a comprehensive cooking experience. Each feature has been designed to solve a specific cooking challenge and make your time in the kitchen more enjoyable and efficient.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                  Whether you're trying to use up ingredients in your pantry, customize a recipe to your preferences, or create meals that fit your nutritional goals, our AI assistants are here to help.
                </p>
                <Link 
                  to="/" 
                  className="button-primary inline-flex items-center"
                >
                  Explore Features <ChevronRight className="ml-1 w-5 h-5" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="glass-card rounded-2xl p-10 text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-display font-bold mb-5">
                Ready to Transform Your Cooking Experience?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                Join thousands of home cooks who are discovering new recipes and saving time with CookAI.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/signup" className="button-primary text-lg">
                  Sign Up Now
                </Link>
                <Link to="/" className="button-outline text-lg">
                  Explore Features
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

type FeatureBlockProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  position: string;
  delay: number;
};

const FeatureBlock = ({ title, description, icon, color, position, delay }: FeatureBlockProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`absolute ${position} max-w-xs`}
    >
      <div className="flex items-start gap-4 p-4 rounded-xl glass-card">
        <div className={`w-12 h-12 rounded-full ${color} flex items-center justify-center text-white`}>
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-bold mb-1">{title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default About;
