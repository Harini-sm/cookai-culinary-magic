
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2">
      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-cook-accent flex items-center justify-center">
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="text-white"
        >
          <path d="M12 2v1" />
          <path d="M15.5 2.5l-.5.5" />
          <path d="M8.5 2.5l.5.5" />
          <path d="M9 15.5c0 .7.4 1.2 1 1.2" />
          <path d="M14 15.5c0 .7-.4 1.2-1 1.2" />
          <path d="M12 16.7V20" />
          <path d="M10 22h4" />
          <path d="M5 8c0-2.8 2.2-5 5-5h4c2.8 0 5 2.2 5 5v4.5c0 2.5-2 4.5-4.5 4.5h-5c-2.5 0-4.5-2-4.5-4.5V8z" />
          <path d="M12 7.4v.6" />
        </svg>
      </div>
      <div className="font-display font-bold">
        <span className="text-primary text-2xl">Cook</span>
        <span className="text-cook-accent text-2xl">AI</span>
      </div>
    </Link>
  );
};

export default Logo;
