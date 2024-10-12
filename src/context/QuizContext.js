import { createContext, useContext, useReducer } from 'react';
import { SECS_PER_QUESTIONS, QUESTIONS } from '../components/config';

const QuizContext = createContext();

const iniState = {
  questions: QUESTIONS,
  status: 'ready', // loading, error, ready, active, finished
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secsRemaining: null,
};

function quizReducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return { ...state, questions: action.payload, status: 'ready' };
    case 'dataFailed':
      return { ...state, status: 'error' };
    case 'start':
      return {
        ...state,
        status: 'active',
        secsRemaining: state.questions.length * SECS_PER_QUESTIONS,
      };
    case 'newAnswer':
      const question = state.questions[state.index];
      return {
        ...state,
        answer: action.payload,
        points:
          question.correctOption === action.payload
            ? state.points + question.points
            : state.points,
      };
    case 'nextQuestion':
      return { ...state, index: state.index + 1, answer: null };
    case 'finish':
      return {
        ...state,
        status: 'finished',
        highScore: state.points > state.highScore ? state.points : state.highScore,
      };
    case 'restart':
      return {
        ...iniState,
        questions: state.questions,
        status: 'active',
        secsRemaining: state.questions.length * SECS_PER_QUESTIONS,
        highScore: state.highScore,
      };
    case 'tick':
      return {
        ...state,
        secsRemaining: state.secsRemaining - 1,
        status: state.secsRemaining <= 0 ? 'finished' : state.status,
        highScore: state.points > state.highScore ? state.points : state.highScore,
      };
    default:
      throw new Error('invalid action type');
  }
}

function QuizProvider({ children }) {
  const [state, dispatch] = useReducer(quizReducer, iniState);

  const { questions, status, index, answer, points, highScore, secsRemaining } = state;
  const numQuestions = questions.length;
  const maxPoints = questions.reduce((acc, question) => acc + question.points, 0);

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highScore,
        secsRemaining,
        numQuestions,
        maxPoints,

        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) throw new Error('useContext used outside of QuizProvider');
  return context;
}

export { QuizProvider, useQuiz };
