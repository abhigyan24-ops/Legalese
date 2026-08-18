/**
 * adaptiveDifficulty.js — Adaptive Learning Engine
 *
 * Tracks user performance metrics across sessions and recommends
 * difficulty level for story/quiz content.
 */

const STORAGE_KEY = 'rq_adaptive_metrics';

const defaultMetrics = {
  totalStoriesCompleted: 0,
  totalQuizAttempts: 0,
  totalCorrectAnswers: 0,
  totalQuestions: 0,
  heartsLostTotal: 0,
  storyRunsTotal: 0,
  avgResponseTimeSecs: 0,
  sessionCount: 0,
};

export function loadMetrics() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...defaultMetrics, ...JSON.parse(raw) } : { ...defaultMetrics };
  } catch {
    return { ...defaultMetrics };
  }
}

function saveMetrics(metrics) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(metrics));
  } catch {}
}

/**
 * Record a story completion event
 */
export function recordStoryCompletion({ heartsLost = 0, quizCorrect = 0, quizTotal = 0 }) {
  const m = loadMetrics();
  m.totalStoriesCompleted += 1;
  m.storyRunsTotal += 1;
  m.heartsLostTotal += heartsLost;
  m.totalQuizAttempts += 1;
  m.totalCorrectAnswers += quizCorrect;
  m.totalQuestions += quizTotal;
  saveMetrics(m);
}

/**
 * Returns recommended difficulty: 'easy' | 'medium' | 'hard'
 */
export function getRecommendedDifficulty() {
  const m = loadMetrics();
  if (m.totalStoriesCompleted < 2) return 'easy';

  const quizAccuracy = m.totalQuestions > 0
    ? m.totalCorrectAnswers / m.totalQuestions
    : 0.5;

  const heartLossRate = m.storyRunsTotal > 0
    ? m.heartsLostTotal / m.storyRunsTotal
    : 0;

  if (quizAccuracy >= 0.85 && heartLossRate < 0.5) return 'hard';
  if (quizAccuracy >= 0.6 && heartLossRate < 1.5) return 'medium';
  return 'easy';
}

/**
 * Returns a user-facing label for the recommended difficulty
 */
export function getDifficultyLabel() {
  const d = getRecommendedDifficulty();
  return {
    easy: { label: 'Beginner Friendly', color: 'text-emerald-400', icon: '🌱' },
    medium: { label: 'Recommended', color: 'text-amber-400', icon: '⭐' },
    hard: { label: 'Advanced Challenge', color: 'text-red-400', icon: '🔥' },
  }[d];
}

/**
 * Returns performance summary stats
 */
export function getPerformanceSummary() {
  const m = loadMetrics();
  return {
    storiesCompleted: m.totalStoriesCompleted,
    quizAccuracy: m.totalQuestions > 0
      ? Math.round((m.totalCorrectAnswers / m.totalQuestions) * 100)
      : 0,
    avgHeartsLost: m.storyRunsTotal > 0
      ? (m.heartsLostTotal / m.storyRunsTotal).toFixed(1)
      : 0,
    difficulty: getRecommendedDifficulty(),
  };
}
