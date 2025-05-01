import React from 'react';
import { CheckCircle, Circle, HelpCircle } from 'lucide-react';
import { Category, QuestionStatus } from '../../types';

interface QuestionsListProps {
  categories: Category[];
  currentCategoryId: string;
  currentQuestionId: string;
  statusMap: Record<string, QuestionStatus>;
  onSelectQuestion: (categoryId: string, questionId: string) => void;
}

const QuestionsList: React.FC<QuestionsListProps> = ({
  categories,
  currentCategoryId,
  currentQuestionId,
  statusMap,
  onSelectQuestion
}) => {
  return (
    <div className="h-full overflow-y-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <h2 className="text-xl font-bold mb-4 px-2">Categories</h2>
      <div className="space-y-4">
        {categories.map((category) => (
          <div key={category.id} className="mb-4">
            <h3 
              className={`text-lg font-semibold mb-2 px-2 py-1 rounded ${
                currentCategoryId === category.id 
                  ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300' 
                  : ''
              }`}
            >
              {category.name}
            </h3>
            <ul className="space-y-1 pl-2">
              {category.questions.map((question, index) => {
                const status = statusMap[question.id] || { attempted: false, completed: false, selectedOption: null };
                let statusIcon;
                
                if (status.completed) {
                  statusIcon = <CheckCircle className="h-4 w-4 text-green-500" />;
                } else if (status.attempted) {
                  statusIcon = <HelpCircle className="h-4 w-4 text-yellow-500" />;
                } else {
                  statusIcon = <Circle className="h-4 w-4 text-gray-400" />;
                }
                
                return (
                  <li key={question.id}>
                    <button
                      className={`flex items-center space-x-2 w-full text-left px-3 py-2 rounded-md transition-colors ${
                        currentQuestionId === question.id
                          ? 'bg-purple-600 text-white'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                      onClick={() => onSelectQuestion(category.id, question.id)}
                    >
                      <span>{statusIcon}</span>
                      <span>Question {index + 1}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionsList;