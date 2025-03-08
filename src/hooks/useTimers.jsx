import useFetch from "./useFetch";

export default function useTimers(playState, gameOver, elapsedTime, timerId) {
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

  return { startData, startError, startLoading, endData, endError, endLoading };
}
