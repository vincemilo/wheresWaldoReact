import Timer from "./Timer";

export default function HighScore({ highScoreData, name, submitState }) {
  console.log(highScoreData);
  return (
    <ol>
      {highScoreData.map((entry) => {
        return (
          <li key={entry.id}>
            <div
              className={
                name === entry.name && submitState ? "entry new" : "entry"
              }
            >
              <div className="name">{entry.name}</div>{" "}
              <Timer time={entry.time} />
            </div>
          </li>
        );
      })}
    </ol>
  );
}
