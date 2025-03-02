import MousePosition from "./components/MousePosition";
import { useState, useEffect, useRef } from "react";
import Timer from "./components/Timer";
import NetworkError from "./components/NetworkError";
import HighScore from "./components/HighScore";
import NameInput from "./components/NameInput";
import useGameTimer from "./hooks/useGameTimer";
import useHighScores from "./hooks/useHighScores";

function App() {
  const [playState, setPlayState] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [name, setName] = useState("");
  const nameModal = useRef(null);

  // Custom hooks for timer and high scores
  const {
    startTime,
    elapsedTime,
    error: timerError,
    loading: timerLoading,
    endTimer,
  } = useGameTimer(playState, gameOver);

  const {
    highScores,
    highestScore,
    error: highScoreError,
    loading: highScoreLoading,
    submitScore,
    isScoreSubmitted,
  } = useHighScores(gameOver);

  // Start game handler
  const handleClick = () => {
    setPlayState(true);
  };

  // End game handler (called by MousePosition component)
  const handleGameOver = () => {
    setGameOver(true);
    endTimer();
  };

  // Submit score handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name) {
      submitScore(name, elapsedTime);
    }
  };

  // Show name input modal if player beats high score
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

  // Handle errors
  const hasError = timerError || highScoreError;
  const isLoading = timerLoading || highScoreLoading;

  // Reset game
  const resetGame = () => {
    window.location.reload();
  };

  return (
    <div className="wrapper">
      <h2>Where&apos;s Waldo?</h2>
      {!playState ? (
        <button onClick={handleClick}>Play</button>
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
            />
          </div>

          <button onClick={resetGame}>Play again?</button>
        </div>
      ) : (
        <>
          <MousePosition handleGameOver={handleGameOver} time={startTime} />
        </>
      )}
    </div>
  );
}

export default App;
