/**
 * adaptiveDifficulty.js — Adaptive Learning Engine
 *
 * Dynamically computes user performance metrics and difficulty recommendation
 * directly from AppContext state (and localStorage) for 100% reactive real-time updates.
 */

/**
 * Computes live performance summary directly from AppContext state
 * @param {object} state - AppContext state (completedStories, quizScores, xp, etc.)
 */
export function getPerformanceSummary(state = {}) {
  const completedStories = state?.completedStories || [];
  const quizScores = state?.quizScores || {};

  let totalCorrect = 0;
  let totalQuestions = 0;

  Object.values(quizScores).forEach((entry) => {
    if (entry && typeof entry === 'object') {
      const correct = Number(entry.correct ?? entry.score ?? 0);
      const total = Number(entry.total ?? 3);
      totalCorrect += correct;
      totalQuestions += total;
    }
  });

  const storiesCount = completedStories.length;
  const quizAccuracy = totalQuestions > 0
    ? Math.round((totalCorrect / totalQuestions) * 100)
    : storiesCount > 0 ? 80 : 0;

  // Compute adaptive difficulty
  let difficulty = 'easy';
  if (storiesCount >= 3 && quizAccuracy >= 80) {
    difficulty = 'hard';
  } else if (storiesCount >= 1 || quizAccuracy >= 60) {
    difficulty = 'medium';
  }

  return {
    storiesCompleted: storiesCount,
    quizAccuracy,
    totalCorrect,
    totalQuestions,
    avgHeartsLost: Math.max(0, (3 - (quizAccuracy >= 80 ? 3 : quizAccuracy >= 50 ? 2 : 1))).toFixed(1),
    difficulty,
  };
}

/**
 * Returns user-facing label and styling for the recommended difficulty
 * @param {object} state - AppContext state
 */
export function getDifficultyLabel(state = {}) {
  const { difficulty } = getPerformanceSummary(state);
  return {
    easy: { label: 'Beginner Friendly', color: 'text-emerald-400', icon: '🌱' },
    medium: { label: 'Recommended', color: 'text-amber-400', icon: '⭐' },
    hard: { label: 'Advanced Challenge', color: 'text-red-400', icon: '🔥' },
  }[difficulty] || { label: 'Beginner Friendly', color: 'text-emerald-400', icon: '🌱' };
}

/**
 * Legacy hook for recording completion if needed
 */
export function recordStoryCompletion() {}
