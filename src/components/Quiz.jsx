import { useState, useCallback, useRef } from 'react';

import quizCompleteImg from '../assets/quiz-complete.png';
import questions from '../questions';
import Answers from './Answers';
import QuestionTimer from './QuestionTimer';

const Quiz = () => {
  const shuffledAnswers = useRef(null);
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
        shuffledAnswers.current = null;
      }, 2000);
    }, 1000);
  };

  const skipAnswerHandler = useCallback(() => {
    setUserAnswers((prevState) => [...prevState, null]);
    shuffledAnswers.current = null;
  }, []);

  if (showQuiz) {
    if (!shuffledAnswers.current) {
      shuffledAnswers.current = [...questions[activeQuestionIndex].answers];
      shuffledAnswers.current.sort((a, b) => Math.random() - 0.5);
    }

    return (
      <div id='quiz'>
        <div id='question'>
          <h3>{questions[activeQuestionIndex].text}</h3>

          <Answers
            answers={shuffledAnswers.current}
            answerState={answerState}
            userAnswers={userAnswers}
            onSelectAnswer={selectAnswerHandler}
          />

          <QuestionTimer
            key={activeQuestionIndex}
            time={10000}
            onTimeout={skipAnswerHandler}
          />
        </div>
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
