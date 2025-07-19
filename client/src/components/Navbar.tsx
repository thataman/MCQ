
import { CircleDot } from 'lucide-react';
import { ModeToggle } from './mode-toggle';
const Navbar = () => {
  return (
    <nav className={`dark:bg-gray-800 broder bottom-2 border-white shadow-md p-4`}>
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
          <ModeToggle />
          <button className="px-4 py-2 rounded-md bg-purple-600 text-white hover:bg-purple-700 transition-colors">
            Sign In
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;