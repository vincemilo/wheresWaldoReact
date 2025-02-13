import MousePosition from "./components/MousePosition";
import { useState, useEffect } from "react";
import Timer from "./components/Timer";
import startTimer from "./startTimer";
import endTimer from "./endTimer";

function App() {
  const [playState, setPlayState] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerId, setTimerId] = useState(null);
  const timerUrl = "http://localhost:3000/timers";

  useEffect(() => {
    let intervalId;
    if (playState && !gameOver) {
      intervalId = setInterval(() => setStartTime(startTime + 1), 10);
    }
    return () => clearInterval(intervalId);
  }, [playState, startTime, gameOver]);

  const handleClick = () => {
    setPlayState(true);
    startTimer(timerUrl, setTimerId, setStartTime);
  };

  const endGame = () => {
    endTimer(timerUrl, timerId, setElapsedTime);
  };

  return (
    <div className="wrapper">
      <h2>Where&apos;s Waldo?</h2>
      {!playState ? (
        <button onClick={handleClick}>Play</button>
      ) : gameOver ? (
        <div>
          Game over! Your time was: <Timer time={elapsedTime} />
        </div>
      ) : (
        <>
          <MousePosition
            setGameOver={setGameOver}
            time={startTime}
            endGame={endGame}
          />
        </>
      )}
    </div>
  );
}

export default App;
