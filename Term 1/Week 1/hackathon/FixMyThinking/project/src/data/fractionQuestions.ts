import type { Question } from '../types';

export const FRACTION_QUESTIONS: Question[] = [
  {
    id: 'frac-1',
    prompt: 'Calculate:  2/3 + 1/4',
    answer: 11 / 12,
    displayAnswer: '11/12',
    correctMethod:
      'Find a common denominator — the LCM of 3 and 4 is 12.  Convert: 2/3 = 8/12 and 1/4 = 3/12.  Add: 8/12 + 3/12 = 11/12.',
    misconceptions: [
      {
        keywords: ['3/7', '3/12', 'just added', 'added top', 'added bottom', 'numerator and denominator', '2+1', '3+4', 'top and bottom'],
        explanation:
          'You added the numerators and denominators separately (2+1 over 3+4). This is a very common mistake — you cannot add fractions by adding both the top and bottom. You must first find a common denominator, then add only the numerators.',
      },
      {
        keywords: ['8/12', 'just 8', 'is 8/12', '2/3 = 8/12', 'only converted', 'forgot to add', 'stopped'],
        explanation:
          'You correctly converted 2/3 to 8/12, but it looks like you didn\'t add the second fraction. Convert 1/4 to 3/12 as well, then add: 8/12 + 3/12 = 11/12.',
      },
      {
        keywords: ['6/12', '1/2', 'half', 'simplified wrong', '0.5', 'simplified', 'reduced'],
        explanation:
          'You may have found a common denominator but added incorrectly, or simplified too early. The correct sum is 8/12 + 3/12 = 11/12, which cannot be simplified further.',
      },
    ],
    followUp: {
      id: 'frac-1f',
      prompt: 'Calculate:  1/2 + 1/5',
      answer: 7 / 10,
      displayAnswer: '7/10',
      correctMethod:
        'Common denominator is 10.  Convert: 1/2 = 5/10 and 1/5 = 2/10.  Add: 5/10 + 2/10 = 7/10.',
      misconceptions: [
        {
          keywords: ['2/7', '2/10', '1+1', '2+5', 'top and bottom', 'numerator and denominator'],
          explanation: 'Don\'t add both top and bottom. Find a common denominator (10), then add only the numerators.',
        },
      ],
    },
  },
  {
    id: 'frac-2',
    prompt: 'Calculate:  3/5 × 2/7',
    answer: 6 / 35,
    displayAnswer: '6/35',
    correctMethod:
      'When multiplying fractions, multiply the numerators and multiply the denominators.  Numerators: 3 × 2 = 6.  Denominators: 5 × 7 = 35.  Answer: 6/35.',
    misconceptions: [
      {
        keywords: ['common denominator', '35', 'same bottom', 'find common', 'denominator first', 'cross multiply', 'butterfly'],
        explanation:
          'You seem to have used a common-denominator approach, which is for adding fractions — not multiplying. When multiplying, you simply multiply the tops and multiply the bottoms directly: 3×2 = 6 on top, 5×7 = 35 on the bottom.',
      },
      {
        keywords: ['21/10', 'flipped', 'inverted', 'reciprocal', 'divided', 'cross', '3×7', '5×2', 'cross multiply'],
        explanation:
          'You cross-multiplied (3×7 and 5×2), which is a technique for comparing fractions or dividing them — not for multiplying. To multiply fractions, multiply straight across: (3×2)/(5×7) = 6/35.',
      },
      {
        keywords: ['5/12', 'add', 'plus', '+', 'added', '3+2', '5+7'],
        explanation:
          'You added the fractions instead of multiplying. For multiplication, multiply the numerators (3×2=6) and denominators (5×7=35) separately — no common denominator needed.',
      },
    ],
    followUp: {
      id: 'frac-2f',
      prompt: 'Calculate:  2/3 × 4/5',
      answer: 8 / 15,
      displayAnswer: '8/15',
      correctMethod:
        'Multiply numerators: 2 × 4 = 8.  Multiply denominators: 3 × 5 = 15.  Answer: 8/15.',
      misconceptions: [
        {
          keywords: ['common denominator', '15', 'same bottom'],
          explanation: 'No common denominator needed for multiplication. Just multiply across: (2×4)/(3×5) = 8/15.',
        },
        {
          keywords: ['cross', 'reciprocal', 'flip', 'invert', '2×5', '3×4'],
          explanation: 'Don\'t cross-multiply. Multiply straight across: 2×4 on top, 3×5 on bottom.',
        },
      ],
    },
  },
  {
    id: 'frac-3',
    prompt: 'Calculate:  5/6 − 1/3',
    answer: 1 / 2,
    displayAnswer: '1/2',
    correctMethod:
      'Find a common denominator — the LCM of 6 and 3 is 6.  Convert 1/3 to 2/6.  Subtract: 5/6 − 2/6 = 3/6.  Simplify: 3/6 = 1/2.',
    misconceptions: [
      {
        keywords: ['4/3', 'subtracted top', 'subtracted bottom', '5−1', '6−3', 'top and bottom', 'numerator and denominator', '4/3'],
        explanation:
          'You subtracted the numerators and denominators separately (5−1 over 6−3). Just like with addition, you cannot subtract fractions by subtracting both top and bottom. Find a common denominator first, then subtract only the numerators.',
      },
      {
        keywords: ['4/6', 'didn\'t simplify', 'forgot to simplify', 'no simplify', 'unsimplified', '3/6', 'not simplified'],
        explanation:
          'You found 4/6 or 3/6, which is close but needs simplifying. Convert 1/3 to 2/6, then 5/6 − 2/6 = 3/6. Simplify 3/6 to 1/2 by dividing top and bottom by 3.',
      },
      {
        keywords: ['5/3', 'just 5/3', 'is 5/3', 'answer 5/3', 'improper', 'didn\'t convert', 'no convert', '5-1/3', '5/3'],
        explanation:
          'You subtracted the whole numbers but didn\'t convert to a common denominator. Convert 1/3 to 2/6, then subtract: 5/6 − 2/6 = 3/6 = 1/2.',
      },
    ],
    followUp: {
      id: 'frac-3f',
      prompt: 'Calculate:  7/8 − 1/4',
      answer: 5 / 8,
      displayAnswer: '5/8',
      correctMethod:
        'Common denominator is 8.  Convert 1/4 to 2/8.  Subtract: 7/8 − 2/8 = 5/8.',
      misconceptions: [
        {
          keywords: ['6/4', 'top and bottom', '7−1', '8−4'],
          explanation: 'Don\'t subtract both top and bottom. Convert 1/4 to 2/8, then subtract only the numerators.',
        },
      ],
    },
  },
  {
    id: 'frac-4',
    prompt: 'Calculate:  3/4 ÷ 1/6',
    answer: 18 / 4,
    displayAnswer: '9/2 (or 4½)',
    correctMethod:
      'Dividing by a fraction is the same as multiplying by its reciprocal.  Flip 1/6 to get 6/1.  Multiply: 3/4 × 6/1 = 18/4.  Simplify: 18/4 = 9/2 (or 4½).',
    misconceptions: [
      {
        keywords: ['3/24', '1/8', 'multiply straight', 'multiplied', '3×1', '4×6', 'across', 'just multiplied', 'multiplied both', 'times both'],
        explanation:
          'You multiplied straight across (3×1 on top, 4×6 on bottom) as if it were a multiplication problem. But this is a division problem. To divide fractions, flip the second fraction and then multiply: 3/4 × 6/1 = 18/4 = 9/2.',
      },
      {
        keywords: ['4/3', 'flip first', 'flipped first', 'inverted first', 'reciprocal of first', 'flipped wrong', 'wrong fraction'],
        explanation:
          'You flipped the wrong fraction. When dividing, you flip the second fraction (the divisor), not the first. Keep 3/4 as is, flip 1/6 to 6/1, then multiply: 3/4 × 6/1 = 18/4 = 9/2.',
      },
      {
        keywords: ['3/10', '0.3', 'divide top', 'divide bottom', '3÷1', '4÷6', 'divide across', 'divided both'],
        explanation:
          'You divided the numerators and denominators separately. Division of fractions doesn\'t work that way. Instead, flip the second fraction and multiply: 3/4 × 6/1 = 18/4 = 9/2.',
      },
    ],
    followUp: {
      id: 'frac-4f',
      prompt: 'Calculate:  2/5 ÷ 1/3',
      answer: 6 / 5,
      displayAnswer: '6/5 (or 1⅕)',
      correctMethod:
        'Flip 1/3 to get 3/1.  Multiply: 2/5 × 3/1 = 6/5 (or 1⅕).',
      misconceptions: [
        {
          keywords: ['2/15', 'multiply straight', 'across'],
          explanation: 'Don\'t multiply straight across — this is division. Flip the second fraction, then multiply.',
        },
        {
          keywords: ['5/2', 'flip first', 'flipped first', 'wrong fraction', 'inverted first'],
          explanation: 'You flipped the wrong fraction. Flip the second one (1/3 → 3/1), not the first.',
        },
      ],
    },
  },
  {
    id: 'frac-5',
    prompt: 'Simplify:  8/12',
    answer: 2 / 3,
    displayAnswer: '2/3',
    correctMethod:
      'Find the highest common factor (HCF) of 8 and 12, which is 4.  Divide both numerator and denominator by 4:  8 ÷ 4 = 2, 12 ÷ 4 = 3.  Answer: 2/3.',
    misconceptions: [
      {
        keywords: ['4/6', 'only divided by 2', 'divided by 2', 'half', 'not fully', 'not fully simplified', 'still can', 'can still'],
        explanation:
          'You divided by 2 to get 4/6, but this isn\'t fully simplified — 4 and 6 still share a common factor of 2. Keep going: divide 4 and 6 by 2 to get 2/3. Or divide 8 and 12 by their HCF (4) in one step.',
      },
      {
        keywords: ['2/4', 'subtracted', 'difference', 'gap', 'minus', '8-12', '12-8', 'top minus bottom'],
        explanation:
          'You seem to have subtracted or found the difference between the numbers. To simplify a fraction, divide both the top and bottom by their highest common factor. The HCF of 8 and 12 is 4, giving 2/3.',
      },
      {
        keywords: ['1.5', 'decimal', '0.67', '0.66', 'converted', 'as decimal', 'to decimal'],
        explanation:
          'You converted to a decimal instead of simplifying the fraction. Simplifying means finding an equivalent fraction with smaller numbers. Divide 8 and 12 by 4 to get 2/3.',
      },
    ],
    followUp: {
      id: 'frac-5f',
      prompt: 'Simplify:  6/9',
      answer: 2 / 3,
      displayAnswer: '2/3',
      correctMethod:
        'The HCF of 6 and 9 is 3.  Divide both by 3:  6 ÷ 3 = 2, 9 ÷ 3 = 3.  Answer: 2/3.',
      misconceptions: [
        {
          keywords: ['3/4.5', 'divided by 2', 'not fully', 'still can'],
          explanation: 'If you divided by 2 you\'d get 3/4.5 — that\'s not right. The HCF of 6 and 9 is 3, giving 2/3.',
        },
      ],
    },
  },
];
