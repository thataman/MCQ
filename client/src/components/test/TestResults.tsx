import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, CheckCircle, XCircle, AlertCircle, Trophy, Target, TrendingUp } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import QuestionsList from './QuestionsList';

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

const TestResults: React.FC<TestResultsProps> = ({ test, statusMap }) => {
  const navigate = useNavigate();
  const [currentQuestionId, setCurrentQuestionId] = useState(test.questions[0]?.id || 0);
  
  // Calculate overall statistics
  const totalQuestions = test.questions.length;
  const attemptedQuestions = Object.values(statusMap).filter(status => status.attempted).length;
  const correctAnswers = Object.values(statusMap).filter(
    status => status.selectedOption !== null && 
    test.questions.find(q => q.id === status.id)?.correctAnswer === status.selectedOption
  ).length;
  
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);
  const attemptedPercentage = Math.round((attemptedQuestions / totalQuestions) * 100);

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
  const isCorrect = status?.selectedOption === currentQuestion.correctAnswer;
  const wasAttempted = status?.attempted || false;

  const getPerformanceColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600 dark:text-green-400';
    if (percentage >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getPerformanceMessage = (percentage: number) => {
    if (percentage >= 80) return 'Excellent Performance!';
    if (percentage >= 60) return 'Good Performance!';
    return 'Needs Improvement';
  };

  return (
    <div className="min-h-screen bg-background p-4">
      {/* Fixed Score Summary Header */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl px-4">
        <Card className="bg-background/95 backdrop-blur-sm border shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Trophy className={`h-6 w-6 ${getPerformanceColor(percentage)}`} />
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${getPerformanceColor(percentage)}`}>
                      {percentage}%
                    </div>
                    <div className="text-xs text-muted-foreground">Score</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-green-500" />
                  <div className="text-center">
                    <div className="text-xl font-bold text-green-600 dark:text-green-400">
                      {correctAnswers}/{totalQuestions}
                    </div>
                    <div className="text-xs text-muted-foreground">Correct</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-500" />
                  <div className="text-center">
                    <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
                      {attemptedPercentage}%
                    </div>
                    <div className="text-xs text-muted-foreground">Attempted</div>
                  </div>
                </div>
              </div>
              <Badge 
                variant={percentage >= 70 ? "default" : "destructive"}
                className="text-sm px-3 py-1"
              >
                {getPerformanceMessage(percentage)}
              </Badge>
            </div>
            <Progress value={percentage} className="mt-3 h-2" />
          </CardContent>
        </Card>
      </div>

      <div className="pt-32 flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto">
        {/* Questions List */}
        <div className="w-full lg:w-1/3">
          <QuestionsList
            questions={test.questions}
            currentQuestionId={currentQuestionId}
            statusMap={statusMap}
            onSelectQuestion={handleSelectQuestion}
          />
        </div>

        {/* Question Review */}
        <div className="w-full lg:w-2/3 space-y-6">
          <Card>
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

              <div className="space-y-3">
                {Object.entries(currentQuestion.options).map(([optionKey, optionText]) => (
                  <div
                    key={optionKey}
                    className={`p-4 rounded-lg border ${
                      optionKey === currentQuestion.correctAnswer
                        ? 'bg-green-50 border-green-200 text-green-700 dark:bg-green-950/20 dark:border-green-800 dark:text-green-300'
                        : optionKey === status?.selectedOption && !isCorrect
                        ? 'bg-red-50 border-red-200 text-red-700 dark:bg-red-950/20 dark:border-red-800 dark:text-red-300'
                        : 'bg-muted/50 border-border'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{optionKey}.</span>
                        {optionKey === currentQuestion.correctAnswer && (
                          <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                        )}
                        {optionKey === status?.selectedOption && !isCorrect && (
                          <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                        )}
                      </div>
                      <span className="flex-1">{optionText}</span>
                      {optionKey === currentQuestion.correctAnswer && (
                        <Badge variant="outline" className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                          Correct Answer
                        </Badge>
                      )}
                      {optionKey === status?.selectedOption && optionKey !== currentQuestion.correctAnswer && (
                        <Badge variant="outline" className="bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300">
                          Your Answer
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <Alert className={isCorrect ? "border-green-200 bg-green-50 dark:bg-green-950/20" : "border-blue-200 bg-blue-50 dark:bg-blue-950/20"}>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {wasAttempted ? (
                    isCorrect ? (
                      "Great job! You selected the correct answer."
                    ) : (
                      `The correct answer is "${currentQuestion.options[currentQuestion.correctAnswer as keyof typeof currentQuestion.options]}". Review this concept for better understanding.`
                    )
                  ) : (
                    "You didn't attempt this question. Make sure to answer all questions to maximize your score."
                  )}
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center">
            <Button 
              variant="outline" 
              onClick={() => navigate('/')}
              className="flex items-center gap-2"
            >
              <Home className="h-4 w-4" />
              Back to Home
            </Button>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={!canGoPrevious}
              >
                Previous
              </Button>
              <Button
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