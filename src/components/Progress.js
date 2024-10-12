import React from 'react';
import { useQuiz } from '../context/QuizContext';

export default function Progress() {
  const { index: i, numQuestions, points, maxPoints, answer } = useQuiz();

  return (
    <header className='progress'>
      <progress max={numQuestions} value={i + Number(answer !== null)} />

      <p>
        Question <strong>{i + 1}</strong> / {numQuestions}
      </p>

      <p>
        <strong>{points}</strong> / {maxPoints}
      </p>
    </header>
  );
}
