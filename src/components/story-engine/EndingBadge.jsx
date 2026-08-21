/**
 * EndingBadge.jsx
 * 
 * Badge reveal animation for story endings.
 * Per spec Section 10: Scale-in with overshoot easing, confetti ONLY on outcome: "strong".
 * 
 * Props:
 * - badge: string - badge name
 * - badgeIcon: string - emoji icon
 * - outcome: string - "strong", "medium", "medium-low", "weak"
 * - bonusXp: number - XP earned
 */

import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';

export default function EndingBadge({ badge, badgeIcon, outcome, bonusXp }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger scale-in animation
    const timer = setTimeout(() => setIsVisible(true), 300);

    // Confetti ONLY for strong outcomes
    if (outcome === 'strong') {
      const confettiTimer = setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3', '#F38181'],
        });
      }, 800);

      return () => {
        clearTimeout(timer);
        clearTimeout(confettiTimer);
      };
    }

    return () => clearTimeout(timer);
  }, [outcome]);

  const outcomeColors = {
    strong: 'from-yellow-400 to-orange-500',
    medium: 'from-blue-400 to-cyan-500',
    'medium-low': 'from-gray-400 to-gray-500',
    weak: 'from-gray-300 to-gray-400',
  };

  const outcomeLabels = {
    strong: 'Outstanding!',
    medium: 'Well Done!',
    'medium-low': 'Good Effort',
    weak: 'Keep Learning',
  };

  const badgeName = typeof badge === 'object' ? (badge?.name || badge?.badgeName || 'Rights Champion') : (badge || 'Rights Champion');
  const icon = badgeIcon || (typeof badge === 'object' ? badge?.icon : null) || '🎓';

  return (
    <div className="flex flex-col items-center gap-6 py-8">
      {/* Badge container with scale-in animation */}
      <div
        className={`transform transition-all duration-500 ${
          isVisible ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
        }`}
        style={{
          transitionTimingFunction: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)', // Overshoot easing
        }}
      >
        <div
          className={`relative bg-gradient-to-br ${
            outcomeColors[outcome] || outcomeColors.weak
          } p-8 rounded-full shadow-2xl`}
        >
          {/* Badge icon */}
          <div className="text-6xl">{icon}</div>

          {/* Outcome ring (strong only) */}
          {outcome === 'strong' && (
            <div className="absolute inset-0 rounded-full border-4 border-yellow-300 animate-ping opacity-75" />
          )}
        </div>
      </div>

      {/* Badge details */}
      <div
        className={`text-center transform transition-all duration-700 delay-300 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}
      >
        <h2 className="text-3xl font-display font-bold text-[#F5B942] mb-2">
          {outcomeLabels[outcome] || outcomeLabels.strong}
        </h2>
        <h3 className="text-2xl font-display text-white mb-4">
          {badgeName}
        </h3>
        <div className="inline-block bg-[#F5B942]/20 border border-[#F5B942]/40 px-6 py-2 rounded-full">
          <span className="text-xl font-bold text-[#FFE7A8]">
            +{bonusXp} XP
          </span>
        </div>
      </div>
    </div>
  );
}
