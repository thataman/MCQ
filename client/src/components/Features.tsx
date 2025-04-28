import React from 'react';
import { 
  BookOpen, Clock, BarChart2, Users, Shield, 
  Zap, Monitor, Smartphone 
} from 'lucide-react';

const Features: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-6">
          Platform Features
        </h1>
        <p className="text-xl opacity-80 max-w-3xl mx-auto">
          Discover all the powerful features that make our platform 
          the perfect choice for your learning journey.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <FeatureCard
          icon={<BookOpen className="h-8 w-8" />}
          title="Comprehensive Content"
          description="Access a vast library of questions across multiple subjects and difficulty levels"
        />
        <FeatureCard
          icon={<Clock className="h-8 w-8" />}
          title="Timed Assessments"
          description="Practice under exam conditions with customizable time limits"
        />
        <FeatureCard
          icon={<BarChart2 className="h-8 w-8" />}
          title="Progress Tracking"
          description="Monitor your improvement with detailed performance analytics"
        />
        <FeatureCard
          icon={<Users className="h-8 w-8" />}
          title="Community Learning"
          description="Connect with other learners and share knowledge"
        />
        <FeatureCard
          icon={<Shield className="h-8 w-8" />}
          title="Secure Platform"
          description="Your data and progress are always protected"
        />
        <FeatureCard
          icon={<Zap className="h-8 w-8" />}
          title="Quick Results"
          description="Get instant feedback on your performance"
        />
        <FeatureCard
          icon={<Monitor className="h-8 w-8" />}
          title="Cross-platform"
          description="Access your tests from any device"
        />
        <FeatureCard
          icon={<Smartphone className="h-8 w-8" />}
          title="Mobile Friendly"
          description="Optimized experience on all screen sizes"
        />
      </div>

      <div className="mt-16 bg-purple-100 dark:bg-purple-900/20 rounded-2xl p-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
            <p className="text-lg mb-6 opacity-80">
              Join thousands of students who are already improving their skills with our platform.
            </p>
            <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              Start Learning Now
            </button>
          </div>
          <div className="relative">
            <img 
              src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg"
              alt="Students learning"
              className="rounded-lg shadow-xl"
            />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-purple-600/10 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
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
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
      <div className="text-purple-600 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="opacity-80">{description}</p>
    </div>
  );
};

export default Features;