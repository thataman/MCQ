import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

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

interface QuestionDisplayProps {
  question: Question;
  questionNumber: number;
  status: QuestionStatus;
  onSelectOption: (optionKey: string) => void;
}

const QuestionDisplay: React.FC<QuestionDisplayProps> = ({
  question,
  questionNumber,
  status,
  onSelectOption,
}) => {
  const optionKeys = ['A', 'B', 'C', 'D'] as const;

  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Question {questionNumber}</CardTitle>
          <Badge 
            variant={status.completed ? "default" : status.attempted ? "secondary" : "outline"}
            className={
              status.completed 
                ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                : status.attempted 
                ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
            }
          >
            {status.completed ? 'Completed' : status.attempted ? 'Attempted' : 'Not Attempted'}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <p className="text-base leading-relaxed">{question.question}</p>
        </div>
        
        <RadioGroup 
          value={status.selectedOption || ''} 
          onValueChange={onSelectOption}
          className="space-y-1"
        >
          {optionKeys.map((optionKey) => {
        const isSelected = status.selectedOption === optionKey;
        return (
          <div 
            key={optionKey} 
            className={`space-y-1 transition-all ${
              isSelected ? "border-primary bg-primary/10" : "border-border bg-muted/50"
            } rounded-md border p-3`}
          >
            <div className="flex items-start space-x-3">
              <RadioGroupItem 
                value={optionKey} 
                id={`option-${optionKey}`} 
                className="mt-1"
              />
              <Label 
                htmlFor={`option-${optionKey}`} 
                className="flex-1 cursor-pointer text-sm leading-relaxed"
              >
                <span className="font-semibold text-primary mr-2">{optionKey}.</span>
                {question.options[optionKey]}
              </Label>
              {isSelected && <Badge >Selected</Badge>}
            </div>
          </div>
        );
      })}
        </RadioGroup>

      </CardContent>
    </Card>
  );
};

export default QuestionDisplay;