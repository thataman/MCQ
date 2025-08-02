
import { Github, ExternalLink } from 'lucide-react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

export default function MinimalFooter() {
  return (
    <footer className="  border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col items-center space-y-6 md:flex-row md:justify-between md:space-y-0">
          
          {/* Brand Section */}
          <div className="flex flex-col items-center md:items-start space-y-2">
            <h3 className="text-2xl font-semibold text-primary">MCQ Master</h3>
            <p className="text-md text-muted-foreground max-w-xs text-center md:text-left">
              Empowering students with intelligent practice tests and detailed analytics for exam success.
            </p>
          </div>

          
          <div className="flex items-center space-x-6">
            <Button variant={'ghost'}>
              About
            </Button>
            <Button variant={'ghost'}>
              Privacy
            </Button>
            <Button variant={'ghost'}>
              Terms
            </Button>
          </div>

          {/* GitHub Repositories */}
          <div className="flex items-center space-x-3">
            <Link to={"https://github.com/SarojKumarRanjan/MCQ.git"}>
            <Button variant={'outline'} className='border-primary'>
              <Github className="h-4 w-4" />
              <span>Github</span>
              <ExternalLink className="h-3 w-3" />
            </Button>
            
            </Link>
            <Link to={"https://github.com/thataman/MCQ.git"}>
            <Button variant={'outline'} className='border-primary'>
              <Github className="h-4 w-4" />
              <span>Github</span>
              <ExternalLink className="h-3 w-3" />
            </Button>
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-center text-sm text-primary">
            © {new Date().getFullYear()} MCQ Master. All rights reserved. Built with ❤️ for better learning.
          </p>
        </div>
      </div>
    </footer>
  );
}