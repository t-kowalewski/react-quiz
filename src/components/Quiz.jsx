import { useState, useCallback } from 'react';

import questions from '../questions';
import Question from './Question';
import Summary from './Summary';

const Quiz = () => {
  // we'll have array of questions and will track user answers and active question index

  const [userAnswers, setUserAnswers] = useState([]);
  const activeQuestionIndex = userAnswers.length; //derived state - to know which question to show

  const showQuiz = activeQuestionIndex < questions.length; //derived state - to know when questions are over

  console.log(userAnswers);

  const selectAnswerHandler = (selectedAnswer) => {
    setUserAnswers((prevState) => {
      return [...prevState, selectedAnswer];
    });
  };

  const skipAnswerHandler = useCallback(() => {
    setUserAnswers((prevState) => [...prevState, null]);
  }, []);

  if (showQuiz) {
    return (
      <div id='quiz'>
        <Question
          key={activeQuestionIndex}
          questionIndex={activeQuestionIndex}
          onSelectAnswer={selectAnswerHandler}
          onSkipAnswer={skipAnswerHandler}
        />
      </div>
    );
  } else {
    return <Summary userAnswers={userAnswers} />;
  }
};

export default Quiz;
