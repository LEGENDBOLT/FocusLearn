export type AppView = 'timer' | 'analysis' | 'chat' | 'settings';

export interface StudySession {
  id: string;
  date: string;
  duration: number; // in seconds
  notes: string;
}

export interface AnalysisResult {
  summary: string;
  tip: string;
  indicators: {
    stress: number;
    happiness: number;
    concentration: number;
    fatigue: number;
  };
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  duration?: number; // in seconds
}