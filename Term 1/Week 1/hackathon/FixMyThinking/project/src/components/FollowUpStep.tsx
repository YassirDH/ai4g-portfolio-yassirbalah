import { useState } from 'react';
import type { Topic, FollowUpQuestion } from '@/types';
import { checkAnswer } from '@/utils/answerCheck';
import { CheckCircle2, XCircle, BookOpen, ArrowRight, RotateCcw } from 'lucide-react';
import { BackToTopics } from '@/components/BackToTopics';

interface FollowUpStepProps {
  topic: Topic;
  followUp: FollowUpQuestion;
  hasProgress: boolean;
  onBackToTopics: () => void;
  onResult: (correct: boolean) => void;
  onFinish: () => void;
}

export function FollowUpStep({ topic, followUp, hasProgress, onBackToTopics, onResult, onFinish }: FollowUpStepProps) {
  const [answer, setAnswer] = useState('');
  const [state, setState] = useState<'answering' | 'correct' | 'incorrect'>('answering');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!answer.trim()) return;
    const correct = checkAnswer(answer.trim(), followUp.answer);
    setState(correct ? 'correct' : 'incorrect');
    onResult(correct);
  };

  return (
    <div className="min-h-screen bg-ink-50 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl animate-slideUp">
        <div className="mb-4">
          <BackToTopics hasProgress={hasProgress} onConfirm={onBackToTopics} />
        </div>

        <div className="mb-6 flex items-center gap-2">
          <span className={`text-sm font-medium ${topic.accent}`}>{topic.title}</span>
          <span className="text-ink-300">·</span>
          <span className="text-sm font-medium text-ink-500">Follow-up check</span>
        </div>

        <div className="bg-white rounded-2xl border border-ink-200 shadow-sm p-7 sm:p-9">
          {state === 'answering' && (
            <>
              <div className="flex items-center gap-2 mb-5">
                <div className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-sky-100">
                  <RotateCcw className="w-4 h-4 text-sky-600" strokeWidth={2.2} />
                </div>
                <span className="text-xs font-medium text-ink-400 uppercase tracking-wider">
                  Let's check your understanding
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-semibold text-ink-900 leading-snug mb-7">
                {followUp.prompt}
              </h2>

              <form onSubmit={handleSubmit}>
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
                  className="w-full mt-5 inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-ink-900 text-white font-medium rounded-xl hover:bg-ink-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  Check answer
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </>
          )}

          {state === 'correct' && (
            <div className="text-center py-4 animate-scaleIn">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 mb-5">
                <CheckCircle2 className="w-8 h-8 text-emerald-600" strokeWidth={2.2} />
              </div>
              <h2 className="text-2xl font-bold text-ink-900 mb-2">You've got it!</h2>
              <p className="text-ink-500 mb-7 max-w-sm mx-auto">
                That's the right answer. You've understood the method — great progress.
              </p>
              <button
                onClick={onFinish}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-ink-900 text-white font-medium rounded-xl hover:bg-ink-800 transition-all"
              >
                Continue
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {state === 'incorrect' && (
            <div className="py-2 animate-scaleIn">
              <div className="flex items-center gap-2 mb-4">
                <div className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-red-100">
                  <XCircle className="w-4 h-4 text-red-600" strokeWidth={2.2} />
                </div>
                <span className="text-xs font-medium text-ink-400 uppercase tracking-wider">
                  Not quite — here's the method
                </span>
              </div>

              <p className="text-ink-700 leading-relaxed text-base mb-4">
                {followUp.correctMethod}
              </p>

              <div className="flex items-center gap-2 p-4 rounded-xl bg-emerald-50 border border-emerald-100 mb-6">
                <span className="text-sm text-emerald-700 font-medium">Answer:</span>
                <span className="text-lg font-bold text-emerald-700">{followUp.displayAnswer}</span>
              </div>

              <button
                onClick={onFinish}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-ink-900 text-white font-medium rounded-xl hover:bg-ink-800 transition-all"
              >
                Continue
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
