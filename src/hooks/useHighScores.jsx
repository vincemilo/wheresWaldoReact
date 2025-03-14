import { useState, useEffect } from "react";
import { apiGet, apiPost } from "../services/api";

export default function useHighScores(url, difficulty, isGameOver) {
  const [highScores, setHighScores] = useState([]);
  const [highestScore, setHighestScore] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isScoreSubmitted, setIsScoreSubmitted] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const fetchHighScores = async () => {
      if (!isGameOver) return;

      try {
        setLoading(true);
        const data = await apiGet(
          difficulty === 1
            ? `${url}/easy_high_scores?t=${refreshKey}`
            : difficulty === 2
            ? `${url}/med_high_scores?t=${refreshKey}`
            : `${url}/high_scores?t=${refreshKey}`
        );

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
  }, [isGameOver, refreshKey, difficulty, url]);

  const submitScore = async (name, time) => {
    if (isScoreSubmitted || !time) return;

    try {
      setLoading(true);

      await apiPost(
        difficulty === 1
          ? `${url}/easy_high_scores`
          : difficulty === 2
          ? `${url}/med_high_scores`
          : `${url}/high_scores`,
        {
          name,
          time,
        }
      );
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
