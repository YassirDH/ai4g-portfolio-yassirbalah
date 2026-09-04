import type { Question } from '../types';

export const PERCENTAGE_QUESTIONS: Question[] = [
  {
    id: 'pct-1',
    prompt: 'A jacket costs £80. It is reduced by 15% in a sale. What is the sale price?',
    answer: 68,
    displayAnswer: '£68',
    correctMethod:
      'First find 15% of £80:  0.15 × 80 = 12.  Then subtract the discount from the original price:  80 − 12 = £68.',
    misconceptions: [
      {
        keywords: ['add', 'plus', '+', 'increase', 'more', 'raised'],
        explanation:
          'It looks like you added the percentage instead of subtracting it. A 15% reduction means the price goes down, so you need to subtract 15% of the original price, not add it.',
      },
      {
        keywords: ['15', 'just 15', 'only 15', '= 15', 'answer is 15', 'was 15'],
        explanation:
          'You found 15% of £80 (which is £12) and treated that as the final price. But £12 is the discount amount — the sale price is the original price minus the discount.',
      },
      {
        keywords: ['95', '0.95', '95%', 'from 100', '100 minus', 'remaining 85'],
        explanation:
          'You may have used the wrong percentage. A 15% discount leaves 85% of the price, not 95%. So multiply £80 by 0.85 (or subtract 15%), giving £68.',
      },
      {
        keywords: ['divide', '/', 'half', 'split', 'per'],
        explanation:
          'It looks like a division was used where a percentage calculation was needed. To find 15% of £80, multiply 80 by 0.15 (giving £12), then subtract: 80 − 12 = £68.',
      },
    ],
    followUp: {
      id: 'pct-1f',
      prompt: 'A TV costs £200. It is reduced by 20% in a sale. What is the sale price?',
      answer: 160,
      displayAnswer: '£160',
      correctMethod:
        'Find 20% of £200:  0.20 × 200 = 40.  Subtract the discount:  200 − 40 = £160.',
      misconceptions: [
        {
          keywords: ['add', 'plus', '+', 'increase'],
          explanation: 'A reduction means subtract the discount, not add it.',
        },
        {
          keywords: ['40', 'just 40', 'is 40', 'answer 40', 'was 40'],
          explanation: '£40 is the discount amount, not the sale price. Subtract it from £200.',
        },
      ],
    },
  },
  {
    id: 'pct-2',
    prompt: 'A salary of £24,000 is increased by 5%. What is the new salary?',
    answer: 25200,
    displayAnswer: '£25,200',
    correctMethod:
      'Find 5% of £24,000:  0.05 × 24,000 = 1,200.  Add it to the original:  24,000 + 1,200 = £25,200.',
    misconceptions: [
      {
        keywords: ['subtract', 'minus', '-', 'take away', 'less', 'lower', 'reduce'],
        explanation:
          'You treated the increase as a decrease. A 5% increase means you add 5% of the salary on top, not take it away.',
      },
      {
        keywords: ['1200', '1,200', 'just 1200', 'is 1200', 'answer 1200'],
        explanation:
          '£1,200 is the amount of the increase, not the new salary. Add it to the original £24,000 to get £25,200.',
      },
      {
        keywords: ['5', 'just 5', 'is 5', 'answer 5', 'was 5', 'multiplied by 5', 'times 5', '×5', 'x5', '*5'],
        explanation:
          'It looks like you multiplied by 5 instead of finding 5%. A 5% increase means multiply by 0.05 to find the increase, then add it on — not multiply the whole salary by 5.',
      },
      {
        keywords: ['0.95', '95%', '95', 'decreased', 'down'],
        explanation:
          'You applied a decrease (multiplying by 0.95) instead of an increase. A 5% increase means multiply by 1.05, or add 5% of the original.',
      },
    ],
    followUp: {
      id: 'pct-2f',
      prompt: 'A water bill of £160 is increased by 10%. What is the new bill?',
      answer: 176,
      displayAnswer: '£176',
      correctMethod:
        'Find 10% of £160:  0.10 × 160 = 16.  Add it on:  160 + 16 = £176.',
      misconceptions: [
        {
          keywords: ['subtract', 'minus', '-'],
          explanation: 'An increase means add the extra, not subtract it.',
        },
        {
          keywords: ['16', 'just 16', 'is 16', 'answer 16'],
          explanation: '£16 is the increase amount. Add it to £160 for the new total.',
        },
      ],
    },
  },
  {
    id: 'pct-3',
    prompt: 'What is 12% of 250?',
    answer: 30,
    displayAnswer: '30',
    correctMethod:
      'Convert 12% to a decimal:  0.12.  Multiply:  0.12 × 250 = 30.',
    misconceptions: [
      {
        keywords: ['12', 'just 12', 'is 12', 'answer 12', 'was 12', 'wrote 12', 'put 12'],
        explanation:
          'You wrote 12 as the answer, but "12% of 250" is not just 12. You need to convert the percentage to a decimal (0.12) and multiply by 250.',
      },
      {
        keywords: ['250', 'just 250', 'same', 'is 250', 'answer 250'],
        explanation:
          'You returned the original number (250) without doing the percentage calculation. To find 12% of 250, multiply 250 by 0.12, which gives 30.',
      },
      {
        keywords: ['add', 'plus', '+', '250+12', '250 + 12', '262'],
        explanation:
          'You added the percentage number to the original value. "Percent of" means multiply, not add. 0.12 × 250 = 30.',
      },
      {
        keywords: ['divide', '/', 'split', 'per', '250/12', 'divided by 12', 'over 12'],
        explanation:
          'You divided instead of multiplying. "12% of 250" means 0.12 × 250, not 250 ÷ 12. The answer is 30.',
      },
    ],
    followUp: {
      id: 'pct-3f',
      prompt: 'What is 15% of 180?',
      answer: 27,
      displayAnswer: '27',
      correctMethod:
        'Convert 15% to 0.15. Multiply:  0.15 × 180 = 27.',
      misconceptions: [
        {
          keywords: ['15', 'just 15', 'is 15', 'answer 15'],
          explanation: 'Don\'t just write the percentage number. Convert to a decimal and multiply.',
        },
        {
          keywords: ['add', 'plus', '+', '195'],
          explanation: '"Percent of" means multiply, not add. 0.15 × 180 = 27.',
        },
      ],
    },
  },
  {
    id: 'pct-4',
    prompt: 'A shirt costs £40 after a 20% discount. What was the original price?',
    answer: 50,
    displayAnswer: '£50',
    correctMethod:
      'After a 20% discount, the sale price is 80% of the original. So £40 = 0.80 × original.  Divide:  40 ÷ 0.80 = £50.',
    misconceptions: [
      {
        keywords: ['add', 'plus', '+', '40+20', '40 + 20', '60', 'add 20'],
        explanation:
          'You added 20% of the sale price (£8) back on. But the discount was 20% of the original price, not 20% of £40. Instead, recognise that £40 represents 80% of the original, so divide by 0.80.',
      },
      {
        keywords: ['48', '32', 'multiply', 'times 0.8', '×0.8', 'x0.8', '*0.8', '0.8 × 40'],
        explanation:
          'You multiplied £40 by 0.80 (or 1.20), but that applies the discount to the wrong base. The £40 is already the discounted price. You need to divide by 0.80 to reverse the discount: 40 ÷ 0.80 = £50.',
      },
      {
        keywords: ['20', 'just 20', 'is 20', 'answer 20', 'was 20'],
        explanation:
          '20 is the discount percentage, not the original price. The sale price £40 is 80% of the original, so divide 40 by 0.80 to get £50.',
      },
    ],
    followUp: {
      id: 'pct-4f',
      prompt: 'A book costs £30 after a 25% discount. What was the original price?',
      answer: 40,
      displayAnswer: '£40',
      correctMethod:
        'After a 25% discount, the sale price is 75% of the original. So £30 = 0.75 × original.  Divide:  30 ÷ 0.75 = £40.',
      misconceptions: [
        {
          keywords: ['add', 'plus', '+', '37.5', '37', 'add 25'],
          explanation: 'Don\'t add 25% of £30 back on. £30 is 75% of the original, so divide by 0.75.',
        },
        {
          keywords: ['22.5', 'multiply', 'times 0.75'],
          explanation: 'Don\'t multiply by 0.75 — divide by it. £30 is already the discounted price.',
        },
      ],
    },
  },
  {
    id: 'pct-5',
    prompt: 'In a class of 25 students, 40% are boys. How many girls are in the class?',
    answer: 15,
    displayAnswer: '15',
    correctMethod:
      'If 40% are boys, then 60% are girls.  Find 60% of 25:  0.60 × 25 = 15.  (Or: 40% of 25 = 10 boys, so 25 − 10 = 15 girls.)',
    misconceptions: [
      {
        keywords: ['10', 'just 10', 'is 10', 'answer 10', 'was 10', 'boys'],
        explanation:
          'You found the number of boys (10) but the question asks for the number of girls. If 40% are boys, then 60% are girls — so find 60% of 25, or subtract the 10 boys from 25.',
      },
      {
        keywords: ['40', 'just 40', 'is 40', 'answer 40', 'was 40'],
        explanation:
          'You used the percentage (40%) as the answer. You need to find how many students that percentage represents. 40% of 25 = 10 boys, so 25 − 10 = 15 girls.',
      },
      {
        keywords: ['65', '60', 'just 60', 'is 60', 'answer 60', 'percent'],
        explanation:
          'You gave the percentage of girls (60%) instead of the number of girls. Convert 60% to 0.60 and multiply by 25 to get 15.',
      },
    ],
    followUp: {
      id: 'pct-5f',
      prompt: 'In a school year group of 200 students, 55% are girls. How many boys are there?',
      answer: 90,
      displayAnswer: '90',
      correctMethod:
        'If 55% are girls, then 45% are boys.  Find 45% of 200:  0.45 × 200 = 90.  (Or: 55% of 200 = 110 girls, so 200 − 110 = 90 boys.)',
      misconceptions: [
        {
          keywords: ['110', 'just 110', 'is 110', 'answer 110', 'girls'],
          explanation: 'You found the number of girls, but the question asks for boys. Subtract from 200 or find 45% of 200.',
        },
        {
          keywords: ['55', 'just 55', 'is 55', 'answer 55'],
          explanation: 'You used the percentage instead of calculating the number. 45% of 200 = 90.',
        },
      ],
    },
  },
];
