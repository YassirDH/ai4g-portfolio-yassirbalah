import type { Topic } from '@/types';
import { TOPICS } from '@/data/topics';
import { CheckCircle2, Percent, Divide, ListOrdered, ArrowRight } from 'lucide-react';

interface TopicSelectionProps {
  onSelect: (topicId: Topic['id']) => void;
}

const ICONS: Record<string, React.ElementType> = {
  Percent,
  Divide,
  ListOrdered,
};

export function TopicSelection({ onSelect }: TopicSelectionProps) {
  return (
    <div className="min-h-screen bg-ink-50 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl animate-scaleIn">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-ink-900 mb-5">
            <CheckCircle2 className="w-7 h-7 text-white" strokeWidth={2.2} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-ink-900 tracking-tight">
            Learn From Mistakes
          </h1>
          <p className="text-ink-500 mt-3 text-base sm:text-lg max-w-md mx-auto">
            Choose a topic to practise. Get the right answer, or learn why the wrong one makes sense.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {TOPICS.map((topic) => {
            const Icon = ICONS[topic.icon];
            return (
              <button
                key={topic.id}
                onClick={() => onSelect(topic.id)}
                className="group relative text-left bg-white rounded-2xl p-6 border border-ink-200 hover:border-ink-300 hover:shadow-lg hover:shadow-ink-900/5 transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-ink-900 focus:ring-offset-2"
              >
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${topic.gradient} mb-4 shadow-sm`}
                >
                  {Icon && <Icon className="w-6 h-6 text-white" strokeWidth={2.2} />}
                </div>
                <h3 className="font-semibold text-ink-900 text-lg">{topic.title}</h3>
                <p className="text-sm text-ink-500 mt-1.5 leading-relaxed">
                  {topic.description}
                </p>
                <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-ink-700 group-hover:text-ink-900 transition-colors">
                  Start practising
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
