
export enum Difficulty {
  Beginner = 'Beginner',
  Intermediate = 'Intermediate',
  Advanced = 'Advanced'
}

export type VisualType = 
  | 'esm-loading' 
  | 'hmr' 
  | 'folder-tree' 
  | 'env-flow' 
  | 'bundling' 
  | 'lib-mode' 
  | 'cli-scaffold' 
  | 'proxy-flow' 
  | 'testing-loop' 
  | 'ssr-hydration';

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface PracticeChallenge {
  title: string;
  description: string;
  initialCode: string;
  type: 'css' | 'js' | 'html';
}

export interface Lesson {
  id: string;
  title: string;
  difficulty: Difficulty;
  content: string;
  codeSnippet?: string;
  quiz?: QuizQuestion[];
  practice?: PracticeChallenge;
  visual?: VisualType;
}

export interface UserProgress {
  completedLessons: string[];
  currentLessonId: string;
  points: number;
}
