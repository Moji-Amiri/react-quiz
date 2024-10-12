import React, { useEffect } from 'react';
import { useQuiz } from '../context/QuizContext';

export default function Timer() {
  const { secsRemaining, dispatch } = useQuiz();

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: 'tick' });
    }, 1000);

    return () => clearInterval(id);
  }, [dispatch]);

  const min = String(Math.trunc(secsRemaining / 60)).padStart(2, '0');
  const sec = String(Math.trunc(secsRemaining % 60)).padStart(2, '0');

  return (
    <div className='timer'>
      {min}:{sec}
    </div>
  );
}
