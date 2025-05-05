import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Test, QuestionStatus } from '../../types';
import {  Home } from 'lucide-react';
import confetti from 'canvas-confetti';
import QuestionsList from './QuestionsList';


interface TestResultsProps {
  test: Test;
  statusMap: Record<string, QuestionStatus>;
}

const TestResults: React.FC<TestResultsProps> = ({ test, statusMap }) => {
  const navigate = useNavigate();
  const [currentCategoryId, setCurrentCategoryId] = useState(test.categories[0].id);
  const [currentQuestionId, setCurrentQuestionId] = useState(test.categories[0].questions[0].id);
  
  // Calculate overall statistics
  const totalQuestions = test.categories.reduce(
    (total, category) => total + category.questions.length, 0
  );
  
  const correctAnswers = Object.values(statusMap).filter(
    status => status.selectedOption !== null && 
    test.categories
      .flatMap(cat => cat.questions)
      .find(q => q.id === status.id)?.correctAnswer === status.selectedOption
  ).length;
  
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);

  useEffect(() => {
    if (percentage >= 70) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, []);

  const currentCategory = test.categories.find(cat => cat.id === currentCategoryId);
  const currentQuestion = currentCategory?.questions.find(q => q.id === currentQuestionId);
  const currentQuestionIndex = currentCategory?.questions.findIndex(q => q.id === currentQuestionId) || 0;

  const handleSelectQuestion = (categoryId: string, questionId: string) => {
    setCurrentCategoryId(categoryId);
    setCurrentQuestionId(questionId);
  };

  const handlePrevious = () => {
    if (currentQuestionIndex === 0) {
      const categoryIndex = test.categories.findIndex(cat => cat.id === currentCategoryId);
      if (categoryIndex > 0) {
        const prevCategory = test.categories[categoryIndex - 1];
        const lastQuestion = prevCategory.questions[prevCategory.questions.length - 1];
        handleSelectQuestion(prevCategory.id, lastQuestion.id);
      }
    } else {
      const prevQuestion = currentCategory?.questions[currentQuestionIndex - 1];
      if (prevQuestion) {
        handleSelectQuestion(currentCategoryId, prevQuestion.id);
      }
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex === (currentCategory?.questions.length || 0) - 1) {
      const categoryIndex = test.categories.findIndex(cat => cat.id === currentCategoryId);
      if (categoryIndex < test.categories.length - 1) {
        const nextCategory = test.categories[categoryIndex + 1];
        const firstQuestion = nextCategory.questions[0];
        handleSelectQuestion(nextCategory.id, firstQuestion.id);
      }
    } else {
      const nextQuestion = currentCategory?.questions[currentQuestionIndex + 1];
      if (nextQuestion) {
        handleSelectQuestion(currentCategoryId, nextQuestion.id);
      }
    }
  };

  const canGoPrevious = currentQuestionIndex > 0 || 
    test.categories.findIndex(cat => cat.id === currentCategoryId) > 0;
  const canGoNext = currentQuestionIndex < (currentCategory?.questions.length || 0) - 1 || 
    test.categories.findIndex(cat => cat.id === currentCategoryId) < test.categories.length - 1;

  if (!currentQuestion) return null;

  const status = statusMap[currentQuestionId];
  const isCorrect = status?.selectedOption === currentQuestion.correctAnswer;

  return (
    <div className="h-[calc(100vh-160px)] flex flex-col md:flex-row gap-6">
      {/* Score Summary */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 z-50 flex gap-8">
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">{percentage}%</div>
          <div className="text-sm opacity-80">Score</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-500">{correctAnswers}/{totalQuestions}</div>
          <div className="text-sm opacity-80">Correct</div>
        </div>
      </div>

      {/* Questions List */}
      <div className="w-full md:w-1/3 lg:w-1/4 h-full">
        <QuestionsList
          categories={test.categories}
          currentCategoryId={currentCategoryId}
          currentQuestionId={currentQuestionId}
          statusMap={statusMap}
          onSelectQuestion={handleSelectQuestion}
        />
      </div>

      {/* Question Display */}
      <div className="w-full md:w-2/3 lg:w-3/4 h-full flex flex-col">
        <div className="flex-grow">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-6">{currentQuestion.text}</h3>
            <div className="space-y-4">
              {currentQuestion.options.map((option, optIndex) => (
                <div
                  key={optIndex}
                  className={`p-4 rounded-lg ${
                    optIndex === currentQuestion.correctAnswer
                      ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                      : optIndex === status?.selectedOption && !isCorrect
                      ? 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300'
                      : 'bg-gray-50 dark:bg-gray-700/50'
                  }`}
                >
                  {option}
                  {optIndex === currentQuestion.correctAnswer && (
                    <span className="ml-2 text-green-600 dark:text-green-400">
                      (Correct Answer)
                    </span>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <h4 className="font-semibold text-purple-600 dark:text-purple-400 mb-2">
                Explanation
              </h4>
              <p className="opacity-80">
                {isCorrect
                  ? "Great job! You selected the correct answer."
                  : `The correct answer is "${currentQuestion.options[currentQuestion.correctAnswer]}". ${
                      status?.attempted
                        ? "Your answer was incorrect. Review the concept and try again."
                        : "You didn't attempt this question. Make sure to answer all questions next time."
                    }`}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="mt-6 flex justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center px-6 py-3 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            <Home className="h-5 w-5 mr-2" />
            Back to Home
          </button>
          <div className="flex gap-3">
            <button
              onClick={handlePrevious}
              disabled={!canGoPrevious}
              className={`px-6 py-3 rounded-lg transition-colors ${
                canGoPrevious
                  ? 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
              }`}
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={!canGoNext}
              className={`px-6 py-3 rounded-lg transition-colors ${
                canGoNext
                  ? 'bg-purple-600 text-white hover:bg-purple-700'
                  : 'bg-purple-300 text-gray-100 cursor-not-allowed'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestResults;