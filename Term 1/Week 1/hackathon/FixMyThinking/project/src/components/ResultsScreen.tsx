import type { Topic } from '@/types';
import { TOPIC_MAP } from '@/data/topics';
import { Percent, Divide, ListOrdered, CheckCircle2, Lightbulb, ArrowLeft, RotateCcw } from 'lucide-react';

export interface QuizResults {
  totalAnswered: number;
  correctAnswers: number;
  mistakesExplained: number;
}

interface ResultsScreenProps {
  topic: Topic;
  results: QuizResults;
  onRetry: () => void;
  onBackToTopics: () => void;
}

const TOPIC_ICONS: Record<string, React.ElementType> = {
  Percent,
  Divide,
  ListOrdered,
};

export function ResultsScreen({
  topic,
  results,
  onRetry,
  onBackToTopics,
}: ResultsScreenProps) {
  const { totalAnswered, correctAnswers, mistakesExplained } = results;
  const accuracy = totalAnswered > 0 ? Math.round((correctAnswers / totalAnswered) * 100) : 0;

  const stats = [
    {
      label: 'Questions answered',
      value: totalAnswered,
      icon: CheckCircle2,
      color: 'text-sky-600',
      bg: 'bg-sky-100',
    },
    {
      label: 'Correct answers',
      value: correctAnswers,
      icon: CheckCircle2,
      color: 'text-emerald-600',
      bg: 'bg-emerald-100',
    },
    {
      label: 'Mistakes explained',
      value: mistakesExplained,
      icon: Lightbulb,
      color: 'text-amber-600',
      bg: 'bg-amber-100',
    },
  ];

  return (
    <div className="min-h-screen bg-ink-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md animate-scaleIn">
        <div className="text-center mb-8">
          <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${topic.gradient} mb-5 shadow-sm`}>
            {(() => {
              const Icon = TOPIC_ICONS[topic.icon] ?? CheckCircle2;
              return <Icon className="w-7 h-7 text-white" strokeWidth={2.2} />;
            })()}
          </div>
          <h1 className="text-2xl font-bold text-ink-900 tracking-tight">
            {topic.title} — complete
          </h1>
          <p className="text-ink-500 mt-2">
            You answered {accuracy}% correctly. {accuracy >= 70 ? 'Well done!' : 'Keep practising — you\'re getting there.'}
          </p>
        </div>

        {/* Accuracy ring */}
        <div className="flex items-center justify-center mb-8">
          <div className="relative w-32 h-32">
            <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="52" fill="none" stroke="#e2e8f0" strokeWidth="8" />
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="url(#grad)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 52}`}
                strokeDashoffset={`${2 * Math.PI * 52 * (1 - accuracy / 100)}`}
                className="transition-all duration-1000 ease-out"
              />
              <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#0d9488" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-bold text-ink-900 tabular-nums">{accuracy}%</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="space-y-3 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="flex items-center gap-4 bg-white rounded-xl border border-ink-200 p-4"
              >
                <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${stat.bg}`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} strokeWidth={2.2} />
                </div>
                <span className="flex-1 text-sm font-medium text-ink-600">{stat.label}</span>
                <span className="text-2xl font-bold text-ink-900 tabular-nums">{stat.value}</span>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onRetry}
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-ink-900 text-white font-medium rounded-xl hover:bg-ink-800 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            Try again
          </button>
          <button
            onClick={onBackToTopics}
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 text-ink-600 font-medium rounded-xl hover:bg-ink-100 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Change topic
          </button>
        </div>
      </div>
    </div>
  );
}
