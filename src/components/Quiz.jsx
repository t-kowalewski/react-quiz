import { useState, useCallback } from 'react';

import quizCompleteImg from '../assets/quiz-complete.png';
import questions from '../questions';
import Question from './Question';

const Quiz = () => {
  const [answerState, setAnswerState] = useState('');
  // we'll have array of questions and will track user answers and active question index

  const [userAnswers, setUserAnswers] = useState([]);
  const activeQuestionIndex =
    answerState === '' ? userAnswers.length : userAnswers.length - 1; //derived state - to know which question to show

  const showQuiz = activeQuestionIndex < questions.length; //derived state - to know when questions are over

  console.log(userAnswers);

  const selectAnswerHandler = (e) => {
    const selectedAnswer = e.target.textContent;

    setAnswerState('answered');

    setUserAnswers((prevState) => {
      return [...prevState, selectedAnswer];
    });

    setTimeout(() => {
      if (questions[activeQuestionIndex].answers[0] === selectedAnswer) {
        setAnswerState('correct');
      } else {
        setAnswerState('wrong');
      }

      // Resetting answer
      setTimeout(() => {
        setAnswerState('');
      }, 2000);
    }, 1000);
  };

  const skipAnswerHandler = useCallback(() => {
    setUserAnswers((prevState) => [...prevState, null]);
  }, []);

  if (showQuiz) {
    return (
      <div id='quiz'>
        <Question
          key={activeQuestionIndex}
          questionText={questions[activeQuestionIndex].text}
          answers={questions[activeQuestionIndex].answers}
          answerState={answerState}
          selectedAnswer={userAnswers[userAnswers.length - 1]}
          onSelectAnswer={selectAnswerHandler}
          onSkipAnswer={skipAnswerHandler}
        />
      </div>
    );
  } else {
    return (
      <div id='summary'>
        <img src={quizCompleteImg} alt='Trophy Icon' />
        <h2>Quiz Completed!</h2>
      </div>
    );
  }
};

export default Quiz;
