import { useQuiz } from '../context/QuizContext';
import Header from './Header';
import Main from './Main';
import Loader from './Loader';
import Error from './Error';
import StartScreen from './StartScreen';
import Questions from './Questions';
import NextButton from './NextButton';
import Progress from './Progress';
import FinishScreen from './FinishScreen';
import Timer from './Timer';
import Footer from './Footer';

export default function App() {
  const { status } = useQuiz();

  // useEffect(() => {
  //   fetch('http://localhost:8000/questions')
  //     .then(res => res.json())
  //     .then(data => dispatch({ type: 'dataReceived', payload: data }))
  //     .catch(err => dispatch({ type: 'dataFailed', payload: err }));
  // }, []);

  return (
    <div className='app'>
      <Header />

      <Main className='main'>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && <StartScreen />}
        {status === 'active' && (
          <>
            <Progress />
            <Questions />
            <Footer>
              <Timer />
              <NextButton />
            </Footer>
          </>
        )}
        {status === 'finished' && <FinishScreen />}
      </Main>
    </div>
  );
}
