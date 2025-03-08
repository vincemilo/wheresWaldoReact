import useFetch from "./useFetch";

export default function useHighScores(
  gameOver,
  refreshKey,
  submitState,
  name,
  elapsedTime
) {
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

  return {
    highScoreData,
    highScoreError,
    highScoreLoading,
    highScorePostData,
    highScorePostError,
    highScorePostLoading,
  };
}
