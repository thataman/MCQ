import { CircleDot } from 'lucide-react';
import { ModeToggle } from './mode-toggle';

const Navbar = () => {
  return (
    <div className="w-full px-4 py-4">
      <nav className="max-w-7xl mx-auto bg-background/95 backdrop-blur-lg border border-border/50 shadow-lg rounded-2xl">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <CircleDot className="h-8 w-8 text-primary animate-pulse" />
                <div className="absolute inset-0 h-8 w-8 text-primary/20 animate-ping">
                  <CircleDot className="h-8 w-8" />
                </div>
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  MCQ Test Platform
                </span>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Smart Learning Solutions
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-6">
                <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 hover:scale-105 transform">
                  Dashboard
                </a>
                <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 hover:scale-105 transform">
                  Tests
                </a>
                <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 hover:scale-105 transform">
                  Results
                </a>
              </div>
              
              <div className="h-6 w-px bg-border hidden md:block"></div>
              
              <ModeToggle />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;