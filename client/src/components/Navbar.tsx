import React from 'react';
import { CircleDot } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { ThemeMode } from '../types';

interface NavbarProps {
  theme: ThemeMode;
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme }) => {
  return (
    <nav className={`p-4 shadow-md ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <CircleDot className="h-6 w-6 text-purple-600" />
          <span className="text-xl font-bold">MCQ Test Platform</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-6">
          <a href="#" className="hover:text-purple-500 transition-colors">Home</a>
          <a href="#" className="hover:text-purple-500 transition-colors">Tests</a>
          <a href="#" className="hover:text-purple-500 transition-colors">Results</a>
          <a href="#" className="hover:text-purple-500 transition-colors">About</a>
        </div>
        
        <div className="flex items-center space-x-4">
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          <button className="px-4 py-2 rounded-md bg-purple-600 text-white hover:bg-purple-700 transition-colors">
            Sign In
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;