export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

export interface Category {
  id: string;
  name: string;
  questions: Question[];
}

export interface Test {
  id: string;
  title: string;
  description: string;
  categories: Category[];
  timeLimit: number; // in minutes
}

export interface QuestionStatus {
  id: string;
  attempted: boolean;
  completed: boolean;
  selectedOption: number | null;
}

export interface UserProgress {
  currentQuestionId: string;
  currentCategoryId: string;
  statusMap: Record<string, QuestionStatus>;
  startTime: number;
  timeRemaining: number;
}

export type ThemeMode = 'light' | 'dark';