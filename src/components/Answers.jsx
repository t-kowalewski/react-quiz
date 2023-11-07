const Answers = ({ answers, answerState, userAnswers, onSelectAnswer }) => {
  return (
    <ul id='answers'>
      {answers.map((answer) => {
        let answerClass = '';
        const isSelected = answer === userAnswers[userAnswers.length - 1];

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
            <button className={answerClass} onClick={onSelectAnswer}>
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default Answers;
