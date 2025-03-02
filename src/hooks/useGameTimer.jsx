import { useState, useEffect } from "react";
import { apiPost, apiPatch } from "../services/api";

export default function useGameTimer(isPlaying, isGameOver) {
  const [startTime, setStartTime] = useState(0);
  const [timerId, setTimerId] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Tick timer while game is playing
  useEffect(() => {
    let intervalId;
    if (isPlaying && !isGameOver) {
      intervalId = setInterval(() => {
        setStartTime((prevTime) => prevTime + 1);
      }, 10);
    }
    return () => clearInterval(intervalId);
  }, [isPlaying, isGameOver]);

  // Check if gamestate started and no timer has been created
  useEffect(() => {
    const startTimer = async () => {
      if (isPlaying && !isGameOver && !timerId) {
        try {
          setLoading(true);
          const data = await apiPost("http://localhost:3000/timers");
          setTimerId(data.id);
          setLoading(false);
        } catch (err) {
          setError(err);
          setLoading(false);
        }
      }
    };

    startTimer();
  }, [isPlaying, isGameOver, timerId]);

  // End timer function
  const endTimer = async () => {
    if (!timerId) return;

    try {
      setLoading(true);
      const data = await apiPatch(`http://localhost:3000/timers/${timerId}`);
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
