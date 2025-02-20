import MousePosition from "./components/MousePosition";
import { useState, useEffect } from "react";
import Timer from "./components/Timer";
import NetworkError from "./components/NetworkError";
import useFetch from "./useFetch";
import HighScore from "./components/HighScore";

function App() {
  const [playState, setPlayState] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerId, setTimerId] = useState(null);
  const [highestScore, setHighestScore] = useState(null);
  const [submitState, setSubmitState] = useState(false);
  const [name, setName] = useState("");
  const [refreshKey, setRefreshKey] = useState(Date.now());

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
  } = useFetch(
    gameOver ? `http://localhost:3000/high_scores?t=${refreshKey}` : null,
    { method: "GET" }
  );

  const {
    data: highScorePostData,
    error: highScorePostError,
    loading: highScorePostLoading,
  } = useFetch(submitState ? "http://localhost:3000/high_scores" : null, {
    method: "POST",
    body: JSON.stringify({ name: name, time: elapsedTime }), // maybe use timerId to look up the record via server to avoids meddling from client
  });

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

  useEffect(() => {
    if (gameOver && highScoreData) {
      const highScore = highScoreData.sort((a, b) => a.time - b.time);
      setHighestScore(highScore[highScoreData.length - 1].time);
    }
  }, [gameOver, highScoreData]);

  useEffect(() => {
    // refresh list after successful post
    if (highScorePostData) {
      setRefreshKey(Date.now());
    }
  }, [highScorePostData]);

  const handleClick = () => {
    setPlayState(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    !name ? null : setSubmitState(true);
  };

  return (
    <div className="wrapper">
      <h2>Where&apos;s Waldo?</h2>
      {!playState ? (
        <button onClick={handleClick}>Play</button>
      ) : startError || endError || highScoreError || highScorePostError ? (
        <NetworkError />
      ) : startLoading ||
        (gameOver && endLoading) ||
        (gameOver && highScoreLoading) ||
        (submitState && highScorePostLoading) ? (
        <p>Loading...</p>
      ) : gameOver ? (
        <div>
          Game over! Your time was: <Timer time={elapsedTime} />
          {elapsedTime < highestScore && !submitState ? (
            <>
              <div>Congratulations! You made the top ten!</div>
              <form onSubmit={handleSubmit}>
                Please enter your name:{" "}
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <button type="submit">Submit</button>
              </form>
            </>
          ) : null}
          <ul>
            <h3>High Scores:</h3>
            <HighScore highScoreData={highScoreData} />
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
