
import { ErrorBoundary } from 'react-error-boundary';


const FunctionalErrorBoundary = ({ children }: { children: React.ReactNode }) => (
  <ErrorBoundary
    FallbackComponent={ErrorFallback}

  >
    {children}
  </ErrorBoundary>
);

export default FunctionalErrorBoundary;













import React from 'react';
import { RefreshCw, AlertTriangle } from 'lucide-react';



const ErrorFallback = ({ 
  error = null, 
  resetErrorBoundary = () => {} 
}) => {
  return (
    <div className="min-h-[400px] flex items-center justify-center p-6">
      <div className="text-center max-w-md mx-auto space-y-6">
        {/* Vector Illustration */}
        <div className="mx-auto w-32 h-32 mb-6">
          <svg
            viewBox="0 0 200 200"
            className="w-full h-full text-muted-foreground"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background circle */}
            <circle
              cx="100"
              cy="100"
              r="80"
              fill="currentColor"
              fillOpacity="0.1"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="5,5"
            />
            
            {/* Broken gear/cog */}
            <g transform="translate(100, 100)">
              <circle
                r="25"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              />
              {/* Gear teeth */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                <rect
                  key={i}
                  x="-2"
                  y="-30"
                  width="4"
                  height="8"
                  fill="currentColor"
                  transform={`rotate(${angle})`}
                  opacity={i === 2 || i === 3 ? 0.3 : 1}
                />
              ))}
              
              {/* Center hole */}
              <circle r="8" fill="currentColor" fillOpacity="0.2" />
              
              {/* Crack lines */}
              <path
                d="M -15 -10 L -25 -20 M 15 10 L 25 20 M -10 15 L -20 25"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.7"
              />
            </g>
            
            {/* Floating particles */}
            <circle cx="60" cy="60" r="2" fill="currentColor" fillOpacity="0.4" />
            <circle cx="140" cy="70" r="1.5" fill="currentColor" fillOpacity="0.3" />
            <circle cx="70" cy="140" r="1" fill="currentColor" fillOpacity="0.5" />
            <circle cx="130" cy="130" r="2" fill="currentColor" fillOpacity="0.3" />
          </svg>
        </div>

        {/* Error Content */}
        <div className="space-y-3">
          <div className="flex items-center justify-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            <h2 className="text-lg font-semibold">Something went wrong</h2>
          </div>
          
          <p className="text-sm text-muted-foreground leading-relaxed">
            We encountered an unexpected error. Don't worry, this happens sometimes.
            Try refreshing the page or contact support if the problem persists.
          </p>
          
          {/* Error details - collapsible */}
          {error && (
            <details className="text-left bg-muted/30 rounded-lg p-3 mt-4">
              <summary className="text-xs text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
                View error details
              </summary>
              <pre className="text-xs text-destructive mt-2 font-mono overflow-auto max-h-20">
                {error?.message || 'Unknown error occurred'}
              </pre>
            </details>
          )}
        </div>

        {/* Action Button */}
        <button
          onClick={resetErrorBoundary}
          className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-6 py-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
        >
          <RefreshCw className="h-4 w-4" />
          Try again
        </button>
      </div>
    </div>
  );
};

