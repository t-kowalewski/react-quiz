import { useState, useEffect } from 'react';

const QuestionTimer = ({ time, onTimeout }) => {
  const [remTime, setRemTime] = useState(time);

  useEffect(() => {
    // console.log('timeout running');
    setTimeout(onTimeout, time);
  }, [time]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemTime((prevState) => {
        console.log('interval running');
        return prevState - 1000;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <progress id='question-time' max={time} value={remTime}></progress>;
};

export default QuestionTimer;
