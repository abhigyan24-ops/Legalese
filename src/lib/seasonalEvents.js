/**
 * seasonalEvents.js — Seasonal & National Day Events
 *
 * When an active event is detected:
 * - XP multiplier applied to all story completions
 * - Special event badge earned
 * - Animated banner shown on the Rights Map
 */

export const SEASONAL_EVENTS = [
  {
    id: 'republic_day',
    name: 'Republic Day Quest',
    emoji: '🇮🇳',
    description: 'Celebrate India\'s Constitution on Republic Day! 2x XP all day.',
    startMonth: 0, startDay: 26, // Jan 26
    endMonth: 0, endDay: 26,
    xpMultiplier: 2.0,
    badgeId: 'republic_day_hero',
    bannerGradient: 'from-orange-600 via-white to-green-700',
    textColor: 'text-orange-900',
  },
  {
    id: 'childrens_day',
    name: "Children's Day Challenge",
    emoji: '🎈',
    description: 'Happy Children\'s Day! Every story earns bonus XP today.',
    startMonth: 10, startDay: 14, // Nov 14
    endMonth: 10, endDay: 14,
    xpMultiplier: 1.75,
    badgeId: 'childrens_day_defender',
    bannerGradient: 'from-purple-600 via-pink-500 to-yellow-400',
    textColor: 'text-white',
  },
  {
    id: 'constitution_day',
    name: 'Constitution Day Special',
    emoji: '📜',
    description: 'Constitution Day! India adopted its Constitution on Nov 26, 1949. 1.5x XP!',
    startMonth: 10, startDay: 26, // Nov 26
    endMonth: 10, endDay: 26,
    xpMultiplier: 1.5,
    badgeId: 'constitution_day_hero',
    bannerGradient: 'from-blue-800 via-blue-600 to-amber-400',
    textColor: 'text-white',
  },
  {
    id: 'rte_day',
    name: 'Right to Education Day',
    emoji: '📚',
    description: 'RTE Act anniversary! The right to education became fundamental law on April 1, 2010.',
    startMonth: 3, startDay: 1, // Apr 1
    endMonth: 3, endDay: 1,
    xpMultiplier: 1.5,
    badgeId: 'rte_champion',
    bannerGradient: 'from-emerald-700 via-teal-600 to-cyan-500',
    textColor: 'text-white',
  },
];

/**
 * Returns the currently active seasonal event, or null if none.
 */
export function getActiveEvent() {
  const now = new Date();
  const month = now.getMonth();
  const day = now.getDate();
  return SEASONAL_EVENTS.find((e) => {
    if (e.startMonth === e.endMonth) {
      return month === e.startMonth && day >= e.startDay && day <= e.endDay;
    }
    // Multi-month events
    if (month === e.startMonth) return day >= e.startDay;
    if (month === e.endMonth) return day <= e.endDay;
    return month > e.startMonth && month < e.endMonth;
  }) || null;
}

/**
 * Apply the active event XP multiplier to a base XP value.
 */
export function applyEventMultiplier(baseXp) {
  const event = getActiveEvent();
  if (!event) return baseXp;
  return Math.round(baseXp * event.xpMultiplier);
}
