import React from 'react';

export default function Progress({ index: i, numQuestinos, points, maxPoints, answer }) {
  return (
    <header className='progress'>
      <progress max={numQuestinos} value={i + Number(answer !== null)} />

      <p>
        Question <strong>{i + 1}</strong> / {numQuestinos}
      </p>

      <p>
        <strong>{points}</strong> / {maxPoints}
      </p>
    </header>
  );
}
