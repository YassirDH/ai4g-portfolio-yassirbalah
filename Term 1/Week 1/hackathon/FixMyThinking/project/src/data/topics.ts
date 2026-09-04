import type { Topic } from '../types';

export const TOPICS: Topic[] = [
  {
    id: 'percentages',
    title: 'Percentages',
    description: 'Calculating discounts, increases, and parts of a whole',
    icon: 'Percent',
    accent: 'text-emerald-600',
    gradient: 'from-emerald-500 to-teal-600',
  },
  {
    id: 'fractions',
    title: 'Fractions',
    description: 'Adding, subtracting, multiplying, and dividing',
    icon: 'Divide',
    accent: 'text-sky-600',
    gradient: 'from-sky-500 to-blue-600',
  },
  {
    id: 'order-of-operations',
    title: 'Order of Operations',
    description: 'Applying BODMAS to multi-step calculations',
    icon: 'ListOrdered',
    accent: 'text-amber-600',
    gradient: 'from-amber-500 to-orange-600',
  },
];

export const TOPIC_MAP = TOPICS.reduce(
  (acc, t) => ({ ...acc, [t.id]: t }),
  {} as Record<string, Topic>
);
