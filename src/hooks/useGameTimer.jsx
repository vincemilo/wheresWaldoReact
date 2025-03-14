import { useState, useEffect } from "react";
import { apiPost, apiPatch } from "../services/api";

export default function useGameTimer(url, isPlaying, isGameOver) {
  const [startTime, setStartTime] = useState(0);
  const [timerId, setTimerId] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let intervalId;
    if (isPlaying && !isGameOver) {
      intervalId = setInterval(() => {
        setStartTime((prevTime) => prevTime + 1);
      }, 10);
    }
    return () => clearInterval(intervalId);
  }, [isPlaying, isGameOver]);

  useEffect(() => {
    const startTimer = async () => {
      if (isPlaying && !isGameOver && !timerId) {
        try {
          setLoading(true);
          const data = await apiPost(`${url}/timers`);
          setTimerId(data.id);
          setLoading(false);
        } catch (err) {
          setError(err);
          setLoading(false);
        }
      }
    };

    startTimer();
  }, [url, isPlaying, isGameOver, timerId]);

  const endTimer = async () => {
    if (!timerId) return;

    try {
      setLoading(true);
      const data = await apiPatch(`${url}/timers/${timerId}`);
      setElapsedTime(data.elapsed_time);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  return {
    startTime,
    elapsedTime,
    loading,
    error,
    endTimer,
  };
}
