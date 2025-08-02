import { CircleDot } from 'lucide-react';
import { ModeToggle } from './mode-toggle';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

const navItems = [
  /* { name: 'Dashboard', href: '#', isActive: false }, */
  { name: 'Prepare Tests', href: '/generate', isActive: true },
  /* { name: 'Results', href: '#', isActive: false },
  { name: 'About', href: '/about', isActive: false },
  { name: 'Contact', href: '#', isActive: false }, */

]

const Navbar = () => {
  return (
    
      <nav className=" max-w-8xl my-3  mx-10 bg-secondary backdrop-blur-lg border border-border/50 shadow-sm rounded-2xl">
        <div className="px-6 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <CircleDot className="h-8 w-8 text-primary animate-pulse" />
                <div className="absolute inset-0 h-8 w-8 text-primary/20 animate-ping">
                  <CircleDot className="h-8 w-8" />
                </div>
              </div>
              <Link to="/">
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  MCQ Test Platform
                </span>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Smart Learning Solutions
                </p>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-10">
                
                {
                  navItems.map((item) => (
                    <Link to={item.href}>
                     <Button
                     variant={"outline"}
                        key={item.name}
                        
                        className="text-sm font-medium border-primary"
                        
                      >
                        {item.name}
                      </Button>
                    </Link>
                  ))
                }
              </div>
              
              
              
              <ModeToggle />
            </div>
          </div>
        </div>
      </nav>
    
  );
};

export default Navbar;