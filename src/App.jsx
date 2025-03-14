import MousePosition from "./components/MousePosition";
import { useState, useEffect, useRef } from "react";
import Timer from "./components/Timer";
import NetworkError from "./components/NetworkError";
import HighScore from "./components/HighScore";
import NameInput from "./components/NameInput";
import useGameTimer from "./hooks/useGameTimer";
import useHighScores from "./hooks/useHighScores";
import DifficultyButtons from "./components/DifficultyButtons";

function App() {
  const [playState, setPlayState] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const [name, setName] = useState("");

  const [difficulty, setDifficulty] = useState(1);

  const nameModal = useRef(null);

  const url = "http://localhost:3000";

  const {
    startTime,
    elapsedTime,
    error: timerError,
    loading: timerLoading,
    endTimer,
    timerId,
  } = useGameTimer(url, playState, gameOver);

  const {
    highScores,
    highestScore,
    error: highScoreError,
    loading: highScoreLoading,
    submitScore,
    isScoreSubmitted,
  } = useHighScores(url, difficulty, gameOver);

  const handleClick = () => {
    setPlayState(true);
  };

  const handleGameOver = () => {
    setGameOver(true);
    endTimer();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name) {
      submitScore(name, timerId);
    }
  };

  useEffect(() => {
    if (
      gameOver &&
      elapsedTime &&
      highestScore &&
      elapsedTime < highestScore &&
      !isScoreSubmitted
    ) {
      nameModal.current?.showModal();
    }
  }, [elapsedTime, highestScore, gameOver, isScoreSubmitted]);

  const hasError = timerError || highScoreError;
  const isLoading = timerLoading || highScoreLoading;

  const resetGame = () => {
    window.location.reload();
  };

  return (
    <div className="wrapper">
      <h2>Where&apos;s Waldo?</h2>
      {!playState ? (
        <>
          <button onClick={handleClick}>Play</button>
          <p>Select difficulty:</p>
          <DifficultyButtons
            difficulty={difficulty}
            setDifficulty={setDifficulty}
          />
        </>
      ) : hasError ? (
        <NetworkError />
      ) : isLoading ? (
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
              highScoreData={highScores}
              name={name}
              submitState={isScoreSubmitted}
              elapsedTime={elapsedTime}
            />
          </div>

          <button onClick={resetGame}>Play again?</button>
        </div>
      ) : (
        <>
          <MousePosition
            url={url}
            handleGameOver={handleGameOver}
            time={startTime}
            difficulty={difficulty}
          />
        </>
      )}
    </div>
  );
}

export default App;
