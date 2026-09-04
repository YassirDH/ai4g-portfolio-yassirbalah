import { useState } from 'react';
import type { Topic } from '@/types';
import { MessageCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { BackToTopics } from '@/components/BackToTopics';

interface ReasoningStepProps {
  topic: Topic;
  userAnswer: string;
  hasProgress: boolean;
  onBackToTopics: () => void;
  onSubmit: (reasoning: string) => void;
  onSkip: () => void;
}

export function ReasoningStep({ topic, userAnswer, hasProgress, onBackToTopics, onSubmit, onSkip }: ReasoningStepProps) {
  const [reasoning, setReasoning] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(reasoning.trim());
  };

  return (
    <div className="min-h-screen bg-ink-50 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl animate-slideUp">
        <div className="mb-4">
          <BackToTopics hasProgress={hasProgress} onConfirm={onBackToTopics} />
        </div>

        <div className="mb-6 flex items-center gap-2">
          <span className={`text-sm font-medium ${topic.accent}`}>{topic.title}</span>
        </div>

        <div className="bg-white rounded-2xl border border-ink-200 shadow-sm p-7 sm:p-9">
          <div className="flex items-center gap-2 mb-5">
            <div className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-amber-100">
              <MessageCircle className="w-4 h-4 text-amber-600" strokeWidth={2.2} />
            </div>
            <span className="text-xs font-medium text-ink-400 uppercase tracking-wider">
              Not quite right
            </span>
          </div>

          <div className="flex items-start gap-3 mb-6 p-4 rounded-xl bg-red-50 border border-red-100">
            <span className="text-sm text-red-700 font-medium flex-shrink-0 mt-0.5">
              You answered:
            </span>
            <span className="text-lg font-semibold text-red-700">{userAnswer}</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-semibold text-ink-900 leading-snug mb-2">
            How did you get to this answer?
          </h2>
          <p className="text-ink-500 text-sm mb-5 leading-relaxed">
            Don't worry about being wrong — explain your thinking so I can help you understand where it went off track.
          </p>

          <form onSubmit={handleSubmit}>
            <textarea
              value={reasoning}
              onChange={(e) => setReasoning(e.target.value)}
              autoFocus
              rows={4}
              placeholder="I thought... so I... and then I got..."
              className="w-full px-4 py-3.5 text-base border border-ink-200 rounded-xl bg-ink-50 text-ink-900 placeholder:text-ink-300 transition-all focus:outline-none focus:ring-2 focus:ring-ink-900 focus:bg-white resize-none"
            />

            <div className="flex flex-col sm:flex-row gap-3 mt-5">
              <button
                type="submit"
                disabled={!reasoning.trim()}
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-ink-900 text-white font-medium rounded-xl hover:bg-ink-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                Help me understand
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={onSkip}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-ink-600 font-medium rounded-xl hover:bg-ink-100 transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                Skip
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
