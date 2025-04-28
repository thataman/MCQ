import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, BookOpen, Timer, Settings } from 'lucide-react';

interface Topic {
  id: string;
  name: string;
  subtopics: string[];
}

const availableTopics: Topic[] = [
  {
    id: 'web-dev',
    name: 'Web Development',
    subtopics: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js']
  },
  {
    id: 'data-structures',
    name: 'Data Structures',
    subtopics: ['Arrays', 'Linked Lists', 'Trees', 'Graphs', 'Hash Tables']
  },
  {
    id: 'algorithms',
    name: 'Algorithms',
    subtopics: ['Sorting', 'Searching', 'Dynamic Programming', 'Greedy', 'Recursion']
  }
];

const TestGenerator: React.FC = () => {
  const navigate = useNavigate();
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [timeLimit, setTimeLimit] = useState(60);
  const [questionsPerTopic, setQuestionsPerTopic] = useState(10);

  const handleTopicToggle = (subtopic: string) => {
    setSelectedTopics(prev => 
      prev.includes(subtopic)
        ? prev.filter(t => t !== subtopic)
        : [...prev, subtopic]
    );
  };

  const handleGenerate = () => {
    // Here you would typically generate the test based on selections
    // For now, we'll just navigate to the test page
    navigate('/test');
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8 animate-fade-in">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
          <Settings className="h-8 w-8 text-purple-600" />
          Test Configuration
        </h1>
        
        <div className="space-y-8">
          {/* Topics Selection */}
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-purple-600" />
              Select Topics
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {availableTopics.map(topic => (
                <div key={topic.id} className="space-y-2">
                  <h3 className="font-medium text-purple-600">{topic.name}</h3>
                  <div className="space-y-2">
                    {topic.subtopics.map(subtopic => (
                      <label 
                        key={subtopic} 
                        className="flex items-center space-x-2 cursor-pointer group"
                      >
                        <input
                          type="checkbox"
                          checked={selectedTopics.includes(subtopic)}
                          onChange={() => handleTopicToggle(subtopic)}
                          className="form-checkbox h-5 w-5 text-purple-600 rounded border-gray-300 
                                   focus:ring-purple-500 transition-colors duration-200"
                        />
                        <span className="group-hover:text-purple-600 transition-colors duration-200">
                          {subtopic}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Time Limit */}
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Clock className="h-6 w-6 text-purple-600" />
              Time Limit (minutes)
            </h2>
            <input
              type="range"
              min="15"
              max="180"
              step="15"
              value={timeLimit}
              onChange={(e) => setTimeLimit(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer 
                       dark:bg-gray-700"
            />
            <div className="flex justify-between mt-2">
              <span>15 min</span>
              <span className="text-purple-600 font-medium">{timeLimit} min</span>
              <span>180 min</span>
            </div>
          </div>

          {/* Questions per Topic */}
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Timer className="h-6 w-6 text-purple-600" />
              Questions per Topic
            </h2>
            <input
              type="range"
              min="5"
              max="20"
              step="5"
              value={questionsPerTopic}
              onChange={(e) => setQuestionsPerTopic(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer 
                       dark:bg-gray-700"
            />
            <div className="flex justify-between mt-2">
              <span>5 questions</span>
              <span className="text-purple-600 font-medium">{questionsPerTopic} questions</span>
              <span>20 questions</span>
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleGenerate}
            disabled={selectedTopics.length === 0}
            className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform 
                     hover:scale-105 ${
                       selectedTopics.length > 0
                         ? 'bg-purple-600 text-white hover:bg-purple-700'
                         : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                     }`}
          >
            Generate Test
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestGenerator;