/**
 * achievements.js — Achievement System for Rights Quest
 *
 * Defines all 25 achievements and provides a checker function
 * that evaluates player state after each story/quiz completion.
 */

export const ACHIEVEMENTS = [
  // ── Story Completion ──
  {
    id: 'first_defender',
    title: 'First Defender',
    description: 'Complete your first story on the Rights Trail',
    icon: '🛡️',
    rarity: 'common',
    check: (state) => (state.completedStories || []).length >= 1,
  },
  {
    id: 'triple_threat',
    title: 'Triple Threat',
    description: 'Complete 3 different stories',
    icon: '⚔️',
    rarity: 'uncommon',
    check: (state) => (state.completedStories || []).length >= 3,
  },
  {
    id: 'rights_champion',
    title: 'Rights Champion',
    description: 'Complete all 5 stories on the Rights Trail',
    icon: '🏆',
    rarity: 'legendary',
    check: (state) => (state.completedStories || []).length >= 5,
  },

  // ── XP Milestones ──
  {
    id: 'xp_100',
    title: 'Rising Star',
    description: 'Earn 100 XP total',
    icon: '⭐',
    rarity: 'common',
    check: (state) => (state.xp || 0) >= 100,
  },
  {
    id: 'xp_300',
    title: 'Knowledge Seeker',
    description: 'Earn 300 XP total',
    icon: '🌟',
    rarity: 'uncommon',
    check: (state) => (state.xp || 0) >= 300,
  },
  {
    id: 'xp_500',
    title: 'Legal Scholar',
    description: 'Earn 500 XP total',
    icon: '📚',
    rarity: 'rare',
    check: (state) => (state.xp || 0) >= 500,
  },
  {
    id: 'xp_1000',
    title: 'Constitution Master',
    description: 'Earn 1000 XP — you know your rights!',
    icon: '👑',
    rarity: 'legendary',
    check: (state) => (state.xp || 0) >= 1000,
  },

  // ── Quiz Performance ──
  {
    id: 'quiz_perfect',
    title: 'Perfect Score',
    description: 'Get 100% on any quiz',
    icon: '💯',
    rarity: 'rare',
    check: (state) => {
      const scores = state.quizScores || {};
      return Object.values(scores).some((s) => s?.percentage >= 100);
    },
  },
  {
    id: 'quiz_ace',
    title: 'Quiz Ace',
    description: 'Get 100% on 3 different quizzes',
    icon: '🎯',
    rarity: 'legendary',
    check: (state) => {
      const scores = state.quizScores || {};
      return Object.values(scores).filter((s) => s?.percentage >= 100).length >= 3;
    },
  },
  {
    id: 'quiz_pass_first',
    title: 'Sharp Mind',
    description: 'Pass a quiz with more than 80%',
    icon: '🧠',
    rarity: 'common',
    check: (state) => {
      const scores = state.quizScores || {};
      return Object.values(scores).some((s) => s?.percentage >= 80);
    },
  },

  // ── Badges ──
  {
    id: 'first_badge',
    title: 'Badge Hunter',
    description: 'Earn your first story completion badge',
    icon: '🥉',
    rarity: 'common',
    check: (state) => (state.badges || []).length >= 1,
  },
  {
    id: 'five_badges',
    title: 'Badge Collector',
    description: 'Earn 5 story badges',
    icon: '🥇',
    rarity: 'rare',
    check: (state) => (state.badges || []).length >= 5,
  },

  // ── Languages ──
  {
    id: 'hindi_learner',
    title: 'हिन्दी Defender',
    description: 'Play a story in Hindi',
    icon: '🇮🇳',
    rarity: 'uncommon',
    check: (state) => state.language === 'hi' && (state.completedStories || []).length >= 1,
  },
  {
    id: 'kannada_learner',
    title: 'ಕನ್ನಡ Defender',
    description: 'Play a story in Kannada',
    icon: '🌺',
    rarity: 'uncommon',
    check: (state) => state.language === 'kn' && (state.completedStories || []).length >= 1,
  },
  {
    id: 'polyglot',
    title: 'Polyglot Defender',
    description: 'Use 3 different languages in the app',
    icon: '🌍',
    rarity: 'rare',
    check: (state) => (state.languagesUsed || []).length >= 3,
  },

  // ── Community ──
  {
    id: 'first_reflection',
    title: 'Voice of a Defender',
    description: 'Post your first reflection on the Community Wall',
    icon: '💬',
    rarity: 'common',
    check: (state) => (state.reflectionCount || 0) >= 1,
  },
  {
    id: 'active_community',
    title: 'Community Pillar',
    description: 'Post 5 reflections across different stories',
    icon: '🤝',
    rarity: 'rare',
    check: (state) => (state.reflectionCount || 0) >= 5,
  },

  // ── Leaderboard ──
  {
    id: 'top_10',
    title: 'Top 10 Defender',
    description: 'Rank in the top 10 on the global leaderboard',
    icon: '📈',
    rarity: 'rare',
    check: (state) => (state.leaderboardRank || 999) <= 10,
  },

  // ── Special ──
  {
    id: 'story_replay',
    title: 'Second Chances',
    description: 'Replay a story to discover a new ending',
    icon: '🔄',
    rarity: 'uncommon',
    check: (state) => (state.replayCount || 0) >= 1,
  },
  {
    id: 'challenger',
    title: 'Challenge Accepted',
    description: 'Challenge a friend to beat your score',
    icon: '⚡',
    rarity: 'uncommon',
    check: (state) => (state.challengesSent || 0) >= 1,
  },
  {
    id: 'strong_ending',
    title: 'Strong Defender',
    description: 'Reach the "strong" outcome in any story',
    icon: '💪',
    rarity: 'uncommon',
    check: (state) => (state.strongOutcomes || 0) >= 1,
  },
  {
    id: 'no_hearts_lost',
    title: 'Iron Will',
    description: 'Complete a story without losing any hearts',
    icon: '❤️',
    rarity: 'rare',
    check: (state) => (state.perfectRuns || 0) >= 1,
  },
  {
    id: 'constitution_day',
    title: 'Constitution Day Hero',
    description: 'Play on Constitution Day (November 26)',
    icon: '🗓️',
    rarity: 'legendary',
    check: (state) => {
      const now = new Date();
      return now.getMonth() === 10 && now.getDate() === 26;
    },
  },
  {
    id: 'childrens_day',
    title: "Children's Day Defender",
    description: "Play on Children's Day (November 14)",
    icon: '🎈',
    rarity: 'rare',
    check: (state) => {
      const now = new Date();
      return now.getMonth() === 10 && now.getDate() === 14;
    },
  },
];

export const RARITY_COLORS = {
  common: 'from-slate-500 to-slate-600',
  uncommon: 'from-emerald-500 to-emerald-700',
  rare: 'from-blue-500 to-blue-700',
  legendary: 'from-amber-400 to-orange-600',
};

export const RARITY_GLOW = {
  common: 'shadow-slate-500/40',
  uncommon: 'shadow-emerald-500/50',
  rare: 'shadow-blue-500/60',
  legendary: 'shadow-amber-400/70',
};

/**
 * Check which achievements are newly unlocked given the current state.
 * @param {object} state - AppContext state
 * @param {string[]} alreadyEarned - IDs already in state.achievements
 * @returns {object[]} array of newly unlocked Achievement objects
 */
export function checkNewAchievements(state, alreadyEarned = []) {
  return ACHIEVEMENTS.filter(
    (a) => !alreadyEarned.includes(a.id) && a.check(state)
  );
}
