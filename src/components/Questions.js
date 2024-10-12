import React from 'react';
import { useQuiz } from '../context/QuizContext';
import Options from './Options';

export default function Questions() {
  const { questions, dispatch, answer, index } = useQuiz();

  const question = questions[index];
  console.log(question);

  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
}
