import Timer from "./Timer";

export default function HighScore({ highScoreData }) {
  return (
    <ol>
      {highScoreData.map((entry) => {
        return (
          <li key={entry.id}>
            {entry.name} <Timer time={entry.time} />
          </li>
        );
      })}
    </ol>
  );
}
