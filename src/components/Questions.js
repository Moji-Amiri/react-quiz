import { dblClick } from '@testing-library/user-event/dist/click';
import React from 'react';
import Options from './Options';

export default function Questions({ question }) {
  console.log(question);

  return (
    <div>
      <h4>{question.question}</h4>
      <Options options={question.options} />
    </div>
  );
}
