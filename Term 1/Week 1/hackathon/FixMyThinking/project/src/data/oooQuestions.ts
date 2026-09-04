import type { Question } from '../types';

export const ORDER_OF_OPERATIONS_QUESTIONS: Question[] = [
  {
    id: 'oop-1',
    prompt: 'Calculate:  3 + 4 × 5',
    answer: 23,
    displayAnswer: '23',
    correctMethod:
      'Following BODMAS, multiplication comes before addition.  First: 4 × 5 = 20.  Then: 3 + 20 = 23.',
    misconceptions: [
      {
        keywords: ['35', 'left to right', 'left-to-right', 'in order', '3+4 first', '3+4=7', 'then ×5', '7×5', '7 times 5', 'then times', 'then multiply', 'went left'],
        explanation:
          'You worked from left to right, doing 3 + 4 = 7 first, then 7 × 5 = 35. But BODMAS says multiplication must be done before addition, regardless of order. So 4 × 5 = 20 first, then 3 + 20 = 23.',
      },
      {
        keywords: ['60', '3×4', '3 times 4', 'multiplied first', '3×4=12', '12×5', '12 times 5', 'multiplied all', 'all together'],
        explanation:
          'You multiplied 3 × 4 first (getting 12), then × 5 = 60. But the expression is "3 + (4 × 5)", not "(3 + 4) × 5" or "(3 × 4) × 5". Multiplication comes before addition, so it\'s 4 × 5 = 20, then 3 + 20 = 23.',
      },
      {
        keywords: ['15', 'just 4×5', 'only multiplied', '4 times 5', 'forgot the 3', 'forgot to add', 'didn\'t add'],
        explanation:
          'You correctly multiplied 4 × 5 = 15... wait, 4 × 5 = 20, not 15. Then add the 3: 3 + 20 = 23. Make sure you\'re multiplying correctly and not forgetting to add the 3 at the end.',
      },
    ],
    followUp: {
      id: 'oop-1f',
      prompt: 'Calculate:  2 + 6 × 3',
      answer: 20,
      displayAnswer: '20',
      correctMethod:
        'Multiplication first: 6 × 3 = 18.  Then add: 2 + 18 = 20.',
      misconceptions: [
        {
          keywords: ['24', 'left to right', '2+6 first', '8×3'],
          explanation: 'Don\'t go left to right. Multiplication first: 6 × 3 = 18, then 2 + 18 = 20.',
        },
      ],
    },
  },
  {
    id: 'oop-2',
    prompt: 'Calculate:  (2 + 3)² − 6',
    answer: 19,
    displayAnswer: '19',
    correctMethod:
      'Brackets first: 2 + 3 = 5.  Then the power (Orders): 5² = 25.  Finally subtract: 25 − 6 = 19.',
    misconceptions: [
      {
        keywords: ['1', '2²', 'squared first', '2 squared', '4+3', 'then squared', 'power first', '4+9', '13', '4+9-6'],
        explanation:
          'You squared the 2 first (2² = 4) and then added 3, or squared each term separately. But brackets come before powers in BODMAS. Do the bracket first: 2 + 3 = 5, then square: 5² = 25, then subtract 6 = 19.',
      },
      {
        keywords: ['7', '5-6', '25+6', 'forgot square', 'didn\'t square', 'no square', 'skip square', '2+3=5', '5-6', 'subtract before'],
        explanation:
          'You either subtracted before squaring, or forgot to square the bracket result. BODMAS order: brackets first (2+3=5), then orders/squares (5²=25), then subtraction (25−6=19).',
      },
      {
        keywords: ['31', '25+6', 'added 6', 'plus 6', 'wrong sign', 'added instead'],
        explanation:
          'You added 6 instead of subtracting. After the brackets (2+3=5) and the square (5²=25), you need to subtract: 25 − 6 = 19, not add.',
      },
    ],
    followUp: {
      id: 'oop-2f',
      prompt: 'Calculate:  (4 − 1)² + 3',
      answer: 12,
      displayAnswer: '12',
      correctMethod:
        'Brackets first: 4 − 1 = 3.  Then square: 3² = 9.  Then add: 9 + 3 = 12.',
      misconceptions: [
        {
          keywords: ['14', '4²', 'squared first', '16−1', '16', 'power first'],
          explanation: 'Do the bracket first: 4 − 1 = 3, then square: 3² = 9, then add 3 = 12.',
        },
      ],
    },
  },
  {
    id: 'oop-3',
    prompt: 'Calculate:  12 ÷ 2 × 3',
    answer: 18,
    displayAnswer: '18',
    correctMethod:
      'Division and multiplication have equal priority, so work left to right.  First: 12 ÷ 2 = 6.  Then: 6 × 3 = 18.',
    misconceptions: [
      {
        keywords: ['2', '2×3 first', 'multiplied first', '2 times 3', '6 first', 'then 12÷6', '12/6', 'divide 12 by 6', 'right first', 'from right'],
        explanation:
          'You multiplied 2 × 3 = 6 first, then did 12 ÷ 6 = 2. But division and multiplication have equal priority — you must work left to right. So 12 ÷ 2 = 6 first, then 6 × 3 = 18.',
      },
      {
        keywords: ['36', '12×3', '12 times 3', 'then ÷2', 'multiply first', '12×2×3', 'all multiplied', 'multiplied all', 'times everything'],
        explanation:
          'You multiplied 12 × 3 = 36 (or all three numbers together). But you must follow the order left to right for equal-priority operations. 12 ÷ 2 = 6 first, then 6 × 3 = 18.',
      },
      {
        keywords: ['6', 'just divided', 'only divided', '12÷2', 'forgot to multiply', 'didn\'t multiply', 'stopped'],
        explanation:
          'You did 12 ÷ 2 = 6 but stopped there. The expression has more to calculate — you also need to multiply by 3: 6 × 3 = 18.',
      },
    ],
    followUp: {
      id: 'oop-3f',
      prompt: 'Calculate:  20 ÷ 4 × 2',
      answer: 10,
      displayAnswer: '10',
      correctMethod:
        'Division and multiplication are equal priority — go left to right.  First: 20 ÷ 4 = 5.  Then: 5 × 2 = 10.',
      misconceptions: [
        {
          keywords: ['2.5', '2×4 first', 'multiplied first', '8', 'then 20÷8', '20/8'],
          explanation: 'Don\'t multiply first. Division and multiplication are equal — go left to right: 20 ÷ 4 = 5, then 5 × 2 = 10.',
        },
      ],
    },
  },
  {
    id: 'oop-4',
    prompt: 'Calculate:  8 + 2 × (4 − 1)',
    answer: 14,
    displayAnswer: '14',
    correctMethod:
      'Brackets first: 4 − 1 = 3.  Then multiplication: 2 × 3 = 6.  Finally addition: 8 + 6 = 14.',
    misconceptions: [
      {
        keywords: ['30', 'left to right', '8+2 first', '10×3', '10 times 3', 'in order'],
        explanation:
          'You went left to right: 8 + 2 = 10, then 10 × 3 = 30. But brackets must be done first, then multiplication, then addition. So: (4−1)=3, then 2×3=6, then 8+6=14.',
      },
      {
        keywords: ['18', '8×2', '8 times 2', 'multiplied 8', '16+2', '16', 'multiply first', '8+2×3', 'wrong multiply'],
        explanation:
          'You multiplied 8 × 2 instead of 2 × (the bracket result). After the bracket gives 3, it\'s 2 × 3 = 6 (not 8 × 2). Then 8 + 6 = 14.',
      },
      {
        keywords: ['10', 'just 8+2', 'forgot bracket', 'didn\'t do bracket', 'ignore bracket', 'skip bracket', 'no bracket'],
        explanation:
          'You seem to have ignored the bracket or only done 8 + 2. The bracket (4−1) must be calculated first, giving 3. Then 2 × 3 = 6, then 8 + 6 = 14.',
      },
    ],
    followUp: {
      id: 'oop-4f',
      prompt: 'Calculate:  5 + 3 × (6 − 4)',
      answer: 11,
      displayAnswer: '11',
      correctMethod:
        'Brackets first: 6 − 4 = 2.  Then multiply: 3 × 2 = 6.  Then add: 5 + 6 = 11.',
      misconceptions: [
        {
          keywords: ['28', 'left to right', '5+3 first', '8×2'],
          explanation: 'Brackets first: 6−4=2. Then 3×2=6. Then 5+6=11. Don\'t go left to right.',
        },
      ],
    },
  },
  {
    id: 'oop-5',
    prompt: 'Calculate:  6 + 4² ÷ 2',
    answer: 14,
    displayAnswer: '14',
    correctMethod:
      'Orders (powers) first: 4² = 16.  Then division: 16 ÷ 2 = 8.  Finally addition: 6 + 8 = 14.',
    misconceptions: [
      {
        keywords: ['50', '6+4 first', '10²', '10 squared', 'squared the sum', '100÷2', 'left to right'],
        explanation:
          'You did 6 + 4 = 10 first, then squared it (100), then divided by 2 = 50. But powers come before addition in BODMAS. So 4² = 16 first, then 16 ÷ 2 = 8, then 6 + 8 = 14.',
      },
      {
        keywords: ['20', '6+4² first', '6+16', 'then ÷2', '22÷2', 'added before dividing', 'added then divided', '22', 'add first'],
        explanation:
          'You added 6 + 16 = 22 before dividing, then 22 ÷ 2 = 11... or you got 20 another way. Division comes before addition in BODMAS. After squaring (4²=16), divide: 16 ÷ 2 = 8, then add: 6 + 8 = 14.',
      },
      {
        keywords: ['8', 'just 4²÷2', 'only the power', 'forgot to add', 'didn\'t add 6', '16÷2', 'forgot 6'],
        explanation:
          'You correctly did 4² = 16 and 16 ÷ 2 = 8, but forgot to add the 6 at the start. The full calculation is: 4² = 16, 16 ÷ 2 = 8, then 6 + 8 = 14.',
      },
    ],
    followUp: {
      id: 'oop-5f',
      prompt: 'Calculate:  2 + 3² ÷ 3',
      answer: 5,
      displayAnswer: '5',
      correctMethod:
        'Orders first: 3² = 9.  Then division: 9 ÷ 3 = 3.  Then addition: 2 + 3 = 5.',
      misconceptions: [
        {
          keywords: ['5²', 'squared the sum', '25', '2+3 first', 'left to right'],
          explanation: 'Powers before addition: 3² = 9, then 9 ÷ 3 = 3, then 2 + 3 = 5.',
        },
        {
          keywords: ['3', 'just 3²÷3', 'forgot to add', 'didn\'t add 2', '9÷3'],
          explanation: 'You did 3² = 9 and 9 ÷ 3 = 3 but forgot the 2. Add it: 2 + 3 = 5.',
        },
      ],
    },
  },
];
