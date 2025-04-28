import React from 'react';
import { Question, QuestionStatus } from '../../types';

interface QuestionDisplayProps {
  question: Question;
  questionNumber: number;
  status: QuestionStatus;
  onSelectOption: (optionIndex: number) => void;
}

const QuestionDisplay: React.FC<QuestionDisplayProps> = ({
  question,
  questionNumber,
  status,
  onSelectOption,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="mb-4 flex justify-between items-center">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Question {questionNumber}
        </span>
      </div>
      <h3 className="text-xl font-semibold mb-6">{question.text}</h3>
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <div 
            key={index}
            className={`border rounded-lg p-4 cursor-pointer transition-all ${
              status.selectedOption === index 
                ? 'border-purple-600 bg-purple-50 dark:bg-purple-900 dark:bg-opacity-20' 
                : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700'
            }`}
            onClick={() => onSelectOption(index)}
          >
            <div className="flex items-center space-x-3">
              <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                status.selectedOption === index 
                  ? 'border-purple-600' 
                  : 'border-gray-400'
              }`}>
                {status.selectedOption === index && (
                  <div className="h-3 w-3 rounded-full bg-purple-600"></div>
                )}
              </div>
              <span>{option}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionDisplay;