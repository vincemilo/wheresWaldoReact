import MousePosition from "./components/MousePosition";
import { useState, useEffect } from "react";
import Timer from "./components/Timer";
import NetworkError from "./components/NetworkError";
import useFetch from "./useFetch";

function App() {
  const [playState, setPlayState] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerId, setTimerId] = useState(null);

  const {
    data: startData,
    error: startError,
    loading: startLoading,
  } = useFetch(playState ? "http://localhost:3000/timers" : null, {
    method: "POST",
  });

  const {
    data: endData,
    error: endError,
    loading: endLoading,
  } = useFetch(gameOver ? `http://localhost:3000/timers/${timerId}` : null, {
    method: "DELETE",
  });

  useEffect(() => {
    let intervalId;
    if (playState && !gameOver) {
      intervalId = setInterval(() => {
        setStartTime((prevTime) => prevTime + 1); // Use functional update
      }, 10);
    }
    return () => clearInterval(intervalId); // Cleanup interval
  }, [playState, gameOver]);

  useEffect(() => {
    if (playState && startData) {
      setTimerId(startData.id);
    }
  }, [playState, startData]);

  useEffect(() => {
    if (gameOver && endData) {
      setElapsedTime(endData.elapsed_time);
    }
  }, [gameOver, endData]);

  const handleClick = () => {
    setPlayState(true);
  };

  return (
    <div className="wrapper">
      <h2>Where&apos;s Waldo?</h2>
      {!playState ? (
        <button onClick={handleClick}>Play</button>
      ) : startError || endError ? (
        <NetworkError />
      ) : startLoading || (gameOver && endLoading) ? (
        <p>Loading...</p>
      ) : gameOver ? (
        <div>
          Game over! Your time was: <Timer time={elapsedTime} />
          {startTime}
        </div>
      ) : (
        <>
          <MousePosition setGameOver={setGameOver} time={startTime} />
          {timerId}
        </>
      )}
    </div>
  );
}

export default App;
