/**
 * AchievementsModal.jsx — Interactive Achievements & Trophy Room
 *
 * Full showcase of all 25 achievements across categories:
 * - Story Quests
 * - XP Milestones
 * - Quiz Mastery
 * - Badges & Collection
 * - Languages & Community
 * - Special & National Events
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ACHIEVEMENTS, RARITY_COLORS, RARITY_GLOW } from '../../lib/achievements';
import { useApp } from '../../context/AppContext';
import sound from '../../lib/sound';

export default function AchievementsModal({ isOpen, onClose }) {
  const { state } = useApp();
  const [filter, setFilter] = useState('all'); // 'all' | 'unlocked' | 'locked'

  if (!isOpen) return null;

  const unlockedIds = new Set(state.achievements || []);
  const totalUnlocked = unlockedIds.size;
  const totalCount = ACHIEVEMENTS.length;
  const progressPercent = Math.round((totalUnlocked / totalCount) * 100);

  const filteredAchievements = ACHIEVEMENTS.filter((a) => {
    const isUnlocked = unlockedIds.has(a.id);
    if (filter === 'unlocked') return isUnlocked;
    if (filter === 'locked') return !isUnlocked;
    return true;
  });

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative bg-[#161226] border-2 border-[#FFB84D]/40 rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
        >
          {/* ── HEADER ── */}
          <div className="p-5 sm:p-6 bg-gradient-to-b from-[#231C3D] to-[#161226] border-b border-[#312756] flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🏅</span>
                <div>
                  <h2 className="text-xl sm:text-2xl font-display font-extrabold text-white">
                    Trophy Room &amp; Achievements
                  </h2>
                  <p className="text-xs text-[#B8B0D6]">
                    Unlock 25 constitutional badges, milestones, and secret honors
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  sound.click();
                  onClose();
                }}
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-white/70 hover:text-white flex items-center justify-center transition-all text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {/* Progress Bar */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-[#FFB84D]">
                  {totalUnlocked} of {totalCount} Unlocked
                </span>
                <span className="text-white/60">{progressPercent}% Completed</span>
              </div>
              <div className="w-full h-3 bg-black/40 rounded-full overflow-hidden border border-white/10 p-0.5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-amber-500 via-[#FFB84D] to-yellow-300 rounded-full shadow-lg"
                />
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-2">
              {[
                { id: 'all', label: `All (${totalCount})` },
                { id: 'unlocked', label: `Unlocked (${totalUnlocked})` },
                { id: 'locked', label: `Locked (${totalCount - totalUnlocked})` },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => {
                    sound.click();
                    setFilter(f.id);
                  }}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                    filter === f.id
                      ? 'bg-[#FFB84D] text-black font-extrabold shadow'
                      : 'bg-white/10 text-white/60 hover:bg-white/15'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* ── ACHIEVEMENTS GRID ── */}
          <div className="p-4 sm:p-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-3.5 custom-scrollbar">
            {filteredAchievements.map((item) => {
              const isUnlocked = unlockedIds.has(item.id);
              const rarityBg = RARITY_COLORS[item.rarity] || RARITY_COLORS.common;
              const rarityGlow = RARITY_GLOW[item.rarity] || RARITY_GLOW.common;

              return (
                <motion.div
                  key={item.id}
                  whileHover={{ scale: isUnlocked ? 1.02 : 1 }}
                  className={`p-3.5 rounded-2xl border transition-all flex items-start gap-3.5 ${
                    isUnlocked
                      ? `bg-gradient-to-br ${rarityBg} bg-opacity-30 border-white/20 shadow-lg ${rarityGlow}`
                      : 'bg-white/[0.03] border-white/10 opacity-55 grayscale'
                  }`}
                >
                  {/* Icon */}
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 shadow-inner ${
                      isUnlocked ? 'bg-black/30' : 'bg-black/50'
                    }`}
                  >
                    {isUnlocked ? item.icon : '🔒'}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="font-display font-extrabold text-sm text-white truncate">
                        {item.title}
                      </h4>
                      <span
                        className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md ${
                          item.rarity === 'legendary'
                            ? 'bg-amber-400/30 text-amber-300 border border-amber-400/40'
                            : item.rarity === 'rare'
                            ? 'bg-blue-400/30 text-blue-300 border border-blue-400/40'
                            : 'bg-white/10 text-white/60'
                        }`}
                      >
                        {item.rarity}
                      </span>
                    </div>
                    <p className="text-xs text-white/70 mt-1 leading-snug">
                      {item.description}
                    </p>
                    {isUnlocked && (
                      <div className="text-[10px] font-mono font-bold text-emerald-400 mt-1 flex items-center gap-1">
                        <span>✓ Unlocked</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* ── FOOTER ── */}
          <div className="p-4 bg-[#1b1530] border-t border-[#312756] flex items-center justify-between">
            <span className="text-xs text-white/50">
              💡 Play stories, pass quizzes &amp; interact with the community to unlock them all!
            </span>
            <button
              onClick={() => {
                sound.click();
                onClose();
              }}
              className="px-5 py-2 rounded-xl bg-[#FFB84D] text-black font-bold text-xs hover:bg-[#FFC97A] transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
