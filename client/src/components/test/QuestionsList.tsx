import React from 'react';
import { CheckCircle, Circle, HelpCircle, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '../ui/progress';

interface Question {
  id: number;
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
}

interface QuestionStatus {
  id: number;
  attempted: boolean;
  completed: boolean;
  selectedOption: string | null;
}

interface QuestionsListProps {
  questions: Question[];
  currentQuestionId: number;
  statusMap: Record<number, QuestionStatus>;
  onSelectQuestion: (questionId: number) => void;
}

const QuestionsList: React.FC<QuestionsListProps> = ({
  questions,
  currentQuestionId,
  statusMap,
  onSelectQuestion
}) => {
  const getStatusCounts = () => {
    const totalQuestions = questions.length;
    const completed = Object.values(statusMap).filter(status => status.completed).length;
    const attempted = Object.values(statusMap).filter(status => status.attempted && !status.completed).length;
    const notAttempted = questions.length - completed - attempted;
    const overallProgress = Math.round(((completed + attempted) / totalQuestions) * 100) || 0;
    
    return { completed, attempted, notAttempted, overallProgress };
  };

  const { completed, attempted, notAttempted, overallProgress } = getStatusCounts();

  return (
    <Card className="h-full flex flex-col max-h-[calc(100vh-2rem)]">
      <CardHeader className="pb-4 flex-shrink-0">
        <CardTitle className="text-base flex items-center gap-2">
          <TrendingUp className="h-4 w-4" />
          Progress Summary
        </CardTitle>
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="font-medium">Overall Progress</span>
            <span className="text-muted-foreground">{overallProgress}%</span>
          </div>
          <Progress value={overallProgress} className="h-2" />
        </div>
        <CardTitle className="text-lg">Questions</CardTitle>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
            <CheckCircle className="h-3 w-3 mr-1" />
            {completed} Completed
          </Badge>
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300">
            <HelpCircle className="h-3 w-3 mr-1" />
            {attempted} Attempted
          </Badge>
          <Badge variant="secondary" className="bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
            <Circle className="h-3 w-3 mr-1" />
            {notAttempted} Not Attempted
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 min-h-0 p-0">
        <ScrollArea className="h-full">
          <div className="p-4">
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-4 xl:grid-cols-5 gap-2">
              {questions.map((question, index) => {
                const status = statusMap[question.id] || { 
                  id: question.id,
                  attempted: false, 
                  completed: false, 
                  selectedOption: null 
                };
                
                let statusIcon;
                let statusColor = '';
                
                if (status.completed) {
                  statusIcon = <CheckCircle className="h-4 w-4" />;
                  statusColor = 'bg-green-100 text-green-700 border-green-200 hover:bg-green-200 dark:bg-green-900 dark:text-green-300 dark:border-green-800 dark:hover:bg-green-800';
                } else if (status.attempted) {
                  statusIcon = <HelpCircle className="h-4 w-4" />;
                  statusColor = 'bg-yellow-100 text-yellow-700 border-yellow-200 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-300 dark:border-yellow-800 dark:hover:bg-yellow-800';
                } else {
                  statusIcon = <Circle className="h-4 w-4" />;
                  statusColor = 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700';
                }

                const isCurrentQuestion = currentQuestionId === question.id;
                
                return (
                  <Button
                    key={question.id}
                    variant="outline"
                    size="sm"
                    className={`h-12 flex flex-col items-center justify-center p-2 ${
                      isCurrentQuestion 
                        ? 'border-primary ring-2 ring-primary/20'
                        : statusColor
                    }`}
                    onClick={() => onSelectQuestion(question.id)}
                  >
                    <div className="flex items-center justify-center">
                      {statusIcon}
                    </div>
                    <span className="text-xs font-medium">
                      {index + 1}
                    </span>
                  </Button>
                );
              })}
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default QuestionsList;