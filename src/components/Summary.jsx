import questions from '../questions';
import quizCompleteImg from '../assets/quiz-complete.png';

const Summary = ({ userAnswers }) => {
  const skippedAnswers = userAnswers.filter((answer) => {
    return answer === null;
  });

  const correctAnswers = userAnswers.filter((answer, ind) => {
    return answer === questions[ind].answers[0];
  });

  const skippedAnswersShare = Math.round(
    (skippedAnswers.length * 100) / userAnswers.length
  );
  const correctAnswersShare = Math.round(
    (correctAnswers.length * 100) / userAnswers.length
  );
  const wrongAnswersShare = 100 - skippedAnswersShare - correctAnswersShare;

  return (
    <div id='summary'>
      <img src={quizCompleteImg} alt='Trophy Icon' />
      <h2>Quiz Completed!</h2>

      {/* Stats */}
      <div id='summary-stats'>
        <p>
          <span className='number'>{skippedAnswersShare}%</span>
          <span className='text'>skipped</span>
        </p>

        <p>
          <span className='number'>{correctAnswersShare}%</span>
          <span className='text'>correct answers</span>
        </p>

        <p>
          <span className='number'>{wrongAnswersShare}%</span>
          <span className='text'>incorrect answers</span>
        </p>
      </div>

      {/* List of questions & answers */}
      <ol>
        {userAnswers.map((answer, ind) => {
          // derive css class for answer type
          let cssClass = 'user-answer';
          if (answer === null) {
            cssClass += ' skipped';
          } else if (answer === questions[ind].answers[0]) {
            cssClass += ' correct';
          } else {
            cssClass += ' wrong';
          }

          return (
            <li key={ind}>
              <h3>{ind + 1}</h3>
              <p className='question'>{questions[ind].text}</p>
              <p className={cssClass}>{answer || 'Question Skipped'}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default Summary;
