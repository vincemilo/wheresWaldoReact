import MousePosition from "./components/MousePosition";
import { useState, useEffect } from "react";
import Timer from "./components/Timer";
import startTimer from "./startTimer";
import endTimer from "./endTimer";

function App() {
  const [playState, setPlayState] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [time, setTime] = useState(0);
  const [timerId, setTimerId] = useState(null);

  useEffect(() => {
    let intervalId;
    if (playState && !gameOver) {
      // setting time from 0 to 1 every 10 milisecond using javascript setInterval method
      intervalId = setInterval(() => setTime(time + 1), 10);
    }
    return () => clearInterval(intervalId);
  }, [playState, time, gameOver]);

  const handleClick = () => {
    setPlayState(true);
    startTimer(setTimerId, setTime);
  };

  const endGame = () => {
    endTimer(timerId);
  };

  return (
    <div className="wrapper">
      <h2>Where&apos;s Waldo?</h2>
      {!playState ? (
        <button onClick={handleClick}>Play</button>
      ) : gameOver ? (
        <div>
          Game over! Your time was: <Timer time={time} />
          <div>{time}</div>
        </div>
      ) : (
        <>
          <MousePosition
            setGameOver={setGameOver}
            time={time}
            endGame={endGame}
          />
          <div>{timerId}</div>
        </>
      )}
    </div>
  );
}

export default App;
