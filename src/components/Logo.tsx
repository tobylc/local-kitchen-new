import React from 'react';
import { ChefHat, Star, Clock, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center space-x-3 group">
      <div className="relative">
        {/* Main chef icon with dynamic effects */}
        <div className="relative transform group-hover:scale-105 transition-transform duration-300">
          <ChefHat className="h-10 w-10 text-orange-500" />
          
          {/* Floating star effect */}
          <Star className="absolute -top-2 -right-1 h-4 w-4 text-orange-300 animate-bounce" />
          
          {/* Time indicator */}
          <Clock className="absolute -bottom-1 -right-1 h-5 w-5 text-orange-600" />
          
          {/* Sparkle effects */}
          <Sparkles className="absolute -top-1 -left-2 h-4 w-4 text-orange-400 opacity-75" />
        </div>
        
        {/* Animated accent elements */}
        <div className="absolute -bottom-1 right-0 w-2 h-2 bg-orange-300 rounded-full animate-ping" />
        <div className="absolute top-0 left-0 w-2 h-2 bg-orange-400 rounded-full animate-pulse delay-150" />
      </div>
      
      <div className="flex flex-col">
        <span className="text-2xl font-extrabold text-gray-900 leading-none tracking-tight">
          Local
        </span>
        <span className="text-2xl font-extrabold text-orange-500 leading-none tracking-tight">
          Kitchen
        </span>
        <span className="text-xs text-gray-500 tracking-wider">Homemade Food Delivery</span>
      </div>
    </Link>
  );
};

export default Logo;