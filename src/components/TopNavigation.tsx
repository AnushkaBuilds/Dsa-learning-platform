import React from 'react';
import { Menu, Sun, Moon, Code } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

interface TopNavigationProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const TopNavigation: React.FC<TopNavigationProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();

  const handlePremiumClick = () => {
    window.location.href = '/pricing';
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors lg:hidden"
            aria-label="Toggle sidebar"
          >
            <Menu className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
          
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="p-2 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg shadow-lg">
              <Code className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent">
              DSA Learn
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            to="/problems"
            className={`px-3 py-2 rounded-lg transition-all duration-200 ${
              isActive('/problems')
                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
            }`}
          >
            Problems
          </Link>
          <Link 
            to="/pricing"
            className={`px-3 py-2 rounded-lg transition-all duration-200 ${
              isActive('/pricing')
                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
            }`}
          >
            Pricing
          </Link>
          <Link 
            to="/blog"
            className={`px-3 py-2 rounded-lg transition-all duration-200 ${
              isActive('/blog')
                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
            }`}
          >
            Blog
          </Link>
        </nav>

        <div className="flex items-center space-x-3">
          <button
            onClick={toggleTheme}
            className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 hover:scale-105 group"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <div className="relative w-5 h-5">
              {isDark ? (
                <Sun className="w-5 h-5 text-yellow-500 animate-in spin-in-180 duration-300" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600 animate-in spin-in-180 duration-300" />
              )}
            </div>
            
            {/* Tooltip */}
            <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
              {isDark ? 'Light mode' : 'Dark mode'}
            </div>
          </button>
          
          <button 
            onClick={handlePremiumClick}
            className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95"
          >
            Get Premium
          </button>
        </div>
      </div>
    </header>
  );
};

export default TopNavigation;