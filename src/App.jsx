import MousePosition from "./components/MousePosition";
import { useState, useEffect } from "react";
import Timer from "./components/Timer";
import startTimer from "./startTimer";
import endTimer from "./endTimer";
import NetworkError from "./components/NetworkError";

function App() {
  const [playState, setPlayState] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerId, setTimerId] = useState(null);
  const [serverError, setServerError] = useState(false);
  const timerUrl = "http://localhost:3000/timers";

  useEffect(() => {
    let intervalId;
    if (playState && !gameOver) {
      intervalId = setInterval(() => setStartTime(startTime + 1), 10);
    }
    return () => clearInterval(intervalId);
  }, [playState, startTime, gameOver]);

  const handleClick = async () => {
    setPlayState(true);
    const { data, error } = await startTimer(timerUrl, setTimerId);
    error
      ? setServerError(true)
      : setTimerId(data.id) &&
        setStartTime(new Date() - new Date(data.start_time));
  };

  const endGame = async () => {
    const { data, error } = await endTimer(timerUrl, timerId);
    error ? setServerError(true) : setElapsedTime(data.elapsed_time);
  };

  return (
    <div className="wrapper">
      <h2>Where&apos;s Waldo?</h2>
      {!playState ? (
        <button onClick={handleClick}>Play</button>
      ) : serverError ? (
        <NetworkError />
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
