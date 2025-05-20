import React from 'react';
import { Test, QuestionStatus } from '../../types';

export interface TestResultsProps {
  test: Test;
  statusMap: Record<string, QuestionStatus>;
}

declare const TestResults: React.FC<TestResultsProps>;
export default TestResults; 