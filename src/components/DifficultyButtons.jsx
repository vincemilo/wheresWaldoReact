export default function DifficultyButtons({ difficulty, setDifficulty }) {
  const handleClick = (selection) => {
    setDifficulty(selection);
  };

  return (
    <div className="difficulty-buttons">
      <button
        onClick={() => handleClick(1)}
        className={difficulty === 1 ? "easy selected" : "easy"}
      >
        Easy
      </button>
      <button
        onClick={() => handleClick(2)}
        className={difficulty === 2 ? "medium selected" : "medium"}
      >
        Medium
      </button>
      <button
        onClick={() => handleClick(3)}
        className={difficulty === 3 ? "hard selected" : "hard"}
      >
        Hard
      </button>
    </div>
  );
}
