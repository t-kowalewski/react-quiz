import { useState, useCallback } from 'react';

import quizCompleteImg from '../assets/quiz-complete.png';
import questions from '../questions';
import QuestionTimer from './QuestionTimer';

const Quiz = () => {
  // we'll have array of questions and will track user answers and active question index

  const [userAnswers, setUserAnswers] = useState([]);
  const activeQuestionIndex = userAnswers.length; //derived state - to know which question to show

  const showQuiz = activeQuestionIndex < questions.length; //derived state - to know when questions are over

  console.log(userAnswers);

  const selectAnswerHandler = (e) => {
    setUserAnswers((prevState) => {
      return [...prevState, e.target.textContent];
    });
  };

  const skipAnswerHandler = useCallback(() => {
    setUserAnswers((prevState) => [...prevState, null]);
  }, []);

  if (showQuiz) {
    const shuffledAnswers = [...questions[activeQuestionIndex].answers];
    shuffledAnswers.sort((a, b) => Math.random() - 0.5);

    return (
      <div id='quiz'>
        <div id='question'>
          <h3>{questions[activeQuestionIndex].text}</h3>

          <ul id='answers'>
            {shuffledAnswers.map((answer, ind) => {
              return (
                <li key={ind} className='answer'>
                  <button onClick={selectAnswerHandler}>{answer}</button>
                </li>
              );
            })}
          </ul>

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
