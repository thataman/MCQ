import React from 'react';
import { ArrowLeft, ArrowRight, RotateCcw, Send } from 'lucide-react';

interface TestControlsProps {
  onPrevious: () => void;
  onNext: () => void;
  onClear: () => void;
  onSubmit: () => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
  isLastQuestion: boolean;
  currentQuestionHasAnswer: boolean;
}

const TestControls: React.FC<TestControlsProps> = ({
  onPrevious,
  onNext,
  onClear,
  onSubmit,
  canGoPrevious,
  canGoNext,
  isLastQuestion,
  currentQuestionHasAnswer
}) => {
  return (
    <div className="flex justify-end space-x-3 mt-6">
      <button
        onClick={onPrevious}
        disabled={!canGoPrevious}
        className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-300 transform hover:scale-105 ${
          canGoPrevious
            ? 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
            : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
        }`}
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Previous</span>
      </button>
      
      {currentQuestionHasAnswer && (
        <button
          onClick={onClear}
          className="flex items-center space-x-2 px-4 py-2 rounded-md bg-red-100 dark:bg-red-900 dark:bg-opacity-20 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900 dark:hover:bg-opacity-30 transition-all duration-300 transform hover:scale-105"
        >
          <RotateCcw className="h-4 w-4" />
          <span>Clear</span>
        </button>
      )}
      
      {isLastQuestion ? (
        <button
          onClick={onSubmit}
          className="flex items-center space-x-2 px-6 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition-all duration-300 transform hover:scale-105"
        >
          <Send className="h-4 w-4" />
          <span>Submit Test</span>
        </button>
      ) : (
        <button
          onClick={onNext}
          disabled={!canGoNext}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-300 transform hover:scale-105 ${
            canGoNext
              ? 'bg-purple-600 text-white hover:bg-purple-700'
              : 'bg-purple-300 dark:bg-purple-900 text-gray-100 cursor-not-allowed'
          }`}
        >
          <span>Next</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default TestControls;