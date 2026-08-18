/**
 * ShareChallenge.jsx — Friend Challenge Share Card
 *
 * Shown after completing a story. Generates a shareable URL
 * with the player's score that challenges a friend to beat it.
 */

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ShareChallenge({ storyId, storyTitle, score, nickname }) {
  const [copied, setCopied] = useState(false);

  const challengeUrl = `${window.location.origin}/challenge?story=${storyId}&score=${score}&nick=${encodeURIComponent(nickname || 'A Defender')}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(challengeUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback for older browsers
      const el = document.createElement('textarea');
      el.value = challengeUrl;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Can you beat my score in ${storyTitle}?`,
          text: `I scored ${score} XP on "${storyTitle}" in the Rights Quest! Think you can do better? 🛡️`,
          url: challengeUrl,
        });
      } catch {}
    } else {
      handleCopy();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 rounded-2xl bg-gradient-to-br from-[#1a1035] to-[#0d1f0e] border border-[#F5B942]/30 flex flex-col gap-3"
    >
      {/* Header */}
      <div className="flex items-center gap-2">
        <span className="text-2xl">⚡</span>
        <div>
          <div className="text-sm font-extrabold text-[#F5B942]">Challenge a Friend!</div>
          <div className="text-xs text-white/50">Dare them to beat your score</div>
        </div>
      </div>

      {/* Score Card */}
      <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-black/30 border border-white/10">
        <div className="flex flex-col">
          <span className="text-xs text-white/50">Your Score</span>
          <span className="text-2xl font-black text-[#F5B942]">{score} XP</span>
        </div>
        <div className="text-right">
          <span className="text-xs text-white/50">Story</span>
          <div className="text-sm font-bold text-white max-w-[140px] truncate">{storyTitle}</div>
        </div>
      </div>

      {/* URL Preview */}
      <div className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-white/40 font-mono truncate">
        {challengeUrl}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleShare}
          className="flex-1 py-2.5 rounded-xl bg-[#F5B942] text-black font-bold text-sm hover:bg-[#FFD060] transition-colors"
        >
          {navigator.share ? '📤 Share Challenge' : '🔗 Copy Link'}
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleCopy}
          className={`px-4 py-2.5 rounded-xl font-bold text-sm transition-all ${
            copied
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
              : 'bg-white/10 text-white/70 hover:bg-white/20'
          }`}
        >
          {copied ? '✓ Copied!' : '📋'}
        </motion.button>
      </div>
    </motion.div>
  );
}
