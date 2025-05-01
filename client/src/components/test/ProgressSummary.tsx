import React from 'react';
import { CheckCircle, HelpCircle, Circle } from 'lucide-react';
import { Category, QuestionStatus } from '../../types';

interface ProgressSummaryProps {
  categories: Category[];
  statusMap: Record<string, QuestionStatus>;
}

const ProgressSummary: React.FC<ProgressSummaryProps> = ({ categories, statusMap }) => {
  // Calculate progress statistics
  const totalQuestions = categories.reduce(
    (total, category) => total + category.questions.length,
    0
  );

  const completed = Object.values(statusMap).filter(status => status.completed).length;
  const attempted = Object.values(statusMap).filter(status => status.attempted && !status.completed).length;
  const notAttempted = totalQuestions - completed - attempted;

  const completedPercentage = Math.round((completed / totalQuestions) * 100) || 0;
  const attemptedPercentage = Math.round((attempted / totalQuestions) * 100) || 0;
  const notAttemptedPercentage = Math.round((notAttempted / totalQuestions) * 100) || 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold mb-3">Progress Summary</h3>
      
      <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-4">
        <div className="flex h-full">
          <div 
            className="bg-green-500" 
            style={{ width: `${completedPercentage}%` }}
          />
          <div 
            className="bg-yellow-500" 
            style={{ width: `${attemptedPercentage}%` }}
          />
          <div 
            className="bg-gray-400 dark:bg-gray-600" 
            style={{ width: `${notAttemptedPercentage}%` }}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-2">
        <ProgressStat
          icon={<CheckCircle className="h-4 w-4 text-green-500" />}
          label="Completed"
          count={completed}
          total={totalQuestions}
        />
        <ProgressStat
          icon={<HelpCircle className="h-4 w-4 text-yellow-500" />}
          label="Attempted"
          count={attempted}
          total={totalQuestions}
        />
        <ProgressStat
          icon={<Circle className="h-4 w-4 text-gray-400" />}
          label="Not Attempted"
          count={notAttempted}
          total={totalQuestions}
        />
      </div>
    </div>
  );
};

interface ProgressStatProps {
  icon: React.ReactNode;
  label: string;
  count: number;
  total: number;
}

const ProgressStat: React.FC<ProgressStatProps> = ({ icon, label, count, total }) => {
  const percentage = Math.round((count / total) * 100) || 0;
  
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center space-x-1 mb-1">
        {icon}
        <span className="text-sm font-medium">{label}</span>
      </div>
      <div className="text-center">
        <span className="text-sm">
          {count}/{total} ({percentage}%)
        </span>
      </div>
    </div>
  );
};

export default ProgressSummary;