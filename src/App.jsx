import MousePosition from "./components/MousePosition";
import { useState, useEffect } from "react";
import Timer from "./components/Timer";

function App() {
  const [playState, setPlayState] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    let intervalId;
    if (playState) {
      // setting time from 0 to 1 every 10 milisecond using javascript setInterval method
      intervalId = setInterval(() => setTime(time + 1), 10);
    }
    if (gameOver) {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [playState, time, gameOver]);

  const handleClick = () => {
    setPlayState(true);
  };

  return (
    <div className="wrapper">
      <h2>Where&apos;s Waldo?</h2>
      {!playState ? (
        <button onClick={handleClick}>Play</button>
      ) : gameOver ? (
        <div>
          Game over! Your time was: <Timer time={time} />
        </div>
      ) : (
        <>
          <MousePosition setGameOver={setGameOver} time={time} />
        </>
      )}
    </div>
  );
}

export default App;
