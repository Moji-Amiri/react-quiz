import { useEffect, useReducer } from 'react';
import Header from './Header';
import Main from './Main';
import Loader from './Loader';
import Error from './Error';
import StartScreen from './StartScreen';
import Questions from './Questions';
import NextButton from './NextButton';
import Progress from './Progress';

const iniState = {
  questions: [],
  status: 'loading', // loading, error, ready, active, finished
  index: 0,
  answer: null,
  points: 0,
};

function quizReducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return { ...state, questions: action.payload, status: 'ready' };
    case 'dataFailed':
      return { ...state, status: 'error' };
    case 'start':
      return { ...state, status: 'active' };
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
    default:
      throw new Error('invalid action type');
  }
}

export default function App() {
  const [state, dispatch] = useReducer(quizReducer, iniState);

  const { questions, status, index, answer, points } = state;
  const numQuestions = questions.length;
  const maxPoints = questions.reduce((acc, question) => acc + question.points, 0);

  useEffect(() => {
    fetch('http://localhost:8000/questions')
      .then(res => res.json())
      .then(data => dispatch({ type: 'dataReceived', payload: data }))
      .catch(err => dispatch({ type: 'dataFailed', payload: err }));
  }, []);

  return (
    <div className='app'>
      <Header />

      <Main className='main'>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === 'active' && (
          <>
            <Progress
              index={index}
              numQuestinos={numQuestions}
              points={points}
              maxPoints={maxPoints}
              answer={answer}
            />
            <Questions question={questions[index]} dispatch={dispatch} answer={answer} />
            <NextButton dispatch={dispatch} answer={answer} />
          </>
        )}
      </Main>
    </div>
  );
}
