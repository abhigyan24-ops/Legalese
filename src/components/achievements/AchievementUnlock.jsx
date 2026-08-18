/**
 * AchievementUnlock.jsx
 *
 * Full-screen cinematic achievement unlock modal with particle burst,
 * rarity-based glow, and auto-dismiss after 4 seconds.
 */

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RARITY_COLORS, RARITY_GLOW } from '../../lib/achievements';
import confetti from 'canvas-confetti';

export default function AchievementUnlock({ achievement, onDismiss }) {
  useEffect(() => {
    if (!achievement) return;
    // Fire confetti burst for legendary/rare
    if (achievement.rarity === 'legendary') {
      confetti({ particleCount: 150, spread: 100, origin: { y: 0.5 }, colors: ['#F5B942', '#FFD700', '#FFF'] });
    } else if (achievement.rarity === 'rare') {
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.5 }, colors: ['#3b82f6', '#93c5fd', '#FFF'] });
    }
    // Auto-dismiss after 4s
    const t = setTimeout(onDismiss, 4000);
    return () => clearTimeout(t);
  }, [achievement, onDismiss]);

  if (!achievement) return null;

  const rarityBg = RARITY_COLORS[achievement.rarity] || RARITY_COLORS.common;
  const rarityGlow = RARITY_GLOW[achievement.rarity] || RARITY_GLOW.common;
  const rarityLabel = {
    common: 'Common',
    uncommon: 'Uncommon',
    rare: 'Rare',
    legendary: '✨ Legendary',
  }[achievement.rarity] || 'Common';

  return (
    <AnimatePresence>
      <motion.div
        key={achievement.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-sm"
        onClick={onDismiss}
      >
        <motion.div
          initial={{ scale: 0.5, y: 60, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 280, damping: 22 }}
          className={`relative flex flex-col items-center gap-5 p-8 rounded-3xl bg-gradient-to-br ${rarityBg} shadow-2xl ${rarityGlow} max-w-sm w-full mx-4 border border-white/20`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Shimmer overlay */}
          <div className="absolute inset-0 rounded-3xl bg-white/10 pointer-events-none overflow-hidden">
            <motion.div
              animate={{ x: ['−100%', '200%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 2 }}
              className="absolute inset-y-0 w-1/3 bg-white/20 skew-x-12"
            />
          </div>

          {/* Achievement unlocked label */}
          <div className="px-4 py-1 rounded-full bg-black/30 text-white text-xs font-bold uppercase tracking-widest">
            🏅 Achievement Unlocked!
          </div>

          {/* Icon */}
          <motion.div
            animate={{ scale: [1, 1.15, 1], rotate: [0, -5, 5, 0] }}
            transition={{ duration: 0.8, repeat: 2 }}
            className="text-7xl drop-shadow-xl"
          >
            {achievement.icon}
          </motion.div>

          {/* Info */}
          <div className="text-center flex flex-col gap-1">
            <h2 className="text-2xl font-extrabold text-white font-display">{achievement.title}</h2>
            <p className="text-sm text-white/80 leading-snug">{achievement.description}</p>
            <span className="mt-1 text-xs font-bold text-white/60 uppercase tracking-widest">{rarityLabel}</span>
          </div>

          {/* Dismiss hint */}
          <button
            onClick={onDismiss}
            className="mt-2 px-6 py-2 rounded-xl bg-black/30 text-white/80 text-sm font-semibold hover:bg-black/50 transition-all"
          >
            Awesome! 🎉
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
