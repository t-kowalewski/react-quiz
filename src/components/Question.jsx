import { useState } from 'react';

import questions from '../questions';
import Answers from './Answers';
import QuestionTimer from './QuestionTimer';

const Question = ({ questionIndex, onSelectAnswer, onSkipAnswer }) => {
  const [answer, setAnswer] = useState({
    selectedAnswer: '',
    isCorrect: null,
  });

  // answer state, derived from "answer"
  let answerState = '';
  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? 'correct' : 'wrong';
  } else if (answer.selectedAnswer) {
    answerState = 'answered';
  }

  // adjust timer for progress bar to be in sync with handler
  let timer = 15000;
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
        key={timer} // to be able to reset interval inside
        time={timer}
        onTimeout={answer.selectedAnswer === '' ? onSkipAnswer : null}
        mode={answerState} // for css styling
      />
    </div>
  );
};

export default Question;
