import React from 'react';
import { BookOpen, Users, Award, Zap } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-6">
          About Our Platform
        </h1>
        <p className="text-xl opacity-80 max-w-3xl mx-auto">
          We're dedicated to making learning and assessment more accessible, 
          engaging, and effective for everyone.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <div className="relative">
          <div className="aspect-video rounded-lg overflow-hidden shadow-xl">
            <img 
              src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg" 
              alt="Team collaboration" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-purple-600/10 rounded-full blur-2xl" />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg opacity-80 mb-6">
            To provide a comprehensive learning platform that adapts to individual needs,
            making education more accessible and engaging through technology.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-purple-600" />
              <span>Quality Content</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-purple-600" />
              <span>Community Driven</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-purple-600" />
              <span>Expert Verified</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-purple-600" />
              <span>Fast Learning</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <StatCard 
          number="50K+"
          label="Active Users"
          description="Students and professionals trust our platform for their learning journey"
        />
        <StatCard 
          number="1000+"
          label="Test Questions"
          description="Carefully curated and regularly updated question bank"
        />
        <StatCard 
          number="95%"
          label="Success Rate"
          description="Users report improved understanding and test scores"
        />
      </div>
    </div>
  );
};

interface StatCardProps {
  number: string;
  label: string;
  description: string;
}

const StatCard: React.FC<StatCardProps> = ({ number, label, description }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="text-3xl font-bold text-purple-600 mb-2">{number}</div>
      <div className="font-semibold mb-2">{label}</div>
      <p className="text-sm opacity-80">{description}</p>
    </div>
  );
};

export default About;