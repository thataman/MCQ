import  { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ModeToggle } from '../mode-toggle';
import QuestionsList from './QuestionsList';

import { useTest } from '@/store/test.store';

interface Question {
  id: number;
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
    
  };
  correctAnswer?: string; // Add this if available
}

interface Test {
  testId: string;
  title: string;
  timeLimit: number;
  questions: Question[];
}

interface QuestionStatus {
  id: number;
  attempted: boolean;
  completed: boolean;
  selectedOption: string | null;
}

interface TestResultsProps {
  test: Test;
  statusMap: Record<number, QuestionStatus>;
}

const TestResults= () => {
  const navigate = useNavigate();

  const {stateAfterTestSubmit} = useTest(state => state);

  const dataFromSession = sessionStorage.getItem('testState') ;
 
  const { test, statusMap }:TestResultsProps = JSON.parse(dataFromSession || '{}');
  
  const [currentQuestionId, setCurrentQuestionId] = useState(test.questions[0]?.id || 0);
  
  const [fullScreen, setFullScreen] = useState(true);

  const totalQuestions = test.questions.length;
 // const attemptedQuestions = Object.values(statusMap).filter(status => status.attempted).length;
  const correctAnswers = Object.values(statusMap).filter(
    status => status.selectedOption !== null && 
    test.questions.find(q => q.id === status.id)?.correctAnswer === status.selectedOption
  ).length;
  
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);
  //const attemptedPercentage = Math.round((attemptedQuestions / totalQuestions) * 100);

// const handleFullscreen = () => {
//   if(fullScreen){
//       document.exitFullscreen()
//       setFullScreen(false);
//   }else{
//       document.documentElement.requestFullscreen();
//       setFullScreen(true);
//   }
// }




  useEffect(() => {
    if (percentage >= 70) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [percentage]);

  const currentQuestion = test.questions.find(q => q.id === currentQuestionId);
  const currentQuestionIndex = test.questions.findIndex(q => q.id === currentQuestionId);

  const handleSelectQuestion = (questionId: number) => {
    setCurrentQuestionId(questionId);
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      const prevQuestion = test.questions[currentQuestionIndex - 1];
      setCurrentQuestionId(prevQuestion.id);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < test.questions.length - 1) {
      const nextQuestion = test.questions[currentQuestionIndex + 1];
      setCurrentQuestionId(nextQuestion.id);
    }
  };

  const canGoPrevious = currentQuestionIndex > 0;
  const canGoNext = currentQuestionIndex < test.questions.length - 1;

  if (!currentQuestion) return null;

  const status = statusMap[currentQuestionId];
  const correctOption = stateAfterTestSubmit?.explanations[currentQuestionId]?.correct_option;
  const isCorrect = status?.selectedOption === correctOption;
  const wasAttempted = status?.attempted || false;
  
/*   const getPerformanceColor = (percentage: number) => {  
    if (percentage >= 80) return 'text-green-600 dark:text-green-400';
    if (percentage >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getPerformanceMessage = (percentage: number) => {
    if (percentage >= 80) return 'Excellent Performance!';
    if (percentage >= 60) return 'Good Performance!';
    return 'Needs Improvement';
  }; */

  return (
    <div className=" bg-primary-foreground/80 p-4">
      {/* Fixed Score Summary Header */}
    

      
      <div className=" flex  gap-2 mx-auto">
        {/* Questions List */}
        <div className="w-full lg:w-1/4">
          <QuestionsList
            questions={test.questions}
            currentQuestionId={currentQuestionId}
            statusMap={statusMap}
            onSelectQuestion={handleSelectQuestion}
            correctAnswers={stateAfterTestSubmit?.correctAnswers}
            isResultsPage = {true}
            stateAfterTestSubmit={stateAfterTestSubmit}
          />
        </div>

        {/* Question Review */}
        <div className="w-full lg:w-3/4 space-y-6 flex flex-col justify-between">
          <Card className='h-full'>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Question {currentQuestionIndex + 1}</span>
                <div className="flex items-center gap-2">
                  {wasAttempted ? (
                    isCorrect ? (
                      <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Correct
                      </Badge>
                    ) : (
                      <Badge variant="destructive">
                        <XCircle className="h-3 w-3 mr-1" />
                        Incorrect
                      </Badge>
                    )
                  ) : (
                    <Badge variant="secondary">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      Not Attempted
                    </Badge>
                  )}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <p className="text-base leading-relaxed">{currentQuestion.question}</p>
              </div>

              <div className="space-y-2">
                {Object.entries(currentQuestion.options).map(([optionKey, optionText]) => (
                  <div
                    key={optionKey}
                    className={`px-4 py-3 rounded-lg border ${
                      optionKey === stateAfterTestSubmit?.explanations[currentQuestionId]?.correct_option && isCorrect
                        ? 'bg-green-50 border-green-200 text-green-700 dark:bg-green-950/20 dark:border-green-800 dark:text-green-300'
                        : optionKey === status?.selectedOption && !isCorrect
                        ? 'bg-red-50 border-red-200 text-red-700 dark:bg-red-950/20 dark:border-red-800 dark:text-red-300'
                        : 'bg-muted/50 border-border'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{optionKey}.</span>
                        {optionKey === stateAfterTestSubmit?.explanations[currentQuestionId]?.correct_option && (
                          <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                        )}
                        {optionKey === status?.selectedOption && !isCorrect && (
                          <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                        )}
                      </div>
                      <span className="flex-1">{optionText}</span>
                      {optionKey === stateAfterTestSubmit?.explanations[currentQuestionId]?.correct_option && (
                        <Badge variant="outline" className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                          Correct Answer
                        </Badge>
                      )}
                      {optionKey === status?.selectedOption && optionKey !== stateAfterTestSubmit?.explanations[currentQuestionId]?.correct_option && (
                        <Badge variant="outline" className="bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300">
                          Your Answer
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>

             <div className="space-y-2 h-full">
              <h5>Explanation:</h5>
              <p>{stateAfterTestSubmit?.explanations[currentQuestionId]?.explanation}</p>
             </div>
            </CardContent>
          </Card>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={() => navigate('/')}
              className="flex items-center gap-6 p-5"
            >
              <Home className="h-4 w-4" />
              Back to Home
            </Button>
            {/* <Button 
              variant="outline" 
              onClick={handleFullscreen}
              className="flex items-center gap-6 p-5"
            >
              {
                fullScreen ? 
                <>
                <XCircle className="h-4 w-4" />
                <span>Exit Fullscreen</span>
                 <span className="sr-only">Exit Fullscreen</span>
                </>
                 :
                 <>
                <CheckCircle className="h-4 w-4" />
                    <span>Enter Fullscreen</span>
                 <span className="sr-only">Enter Fullscreen</span>
                </>
              }
              
            </Button> */}
            <ModeToggle />
            </div>
            
            <div className="flex gap-6">
              <Button
              className='p-5'
                variant="outline"
                onClick={handlePrevious}
                disabled={!canGoPrevious}
              >
                Previous
              </Button>
              <Button
              className='p-5'
                onClick={handleNext}
                disabled={!canGoNext}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestResults;