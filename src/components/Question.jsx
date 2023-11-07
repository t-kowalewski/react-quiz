import Answers from './Answers';
import QuestionTimer from './QuestionTimer';

const Question = ({
  questionText,
  answers,
  answerState,
  selectedAnswer,
  onSelectAnswer,
  onSkipAnswer,
}) => {
  return (
    <div id='question'>
      <h3>{questionText}</h3>

      <Answers
        answers={answers}
        answerState={answerState}
        onSelectAnswer={onSelectAnswer}
        selectedAnswer={selectedAnswer}
      />

      <QuestionTimer time={10000} onTimeout={onSkipAnswer} />
    </div>
  );
};

export default Question;
