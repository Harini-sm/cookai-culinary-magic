
import { Link } from "react-router-dom";
import { ChevronRight, Facebook, Github, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-2 text-2xl font-display font-bold mb-4">
              <span className="text-primary text-3xl">Cook</span>
              <span className="text-cook-accent">AI</span>
            </Link>
            
            <p className="text-gray-600 dark:text-gray-400 mt-4 mb-6 max-w-md">
              From Pantry to Plate, Instantly! CookAI transforms your available ingredients into delicious recipes using advanced AI technology.
            </p>
            
            <div className="flex space-x-4">
              <SocialLink href="https://twitter.com" icon={<Twitter size={18} />} />
              <SocialLink href="https://facebook.com" icon={<Facebook size={18} />} />
              <SocialLink href="https://instagram.com" icon={<Instagram size={18} />} />
              <SocialLink href="https://github.com" icon={<Github size={18} />} />
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Features</h3>
            <ul className="space-y-3">
              <FooterLink to="/pantry-prodigy">Pantry Prodigy</FooterLink>
              <FooterLink to="/plate-prodigy">Plate Prodigy</FooterLink>
              <FooterLink to="/nutrient-prodigy">Nutrient Prodigy</FooterLink>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Company</h3>
            <ul className="space-y-3">
              <FooterLink to="/about">About</FooterLink>
              <FooterLink to="/careers">Careers</FooterLink>
              <FooterLink to="/blog">Blog</FooterLink>
              <FooterLink to="/press">Press</FooterLink>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Legal</h3>
            <ul className="space-y-3">
              <FooterLink to="/privacy">Privacy Policy</FooterLink>
              <FooterLink to="/terms">Terms of Service</FooterLink>
              <FooterLink to="/cookies">Cookie Policy</FooterLink>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            &copy; {currentYear} CookAI. All rights reserved.
          </p>
          
          <div className="mt-4 sm:mt-0">
            <select 
              className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md px-3 py-1.5 text-sm" 
              defaultValue="en"
            >
              <option value="en">English</option>
              <option value="fr">Français</option>
              <option value="es">Español</option>
              <option value="de">Deutsch</option>
              <option value="zh">中文</option>
            </select>
          </div>
        </div>
      </div>
    </footer>
  );
};

type SocialLinkProps = {
  href: string;
  icon: React.ReactNode;
};

const SocialLink = ({ href, icon }: SocialLinkProps) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="w-8 h-8 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-primary hover:text-white dark:hover:bg-primary transition-colors border border-gray-200 dark:border-gray-700"
  >
    {icon}
  </a>
);

type FooterLinkProps = {
  to: string;
  children: React.ReactNode;
};

const FooterLink = ({ to, children }: FooterLinkProps) => (
  <li>
    <Link 
      to={to} 
      className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors inline-flex items-center group"
    >
      <ChevronRight className="w-3 h-3 mr-1 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
      {children}
    </Link>
  </li>
);

export default Footer;
