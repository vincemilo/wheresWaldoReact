import MousePosition from "./components/MousePosition";
import { useState, useEffect, useRef } from "react";
import Timer from "./components/Timer";
import NetworkError from "./components/NetworkError";
import HighScore from "./components/HighScore";
import NameInput from "./components/NameInput";
import useTimers from "./hooks/useTimers";
import useHighScores from "./hooks/useHighScores";

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
  const nameModal = useRef(null);

  const { startData, startError, startLoading, endData, endError, endLoading } =
    useTimers(playState, gameOver, elapsedTime, timerId);

  const {
    highScoreData,
    highScoreError,
    highScoreLoading,
    highScorePostData,
    highScorePostError,
    highScorePostLoading,
  } = useHighScores(gameOver, refreshKey, submitState, name, elapsedTime);

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
    if (elapsedTime < highestScore && !submitState) {
      nameModal.current?.showModal();
    }
  }, [elapsedTime, highestScore, submitState]);

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
          <NameInput
            nameModal={nameModal}
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />
          <div className="high-scores">
            <h3>High Scores:</h3>
            <HighScore
              highScoreData={highScoreData}
              name={name}
              submitState={submitState}
            />
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
