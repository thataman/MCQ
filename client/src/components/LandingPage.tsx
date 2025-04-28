import React from 'react';
import { CheckCircle2, Clock, ListTodo, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  return (
    <div className="space-y-16 pb-10">
      {/* Hero Section with 3D text effect and animations */}
      <section className="py-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-600/10 to-transparent dark:from-purple-900/20" />
        <div className="max-w-4xl mx-auto px-4 relative">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            The Ultimate{' '}
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-400 blur-lg opacity-30 dark:opacity-50 transform -skew-x-12" />
              <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-400 hover:scale-105 transition-transform duration-300 inline-block">
                Test Platform
              </span>
            </span>
            {' '}for Learning
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-80 animate-slide-up delay-100">
            Boost your knowledge and track your achievements with our interactive MCQ platform.
            Built for students, educators, and lifelong learners.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/test" 
              className="px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-all duration-300 hover:scale-105 hover:shadow-lg transform"
            >
              Start Testing
            </Link>
            <button className="px-6 py-3 border border-purple-600 rounded-md hover:bg-purple-100 dark:hover:bg-purple-900 transition-all duration-300 hover:scale-105 hover:shadow-lg transform">
              How it Works
            </button>
          </div>
        </div>
      </section>

      {/* Features Section with hover animations */}
      <section className="py-10">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 relative">
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-400 blur-lg opacity-30 dark:opacity-50 transform -skew-x-12" />
              <span className="relative">Key Features</span>
            </span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<ListTodo className="h-8 w-8 text-purple-600" />}
              title="Categorized Questions"
              description="Questions organized by topics for focused learning and preparation"
            />
            <FeatureCard 
              icon={<Clock className="h-8 w-8 text-purple-600" />}
              title="Timed Tests"
              description="Set customizable time limits to simulate real exam conditions"
            />
            <FeatureCard 
              icon={<CheckCircle2 className="h-8 w-8 text-purple-600" />}
              title="Progress Tracking"
              description="Monitor your progress with detailed analytics and insights"
            />
            <FeatureCard 
              icon={<Sparkles className="h-8 w-8 text-purple-600" />}
              title="Modern Interface"
              description="Clean, intuitive design that works on any device"
            />
          </div>
        </div>
      </section>

      {/* CTA Section with gradient animation */}
      <section className="py-16 relative group overflow-hidden rounded-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-400 opacity-10 dark:opacity-20 group-hover:opacity-20 dark:group-hover:opacity-30 transition-opacity duration-300" />
        <div className="absolute inset-0 bg-purple-100 dark:bg-purple-900 -z-10" />
        <div className="max-w-3xl mx-auto text-center px-4 relative">
          <h2 className="text-3xl font-bold mb-6 transform group-hover:scale-105 transition-transform duration-300">
            Ready to Test Your Knowledge?
          </h2>
          <p className="text-lg mb-8 opacity-80 transform group-hover:translate-y-1 transition-transform duration-300">
            Start with our free practice tests and improve your skills today.
          </p>
          <Link 
            to="/test" 
            className="inline-block px-8 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-all duration-300 hover:scale-105 hover:shadow-lg transform"
          >
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg group">
      <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-600 transition-colors duration-300">{title}</h3>
      <p className="opacity-80 group-hover:opacity-100 transition-opacity duration-300">{description}</p>
    </div>
  );
};

export default LandingPage;