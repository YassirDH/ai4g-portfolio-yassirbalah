export type TopicId = 'percentages' | 'fractions' | 'order-of-operations';

export interface Topic {
  id: TopicId;
  title: string;
  description: string;
  icon: string;
  accent: string;
  gradient: string;
}

export interface Misconception {
  keywords: string[];
  explanation: string;
}

export interface FollowUpQuestion {
  id: string;
  prompt: string;
  answer: number;
  displayAnswer: string;
  correctMethod: string;
  misconceptions: Misconception[];
}

export interface Question extends FollowUpQuestion {
  followUp: FollowUpQuestion;
}
