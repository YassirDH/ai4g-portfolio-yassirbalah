import type { Misconception, Question, TopicId } from '@/types';
import { PERCENTAGE_QUESTIONS } from '@/data/percentageQuestions';
import { FRACTION_QUESTIONS } from '@/data/fractionQuestions';
import { ORDER_OF_OPERATIONS_QUESTIONS } from '@/data/oooQuestions';

const EPSILON = 0.001;

function parseNumber(input: string): number | null {
  const cleaned = input.trim().replace(/£|,/g, '');
  if (cleaned === '½') return 0.5;
  if (cleaned === '¼') return 0.25;
  if (cleaned === '¾') return 0.75;

  const fracMatch = cleaned.match(/^(\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)$/);
  if (fracMatch) {
    const num = parseFloat(fracMatch[1]);
    const den = parseFloat(fracMatch[2]);
    if (den !== 0) return num / den;
  }

  const mixedMatch = cleaned.match(/^(\d+)\s+(\d+)\s*\/\s*(\d+)$/);
  if (mixedMatch) {
    const whole = parseInt(mixedMatch[1], 10);
    const num = parseInt(mixedMatch[2], 10);
    const den = parseInt(mixedMatch[3], 10);
    if (den !== 0) return whole + num / den;
  }

  const val = parseFloat(cleaned);
  return isNaN(val) ? null : val;
}

export function checkAnswer(input: string, expected: number): boolean {
  const parsed = parseNumber(input);
  if (parsed === null) return false;
  return Math.abs(parsed - expected) < EPSILON;
}

export function findMisconception(
  reasoning: string,
  misconceptions: Misconception[],
  userAnswer: string
): string {
  const text = reasoning.toLowerCase().trim();

  for (const m of misconceptions) {
    if (m.keywords.some((kw) => text.includes(kw.toLowerCase()))) {
      return m.explanation;
    }
  }

  const userNum = parseNumber(userAnswer);
  if (userNum !== null) {
    for (const m of misconceptions) {
      for (const kw of m.keywords) {
        const kwNum = parseFloat(kw);
        if (!isNaN(kwNum) && Math.abs(kwNum - userNum) < EPSILON) {
          return m.explanation;
        }
      }
    }
  }

  return "I can't pinpoint the exact mistake from your explanation, but the key is to follow the correct method step by step. Take a look at the worked solution below and compare it with your approach to see where things diverged.";
}

export function getQuestionsForTopic(topicId: TopicId): Question[] {
  switch (topicId) {
    case 'percentages':
      return PERCENTAGE_QUESTIONS;
    case 'fractions':
      return FRACTION_QUESTIONS;
    case 'order-of-operations':
      return ORDER_OF_OPERATIONS_QUESTIONS;
    default:
      return [];
  }
}
