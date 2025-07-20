import React from 'react';
import { ArrowLeft, ArrowRight, RotateCcw, Send } from 'lucide-react';
import { Button } from '../ui/button';

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
      <Button
        onClick={onPrevious}
        disabled={!canGoPrevious}
        className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-300 transform hover:scale-105 ${
          !canGoPrevious && 'cursor-not-allowed'
           }`}
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Previous</span>
      </Button>

      {currentQuestionHasAnswer && (
        < Button
          onClick={onClear}
          variant={`destructive`}
          className="flex items-center space-x-2 px-4 py-2 rounded-md  transition-all duration-300 transform hover:scale-105"
        >
          <RotateCcw className="h-4 w-4" />
          <span>Clear</span>
        </Button>
      )}
      
      {isLastQuestion ? (
        <Button
          onClick={onSubmit}
          className="flex items-center space-x-2 px-6 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition-all duration-300 transform hover:scale-105"
        >
          <Send className="h-4 w-4" />
          <span>Submit Test</span>
        </Button>
      ) : (
        <Button
          onClick={onNext}
          disabled={!canGoNext}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-300 transform hover:scale-105 ${
            !canGoNext && 'cursor-not-allowed'
          }`}
        >
          <span>Next</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default TestControls;