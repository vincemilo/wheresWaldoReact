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

  const {
    data: highScoreData,
    error: highScoreError,
    loading: highScoreLoading,
  } = useFetch(gameOver ? "http://localhost:3000/high_scores" : null);

  useEffect(() => {
    let intervalId;
    if (playState && !gameOver) {
      intervalId = setInterval(() => {
        setStartTime((prevTime) => prevTime + 1);
      }, 10);
    }
    return () => clearInterval(intervalId);
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
      ) : startError || endError || highScoreError ? (
        <NetworkError />
      ) : startLoading ||
        (gameOver && endLoading) ||
        (gameOver && highScoreLoading) ? (
        <p>Loading...</p>
      ) : gameOver ? (
        <div>
          Game over! Your time was: <Timer time={elapsedTime} />
          <ul>
            <h3>High Scores:</h3>
            {highScoreData.map((entry) => {
              return <li key={entry.id}>{entry.name + " " + entry.time}</li>;
            })}
          </ul>
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
