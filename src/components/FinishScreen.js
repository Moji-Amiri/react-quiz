import React from 'react';

export default function FinishScreen({ points, maxPoints, highScore, dispatch }) {
  const percentage = (points / maxPoints) * 100;

  let emoji;
  if (percentage > 100) emoji = '😳🤬';
  else if (percentage === 100) emoji = '🥇';
  else if (percentage >= 80 && percentage < 100) emoji = '🥈';
  else if (percentage >= 50 && percentage < 80) emoji = '🥉';
  else if (percentage > 0 && percentage < 50) emoji = '😭';
  else if (percentage === 0) emoji = '💩';

  return (
    <>
      <p className='result'>
        <span>{emoji}</span>
        You scored <strong>{points}</strong> out of {maxPoints} ({Math.ceil(percentage)}%)
      </p>
      <p className='highscore'>(Highscore: {highScore} points)</p>
      <button className='btn btn-ui' onClick={() => dispatch({ type: 'restart' })}>
        Try Again
      </button>
    </>
  );
}
