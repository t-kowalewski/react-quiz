import { useState } from 'react';

import questions from '../questions';
import Answers from './Answers';
import QuestionTimer from './QuestionTimer';

const Question = ({ questionIndex, onSelectAnswer, onSkipAnswer }) => {
  const [answer, setAnswer] = useState({
    selectedAnswer: '',
    isCorrect: null,
  });

  let answerState = '';
  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? 'correct' : 'wrong';
  } else if (answer.selectedAnswer) {
    answerState = 'answered';
  }

  // Adjust timer for progress bar to not clash with handler
  let timer = 10000;
  if (answer.selectedAnswer) {
    timer = 1000;
  }
  if (answer.isCorrect !== null) {
    timer = 2000;
  }

  const selectAnswerHandler = (answer) => {
    setAnswer({
      selectedAnswer: answer,
      isCorrect: null,
    });

    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: questions[questionIndex].answers[0] === answer,
      });

      setTimeout(() => {
        onSelectAnswer(answer);
      }, 2000);
    }, 1000);
  };

  return (
    <div id='question'>
      <h3>{questions[questionIndex].text}</h3>

      <Answers
        answers={questions[questionIndex].answers}
        selectedAnswer={answer.selectedAnswer}
        answerState={answerState}
        onSelectAnswer={selectAnswerHandler}
      />

      <QuestionTimer
        key={timer}
        time={timer}
        onTimeout={answer.selectedAnswer === '' ? onSkipAnswer : null}
        mode={answerState}
      />
    </div>
  );
};

export default Question;
