import { useState, useEffect } from 'react';

const QuestionTimer = ({ time, onTimeout }) => {
  const [remTime, setRemTime] = useState(time);

  // controls when to switch to another question if inactive
  useEffect(() => {
    const timer = setTimeout(onTimeout, time);

    return () => {
      clearTimeout(timer);
    };
  }, [time, onTimeout]);

  // controls progress bar
  useEffect(() => {
    const interval = setInterval(() => {
      setRemTime((prevState) => {
        return prevState - 10;
      });
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <progress id='question-time' max={time} value={remTime}></progress>;
};

export default QuestionTimer;
