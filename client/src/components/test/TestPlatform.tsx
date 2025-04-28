import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionsList from './QuestionsList';
import QuestionDisplay from './QuestionDisplay';
import TestControls from './TestControls';
import Timer from './Timer';
import ProgressSummary from './ProgressSummary';
import { Test, UserProgress, QuestionStatus } from '../../types';

interface TestPlatformProps {
  test: Test;
}

const TestPlatform: React.FC<TestPlatformProps> = ({ test }) => {
  const navigate = useNavigate();
  const firstCategoryId = test.categories[0]?.id || '';
  const firstQuestionId = test.categories[0]?.questions[0]?.id || '';
  
  const [progress, setProgress] = useState<UserProgress>({
    currentCategoryId: firstCategoryId,
    currentQuestionId: firstQuestionId,
    statusMap: {},
    startTime: Date.now(),
    timeRemaining: test.timeLimit * 60,
  });

  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (Object.keys(progress.statusMap).length === 0) {
      const initialStatusMap: Record<string, QuestionStatus> = {};
      
      test.categories.forEach(category => {
        category.questions.forEach(question => {
          initialStatusMap[question.id] = {
            id: question.id,
            attempted: false,
            completed: false,
            selectedOption: null,
          };
        });
      });
      
      setProgress(prev => ({
        ...prev,
        statusMap: initialStatusMap,
      }));
    }
  }, [test, progress.statusMap]);

  const currentCategory = test.categories.find(cat => cat.id === progress.currentCategoryId);
  const currentQuestion = currentCategory?.questions.find(q => q.id === progress.currentQuestionId);
  const currentQuestionIndex = currentCategory?.questions.findIndex(q => q.id === progress.currentQuestionId) || 0;
  const currentStatus = progress.statusMap[progress.currentQuestionId] || {
    id: progress.currentQuestionId,
    attempted: false,
    completed: false,
    selectedOption: null,
  };

  const isLastQuestion = currentQuestionIndex === (currentCategory?.questions.length || 0) - 1 &&
    test.categories.findIndex(cat => cat.id === progress.currentCategoryId) === test.categories.length - 1;

  const handleSelectQuestion = (categoryId: string, questionId: string) => {
    setProgress(prev => ({
      ...prev,
      currentCategoryId: categoryId,
      currentQuestionId: questionId,
    }));
  };

  const handlePrevious = () => {
    if (currentQuestionIndex === 0) {
      const categoryIndex = test.categories.findIndex(cat => cat.id === progress.currentCategoryId);
      if (categoryIndex > 0) {
        const prevCategory = test.categories[categoryIndex - 1];
        const lastQuestion = prevCategory.questions[prevCategory.questions.length - 1];
        handleSelectQuestion(prevCategory.id, lastQuestion.id);
      }
    } else {
      const prevQuestion = currentCategory?.questions[currentQuestionIndex - 1];
      if (prevQuestion) {
        handleSelectQuestion(progress.currentCategoryId, prevQuestion.id);
      }
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex === (currentCategory?.questions.length || 0) - 1) {
      const categoryIndex = test.categories.findIndex(cat => cat.id === progress.currentCategoryId);
      if (categoryIndex < test.categories.length - 1) {
        const nextCategory = test.categories[categoryIndex + 1];
        const firstQuestion = nextCategory.questions[0];
        handleSelectQuestion(nextCategory.id, firstQuestion.id);
      }
    } else {
      const nextQuestion = currentCategory?.questions[currentQuestionIndex + 1];
      if (nextQuestion) {
        handleSelectQuestion(progress.currentCategoryId, nextQuestion.id);
      }
    }
  };

  const handleSelectOption = (optionIndex: number) => {
    setProgress(prev => ({
      ...prev,
      statusMap: {
        ...prev.statusMap,
        [progress.currentQuestionId]: {
          id: progress.currentQuestionId,
          attempted: true,
          completed: true,
          selectedOption: optionIndex,
        },
      },
    }));
  };

  const handleClearOption = () => {
    setProgress(prev => ({
      ...prev,
      statusMap: {
        ...prev.statusMap,
        [progress.currentQuestionId]: {
          id: progress.currentQuestionId,
          attempted: false,
          completed: false,
          selectedOption: null,
        },
      },
    }));
  };

  const handleSubmit = () => {
    const totalQuestions = test.categories.reduce(
      (total, category) => total + category.questions.length,
      0
    );
    const attempted = Object.values(progress.statusMap).filter(status => status.attempted).length;
    
    if (attempted < totalQuestions) {
      const confirmSubmit = window.confirm(
        `You have only attempted ${attempted} out of ${totalQuestions} questions. Are you sure you want to submit?`
      );
      if (!confirmSubmit) return;
    }
    
    // Here you would typically submit the test results
    alert('Test submitted successfully!');
    navigate('/'); // Navigate back to home page
  };

  const handleTimeEnd = () => {
    alert('Time is up! Your test has been submitted.');
    handleSubmit();
  };

  const canGoPrevious = currentQuestionIndex > 0 || 
    test.categories.findIndex(cat => cat.id === progress.currentCategoryId) > 0;
  const canGoNext = currentQuestionIndex < (currentCategory?.questions.length || 0) - 1 || 
    test.categories.findIndex(cat => cat.id === progress.currentCategoryId) < test.categories.length - 1;

  let overallQuestionNumber = 1;
  for (const category of test.categories) {
    if (category.id === progress.currentCategoryId) {
      overallQuestionNumber += currentQuestionIndex;
      break;
    }
    overallQuestionNumber += category.questions.length;
  }

  if (!currentQuestion) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-[calc(100vh-160px)] flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-1/3 lg:w-1/4 h-full flex flex-col space-y-4">
        <QuestionsList
          categories={test.categories}
          currentCategoryId={progress.currentCategoryId}
          currentQuestionId={progress.currentQuestionId}
          statusMap={progress.statusMap}
          onSelectQuestion={handleSelectQuestion}
        />
        
        <ProgressSummary
          categories={test.categories}
          statusMap={progress.statusMap}
        />
      </div>
      
      <div className="w-full md:w-2/3 lg:w-3/4 h-full flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-bold">{test.title}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Category: {currentCategory?.name}</p>
          </div>
          
          <Timer
            timeRemaining={progress.timeRemaining}
            onTimeEnd={handleTimeEnd}
            isPaused={isPaused}
          />
        </div>
        
        <div className="flex-grow">
          <QuestionDisplay
            question={currentQuestion}
            questionNumber={overallQuestionNumber}
            status={currentStatus}
            onSelectOption={handleSelectOption}
          />
        </div>
        
        <TestControls
          onPrevious={handlePrevious}
          onNext={handleNext}
          onClear={handleClearOption}
          onSubmit={handleSubmit}
          canGoPrevious={canGoPrevious}
          canGoNext={canGoNext}
          isLastQuestion={isLastQuestion}
          currentQuestionHasAnswer={currentStatus.selectedOption !== null}
        />
      </div>
    </div>
  );
};

export default TestPlatform;