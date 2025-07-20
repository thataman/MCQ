import { GraduationCap } from 'lucide-react';

const StudentLoader = ({ 
  loadingText = "Loading...", 
  isVisible = false 
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Blurred backdrop */}
      <div className="absolute inset-0 bg-background/20 backdrop-blur-sm" />
      
      {/* Content container */}
      <div className="relative flex flex-col items-center justify-center space-y-6 p-8">
        {/* Animated student icon container */}
        <div className="relative">
          {/* Outer pulse ring */}
          <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" 
               style={{
                 animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
                 animationDelay: '0.5s'
               }} />
          
          {/* Inner pulse ring */}
          <div className="absolute inset-2 rounded-full bg-primary/30 animate-ping"
               style={{
                 animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite'
               }} />
          
          {/* Icon container with floating animation */}
          <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm animate-bounce"
               style={{
                 animation: 'float 3s ease-in-out infinite'
               }}>
            <GraduationCap 
              size={48} 
              className="text-primary animate-pulse" 
              strokeWidth={1.5}
            />
          </div>
        </div>
        
        {/* Loading text */}
        <div className="text-center space-y-2">
          <p className="text-lg font-medium text-foreground/90 animate-pulse">
            {loadingText}
          </p>
          
          {/* Animated dots */}
          <div className="flex justify-center space-x-1">
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className="w-2 h-2 bg-primary rounded-full animate-bounce"
                style={{
                  animationDelay: `${index * 0.2}s`,
                  animationDuration: '1.4s'
                }}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Custom keyframes styles */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default StudentLoader;