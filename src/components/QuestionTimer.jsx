import { useState, useEffect } from 'react';

const QuestionTimer = ({ time, onTimeout, mode }) => {
  const [remTime, setRemTime] = useState(time);

  // controls when to switch to another question if inactive
  useEffect(() => {
    let timer;
    if (onTimeout !== null) {
      timer = setTimeout(onTimeout, time);
    }

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

  return (
    <progress
      id='question-time'
      max={time}
      value={remTime}
      className={mode}
    ></progress>
  );
};

export default QuestionTimer;
