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
  const [refreshKey, setRefreshKey] = useState(0);

  const {
    data: startData,
    error: startError,
    loading: startLoading,
  } = useFetch(playState && !gameOver ? "http://localhost:3000/timers" : null, {
    method: "POST",
  });

  const {
    data: endData,
    error: endError,
    loading: endLoading,
  } = useFetch(
    gameOver && !elapsedTime ? `http://localhost:3000/timers/${timerId}` : null,
    {
      method: "PATCH",
    }
  );

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
  } = useFetch(
    submitState && !refreshKey ? "http://localhost:3000/high_scores" : null,
    {
      method: "POST",
      body: JSON.stringify({ name: name, time: elapsedTime }), // maybe use timerId to look up the record via server to avoids meddling from client
    }
  );

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
      setRefreshKey((prev) => prev + 1);
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
        <div className="game-over">
          <h3 className="game-over-text">Game over!</h3>
          <div className="final-time">
            <p>Your time was:</p> <Timer time={elapsedTime} />
          </div>
          {elapsedTime < highestScore && !submitState ? (
            <form className="input-field" onSubmit={handleSubmit}>
              <p>Congratulations!</p>
              <p>You made the top ten!</p>
              <p>Please enter your name: </p>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <button type="submit">Submit</button>
            </form>
          ) : null}
          <div className="high-scores">
            <h3>High Scores:</h3>
            <HighScore highScoreData={highScoreData} name={name} />
          </div>
          <button onClick={() => location.reload()}>Play again?</button>
        </div>
      ) : (
        <>
          <MousePosition setGameOver={setGameOver} time={startTime} />
        </>
      )}
    </div>
  );
}

export default App;
