import type { Topic, Question } from '@/types';
import { Lightbulb, BookOpen, ArrowRight } from 'lucide-react';
import { BackToTopics } from '@/components/BackToTopics';

interface MisconceptionViewProps {
  topic: Topic;
  question: Question;
  userAnswer: string;
  misconceptionExplanation: string;
  hasProgress: boolean;
  onBackToTopics: () => void;
  onContinue: () => void;
}

export function MisconceptionView({
  topic,
  question,
  userAnswer,
  misconceptionExplanation,
  hasProgress,
  onBackToTopics,
  onContinue,
}: MisconceptionViewProps) {
  return (
    <div className="min-h-screen bg-ink-50 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl animate-slideUp">
        <div className="mb-4">
          <BackToTopics hasProgress={hasProgress} onConfirm={onBackToTopics} />
        </div>

        <div className="mb-6 flex items-center gap-2">
          <span className={`text-sm font-medium ${topic.accent}`}>{topic.title}</span>
        </div>

        <div className="space-y-4">
          {/* What went wrong */}
          <div className="bg-white rounded-2xl border border-ink-200 shadow-sm p-6 sm:p-7">
            <div className="flex items-center gap-2 mb-4">
              <div className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-amber-100">
                <Lightbulb className="w-4 h-4 text-amber-600" strokeWidth={2.2} />
              </div>
              <span className="text-xs font-medium text-ink-400 uppercase tracking-wider">
                What happened
              </span>
            </div>

            <div className="flex items-start gap-3 mb-5 p-4 rounded-xl bg-red-50 border border-red-100">
              <span className="text-sm text-red-700 font-medium flex-shrink-0 mt-0.5">
                Your answer:
              </span>
              <span className="text-lg font-semibold text-red-700">{userAnswer}</span>
            </div>

            <p className="text-ink-700 leading-relaxed text-base">
              {misconceptionExplanation}
            </p>
          </div>

          {/* Correct method */}
          <div className="bg-white rounded-2xl border border-ink-200 shadow-sm p-6 sm:p-7">
            <div className="flex items-center gap-2 mb-4">
              <div className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-100">
                <BookOpen className="w-4 h-4 text-emerald-600" strokeWidth={2.2} />
              </div>
              <span className="text-xs font-medium text-ink-400 uppercase tracking-wider">
                The correct method
              </span>
            </div>

            <p className="text-ink-700 leading-relaxed text-base mb-4">
              {question.correctMethod}
            </p>

            <div className="flex items-center gap-2 p-4 rounded-xl bg-emerald-50 border border-emerald-100">
              <span className="text-sm text-emerald-700 font-medium">Answer:</span>
              <span className="text-lg font-bold text-emerald-700">{question.displayAnswer}</span>
            </div>
          </div>

          <button
            onClick={onContinue}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-ink-900 text-white font-medium rounded-xl hover:bg-ink-800 transition-all"
          >
            Try a follow-up question
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
