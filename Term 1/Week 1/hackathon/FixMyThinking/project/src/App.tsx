import { useState, useCallback } from 'react';
import type { TopicId, Question } from '@/types';
import { TOPIC_MAP } from '@/data/topics';
import { getQuestionsForTopic, checkAnswer, findMisconception } from '@/utils/answerCheck';
import { TopicSelection } from '@/components/TopicSelection';
import { QuestionCard, CorrectFeedback } from '@/components/QuestionCard';
import { ReasoningStep } from '@/components/ReasoningStep';
import { MisconceptionView } from '@/components/MisconceptionView';
import { FollowUpStep } from '@/components/FollowUpStep';
import { ResultsScreen, type QuizResults } from '@/components/ResultsScreen';

type Screen =
  | 'topics'
  | 'question'
  | 'correct'
  | 'reasoning'
  | 'misconception'
  | 'followup'
  | 'results';

interface QuizState {
  topicId: TopicId;
  questions: Question[];
  currentIndex: number;
  currentAnswer: string;
  misconceptionExplanation: string;
  results: QuizResults;
}

const INITIAL_RESULTS: QuizResults = {
  totalAnswered: 0,
  correctAnswers: 0,
  mistakesExplained: 0,
};

function App() {
  const [screen, setScreen] = useState<Screen>('topics');
  const [quiz, setQuiz] = useState<QuizState | null>(null);

  const startTopic = useCallback((topicId: TopicId) => {
    const questions = getQuestionsForTopic(topicId);
    setQuiz({
      topicId,
      questions,
      currentIndex: 0,
      currentAnswer: '',
      misconceptionExplanation: '',
      results: { ...INITIAL_RESULTS },
    });
    setScreen('question');
  }, []);

  const advanceAfterFollowUp = useCallback(() => {
    if (!quiz) return;
    const nextIndex = quiz.currentIndex + 1;
    if (nextIndex >= quiz.questions.length) {
      setScreen('results');
    } else {
      setQuiz({ ...quiz, currentIndex: nextIndex });
      setScreen('question');
    }
  }, [quiz]);

  const handleAnswer = useCallback(
    (correct: boolean, userAnswer: string) => {
      if (!quiz) return;
      const question = quiz.questions[quiz.currentIndex];
      const newResults = {
        ...quiz.results,
        totalAnswered: quiz.results.totalAnswered + 1,
      };

      if (correct) {
        setQuiz({
          ...quiz,
          currentAnswer: userAnswer,
          results: { ...newResults, correctAnswers: newResults.correctAnswers + 1 },
        });
        setScreen('correct');
      } else {
        setQuiz({
          ...quiz,
          currentAnswer: userAnswer,
          results: { ...newResults, mistakesExplained: newResults.mistakesExplained + 1 },
        });
        setScreen('reasoning');
      }
    },
    [quiz]
  );

  const handleReasoningSubmit = useCallback(
    (reasoning: string) => {
      if (!quiz) return;
      const question = quiz.questions[quiz.currentIndex];
      const explanation = findMisconception(
        reasoning,
        question.misconceptions,
        quiz.currentAnswer
      );
      setQuiz({ ...quiz, misconceptionExplanation: explanation });
      setScreen('misconception');
    },
    [quiz]
  );

  const handleReasoningSkip = useCallback(() => {
    if (!quiz) return;
    const question = quiz.questions[quiz.currentIndex];
    const explanation = findMisconception('', question.misconceptions, quiz.currentAnswer);
    setQuiz({ ...quiz, misconceptionExplanation: explanation });
    setScreen('misconception');
  }, [quiz]);

  const handleFollowUpResult = useCallback(
    (_correct: boolean) => {
      // Result is tracked via the FollowUpStep UI; no additional state needed here
    },
    []
  );

  const handleRetry = useCallback(() => {
    if (quiz) startTopic(quiz.topicId);
  }, [quiz, startTopic]);

  const handleBackToTopics = useCallback(() => {
    setQuiz(null);
    setScreen('topics');
  }, []);

  const hasProgress = quiz ? quiz.results.totalAnswered > 0 : false;

  const handleCorrectNext = useCallback(() => {
    if (!quiz) return;
    const nextIndex = quiz.currentIndex + 1;
    if (nextIndex >= quiz.questions.length) {
      setScreen('results');
    } else {
      setQuiz({ ...quiz, currentIndex: nextIndex });
      setScreen('question');
    }
  }, [quiz]);

  // --- Render ---

  if (screen === 'topics' || !quiz) {
    return <TopicSelection onSelect={startTopic} />;
  }

  const topic = TOPIC_MAP[quiz.topicId];
  const question = quiz.questions[quiz.currentIndex];

  switch (screen) {
    case 'question':
      return (
        <QuestionCard
          topic={topic}
          question={question}
          questionNumber={quiz.currentIndex + 1}
          totalQuestions={quiz.questions.length}
          hasProgress={hasProgress}
          onBackToTopics={handleBackToTopics}
          onAnswer={(correct, answer) => handleAnswer(correct, answer)}
        />
      );

    case 'correct':
      return <CorrectFeedback hasProgress={hasProgress} onBackToTopics={handleBackToTopics} onNext={handleCorrectNext} />;

    case 'reasoning':
      return (
        <ReasoningStep
          topic={topic}
          userAnswer={quiz.currentAnswer}
          hasProgress={hasProgress}
          onBackToTopics={handleBackToTopics}
          onSubmit={handleReasoningSubmit}
          onSkip={handleReasoningSkip}
        />
      );

    case 'misconception':
      return (
        <MisconceptionView
          topic={topic}
          question={question}
          userAnswer={quiz.currentAnswer}
          misconceptionExplanation={quiz.misconceptionExplanation}
          hasProgress={hasProgress}
          onBackToTopics={handleBackToTopics}
          onContinue={() => setScreen('followup')}
        />
      );

    case 'followup':
      return (
        <FollowUpStep
          topic={topic}
          followUp={question.followUp}
          hasProgress={hasProgress}
          onBackToTopics={handleBackToTopics}
          onResult={handleFollowUpResult}
          onFinish={advanceAfterFollowUp}
        />
      );

    case 'results':
      return (
        <ResultsScreen
          topic={topic}
          results={quiz.results}
          onRetry={handleRetry}
          onBackToTopics={handleBackToTopics}
        />
      );

    default:
      return <TopicSelection onSelect={startTopic} />;
  }
}

export default App;
