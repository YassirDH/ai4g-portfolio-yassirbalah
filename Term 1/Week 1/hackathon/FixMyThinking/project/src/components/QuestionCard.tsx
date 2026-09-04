import { useState } from 'react';
import type { Topic, Question } from '@/types';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { checkAnswer } from '@/utils/answerCheck';
import { BackToTopics } from '@/components/BackToTopics';

interface QuestionCardProps {
  topic: Topic;
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  hasProgress: boolean;
  onBackToTopics: () => void;
  onAnswer: (correct: boolean, userAnswer: string) => void;
}

export function QuestionCard({
  topic,
  question,
  questionNumber,
  totalQuestions,
  hasProgress,
  onBackToTopics,
  onAnswer,
}: QuestionCardProps) {
  const [answer, setAnswer] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!answer.trim()) return;
    const correct = checkAnswer(answer.trim(), question.answer);
    onAnswer(correct, answer.trim());
  };

  const progress = (questionNumber / totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-ink-50 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl animate-slideUp">
        {/* Back navigation */}
        <div className="mb-4">
          <BackToTopics hasProgress={hasProgress} onConfirm={onBackToTopics} />
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2">
              <span className={`text-sm font-medium ${topic.accent}`}>{topic.title}</span>
            </div>
            <span className="text-sm text-ink-400 font-medium tabular-nums">
              {questionNumber} / {totalQuestions}
            </span>
          </div>
          <div className="h-1.5 bg-ink-200 rounded-full overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${topic.gradient} rounded-full transition-all duration-500 ease-out`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question card */}
        <div className="bg-white rounded-2xl border border-ink-200 shadow-sm p-7 sm:p-9">
          <div className="flex items-center gap-2 mb-5">
            <div className={`inline-flex items-center justify-center w-7 h-7 rounded-lg bg-ink-100`}>
              <span className="text-xs font-bold text-ink-600 tabular-nums">{questionNumber}</span>
            </div>
            <span className="text-xs font-medium text-ink-400 uppercase tracking-wider">
              Question
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-semibold text-ink-900 leading-snug mb-7">
            {question.prompt}
          </h2>

          <form onSubmit={handleSubmit}>
            <label className="block text-sm font-medium text-ink-600 mb-2">
              Your answer
            </label>
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              autoFocus
              placeholder="Type your answer..."
              className="w-full px-4 py-3.5 text-lg border border-ink-200 rounded-xl bg-ink-50 text-ink-900 placeholder:text-ink-300 transition-all focus:outline-none focus:ring-2 focus:ring-ink-900 focus:bg-white"
            />

            <button
              type="submit"
              disabled={!answer.trim()}
              className="w-full mt-5 inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-ink-900 text-white font-medium rounded-xl hover:bg-ink-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all focus:outline-none focus:ring-2 focus:ring-ink-900 focus:ring-offset-2"
            >
              Check answer
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export function CorrectFeedback({
  hasProgress,
  onBackToTopics,
  onNext,
}: {
  hasProgress: boolean;
  onBackToTopics: () => void;
  onNext: () => void;
}) {
  return (
    <div className="min-h-screen bg-ink-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md animate-scaleIn text-center">
        <div className="mb-4 flex justify-start">
          <BackToTopics hasProgress={hasProgress} onConfirm={onBackToTopics} />
        </div>
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 mb-5">
          <CheckCircle2 className="w-8 h-8 text-emerald-600" strokeWidth={2.2} />
        </div>
        <h2 className="text-2xl font-bold text-ink-900 mb-2">Correct!</h2>
        <p className="text-ink-500 mb-7">Nice work — that's the right answer.</p>
        <button
          onClick={onNext}
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-ink-900 text-white font-medium rounded-xl hover:bg-ink-800 transition-all"
        >
          Next question
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
