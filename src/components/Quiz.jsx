import { useState } from 'react';

import questions from '../questions';

const Quiz = () => {
  // we'll have array of questions and will track user answers and active question index

  const [userAnswers, setUserAnswers] = useState([]);
  const activeQuestionIndex = userAnswers.length; //derived state

  console.log(userAnswers);

  const selectAnswerHandler = (e) => {
    setUserAnswers((prevState) => {
      return [...prevState, e.target.textContent];
    });
  };

  return (
    <div id='quiz'>
      <div id='question'>
        <h3>{questions[activeQuestionIndex].text}</h3>

        <ul id='answers'>
          {questions[activeQuestionIndex].answers.map((answer, ind) => {
            return (
              <li key={ind} className='answer'>
                <button onClick={selectAnswerHandler}>{answer}</button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Quiz;
