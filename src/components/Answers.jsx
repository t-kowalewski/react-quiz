import { useRef } from 'react';

const Answers = ({ answers, answerState, selectedAnswer, onSelectAnswer }) => {
  const shuffledAnswers = useRef(null);

  if (!shuffledAnswers.current) {
    shuffledAnswers.current = [...answers];
    shuffledAnswers.current.sort((a, b) => Math.random() - 0.5);
  }

  return (
    <ul id='answers'>
      {shuffledAnswers.current.map((answer) => {
        let answerClass = '';
        const isSelected = answer === selectedAnswer;

        if (isSelected && answerState === 'answered') {
          answerClass = 'selected';
        }

        if (
          isSelected &&
          (answerState === 'correct' || answerState === 'wrong')
        ) {
          answerClass = answerState;
        }

        return (
          <li key={answer} className='answer'>
            <button
              className={answerClass}
              onClick={() => onSelectAnswer(answer)}
              disabled={answerState !== ''}
            >
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default Answers;
