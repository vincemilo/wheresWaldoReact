// hooks/useHighScores.js
import { useState, useEffect } from "react";
import { apiGet, apiPost } from "../services/api";

export default function useHighScores(isGameOver) {
  const [highScores, setHighScores] = useState([]);
  const [highestScore, setHighestScore] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isScoreSubmitted, setIsScoreSubmitted] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  // Fetch high scores when game is over
  useEffect(() => {
    const fetchHighScores = async () => {
      if (!isGameOver) return;

      try {
        setLoading(true);
        const data = await apiGet(
          `http://localhost:3000/high_scores?t=${refreshKey}`
        );

        // Set the highest score and sort high scores by lowest time
        if (data.length > 0) {
          const sortedScores = [...data].sort((a, b) => a.time - b.time);
          setHighestScore(sortedScores[sortedScores.length - 1].time);
          setHighScores(sortedScores);
        }

        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchHighScores();
  }, [isGameOver, refreshKey]);

  // Submit score function
  const submitScore = async (name, time) => {
    if (isScoreSubmitted || !time) return;

    try {
      setLoading(true);
      await apiPost("http://localhost:3000/high_scores", {
        name,
        time,
      });
      setIsScoreSubmitted(true);
      setRefreshKey((prev) => prev + 1); // Trigger refresh of high scores
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  return {
    highScores,
    highestScore,
    loading,
    error,
    submitScore,
    isScoreSubmitted,
  };
}
