/**
 * RightsMap.jsx — Interactive Rights Trail Map & Adaptive Learning Navigator
 * 
 * Features:
 * - Lenis Smooth Momentum Scrolling
 * - Framer Motion spring waypoints with celebratory unlock animations
 * - Playful lock micro-interactions on hover
 * - Adaptive learning recommendation nudges
 * - Top header with XP badge, Certificate link, Leaderboard & Helplines
 */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import CharacterAvatar from '../story-engine/CharacterAvatar';
import AchievementsModal from '../achievements/AchievementsModal';
import GoogleSignIn from '../auth/GoogleSignIn';
import { getActiveEvent } from '../../lib/seasonalEvents';
import { getDifficultyLabel, getPerformanceSummary } from '../../lib/adaptiveDifficulty';
import sound from '../../lib/sound';
import SmoothScroll from '../ui/SmoothScroll';
import ParticleBackground from '../ui/ParticleBackground';
import AnimatedButton from '../ui/AnimatedButton';

const STORIES = [
  {
    id: 'right-to-education',
    icon: '🎒',
    actTag: 'Article 21-A',
    color: 'from-amber-500 to-yellow-600',
    borderColor: 'border-amber-400',
    title: {
      en: "Meena's Right to Education",
      hi: 'मीना की शिक्षा का अधिकार',
      kn: 'ಮೀನಾಳ ಶಿಕ್ಷಣದ ಹಕ್ಕು',
    },
    desc: {
      en: 'Help Meena return to school when financial hardship threatens her future.',
      hi: 'मीना को स्कूल लौटने में मदद करें जब आर्थिक तंगी उसके भविष्य को खतरे में डालती है।',
      kn: 'ಮೀನಾಳ ಭವಿಷ್ಯಕ್ಕೆ ಆರ್ಥಿಕ ಸಂಕಷ್ಟ ಎದುರಾದಾಗ ಅವಳು ಶಾಲೆಗೆ ಮರಳಲು ಸಹಾಯ ಮಾಡಿ.',
    },
    length: '26 Nodes • 7 Endings',
  },
  {
    id: 'right-to-healthcare',
    icon: '🏥',
    actTag: 'Right to Health',
    color: 'from-cyan-500 to-blue-600',
    borderColor: 'border-cyan-400',
    title: {
      en: 'Right to Healthcare',
      hi: 'स्वास्थ्य का अधिकार',
      kn: 'ಆರೋಗ್ಯದ ಹಕ್ಕು',
    },
    desc: {
      en: 'Discover medical aid rights and immunization safeguards for every child.',
      hi: 'हर बच्चे के लिए चिकित्सा सहायता और टीकाकरण सुरक्षा के अधिकारों को जानें।',
      kn: 'ಪ್ರತಿಯೊಂದು ಮಗುವಿಗೂ ವೈದ್ಯಕೀಯ ಚಿಕಿತ್ಸೆ ಮತ್ತು ಲಸಿಕೆ ಹಕ್ಕುಗಳನ್ನು ಅನ್ವೇಷಿಸಿ.',
    },
    length: '22 Nodes • 5 Endings',
  },
  {
    id: 'protection-from-child-labour',
    icon: '🏭',
    actTag: 'Child Labour Act',
    color: 'from-orange-500 to-red-600',
    borderColor: 'border-orange-400',
    title: {
      en: 'Protection from Child Labour',
      hi: 'बाल श्रम से सुरक्षा',
      kn: 'ಬಾಲ ಕಾರ್ಮಿಕ ಪದ್ಧತಿಯಿಂದ ರಕ್ಷಣೆ',
    },
    desc: {
      en: 'Investigate unfair factory work and protect children’s right to play and learn.',
      hi: 'कारखाने के काम की जांच करें और बच्चों के खेलने और सीखने के अधिकार की रक्षा करें।',
      kn: 'ಅಕ್ರಮ ಕಾರ್ಖಾನೆ ಕೆಲಸವನ್ನು ತಡೆದು ಮಕ್ಕಳ ಕಲಿಕೆ ಮತ್ತು ಆಟದ ಹಕ್ಕನ್ನು ರಕ್ಷಿಸಿ.',
    },
    length: '22 Nodes • 5 Endings',
  },
  {
    id: 'protection-from-abuse',
    icon: '🛡️',
    actTag: 'POCSO Act 2012',
    color: 'from-rose-500 to-pink-600',
    borderColor: 'border-rose-400',
    title: {
      en: 'Protection from Abuse',
      hi: 'शोषण से सुरक्षा',
      kn: 'ದೌರ್ಜನ್ಯದಿಂದ ರಕ್ಷಣೆ',
    },
    desc: {
      en: 'Learn safe boundaries, trusted allies, and the 24/7 Childline 1098 lifeline.',
      hi: 'सुरक्षित सीमाएं, भरोसेमंद मददगार और 24/7 चाइल्डलाइन 1098 लाइफलाइन के बारे में जानें।',
      kn: 'ಸುರಕ್ಷಿತ ಗಡಿಗಳು, ವಿಶ್ವಾಸಾರ್ಹ ವ್ಯಕ್ತಿಗಳು ಮತ್ತು 1098 ಸಹಾಯವಾಣಿಯನ್ನು ತಿಳಿಯಿರಿ.',
    },
    length: '20 Nodes • 5 Endings',
  },
  {
    id: 'protection-from-child-marriage',
    icon: '📜',
    actTag: 'PCMA 2006',
    color: 'from-purple-500 to-indigo-600',
    borderColor: 'border-purple-400',
    title: {
      en: 'Protection from Child Marriage',
      hi: 'बाल विवाह से सुरक्षा',
      kn: 'ಬಾಲ್ಯ ವಿವಾಹದಿಂದ ರಕ್ಷಣೆ',
    },
    desc: {
      en: 'Stand up for education, career dreams, and the freedom to grow up first.',
      hi: 'शिक्षा, सपनों और पहले बड़े होने की आज़ादी के लिए आवाज़ उठाएं।',
      kn: 'ಶಿಕ್ಷಣ, ಕನಸುಗಳು ಮತ್ತು ಮುಕ್ತ ಭವಿಷ್ಯಕ್ಕಾಗಿ ಧ್ವನಿ ಎತ್ತಿ.',
    },
    length: '20 Nodes • 5 Endings',
  },
];

export default function RightsMap() {
  const navigate = useNavigate();
  const { state, dispatch } = useApp();
  const lang = state.language || 'en';
  const completed = new Set(state.completedStories || []);

  const [showAchievements, setShowAchievements] = useState(false);
  const [showGoogleModal, setShowGoogleModal] = useState(false);

  const activeEvent = getActiveEvent();
  const diffInfo = getDifficultyLabel();
  const perf = getPerformanceSummary();
  const unlockedAchievementsCount = (state.achievements || []).length;

  const isStoryUnlocked = (idx) => {
    if (idx === 0) return true;
    if (idx === 1) return true;
    if (idx === 2) return true;
    return completed.size >= 2;
  };

  const calculateLearningNudge = () => {
    if (completed.size === 0) {
      return {
        storyId: 'right-to-education',
        headline: '🌟 Start Your Journey with Meena',
        message: 'Master Article 21-A and help Meena secure her fundamental right to go to school.',
        icon: '🎒',
        type: 'intro',
      };
    }

    if (completed.size >= 5) {
      return {
        headline: '👑 Master Constitutional Defender!',
        message: 'You have conquered all 5 Rights Quests! Claim your official Rights Defender Keepsake Certificate.',
        icon: '🎓',
        type: 'champion',
      };
    }

    const nextUnplayed = STORIES.find((s) => !completed.has(s.id));
    if (nextUnplayed) {
      return {
        storyId: nextUnplayed.id,
        headline: `🎯 Next Suggested Quest: ${nextUnplayed.title[lang] || nextUnplayed.title.en}`,
        message: 'Expand your constitutional knowledge and unlock your next official Defender Badge.',
        icon: nextUnplayed.icon,
        type: 'next_level',
      };
    }
    return null;
  };

  const nudge = calculateLearningNudge();

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-[#161226] text-[#FFF8F0] font-body relative overflow-hidden select-none py-6 px-4 sm:px-8">
        <ParticleBackground count={20} />

        {/* ── ACHIEVEMENTS MODAL ── */}
        <AchievementsModal
          isOpen={showAchievements}
          onClose={() => setShowAchievements(false)}
        />

        {/* ── GOOGLE SYNC MODAL ── */}
        {showGoogleModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
            <div className="bg-[#161226] border-2 border-[#FFB84D]/40 rounded-3xl p-6 max-w-sm w-full shadow-2xl flex flex-col gap-4">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <h3 className="font-display font-extrabold text-lg text-white">
                  ☁️ Cloud Sync Account
                </h3>
                <button
                  onClick={() => setShowGoogleModal(false)}
                  className="text-white/60 hover:text-white text-sm"
                >
                  ✕
                </button>
              </div>
              <GoogleSignIn onSuccess={() => setShowGoogleModal(false)} />
            </div>
          </div>
        )}

        <div className="max-w-4xl mx-auto flex flex-col gap-6 relative z-10">
          {/* ── HEADER ── */}
          <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#312756]">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#231C3D] border-2 border-[#FFB84D]/60 flex items-center justify-center shadow-inner overflow-hidden flex-shrink-0">
                <CharacterAvatar
                  avatarId={state.currentUser?.avatar || 'boy-short-blue-medium'}
                  pose="standing"
                  mood="happy"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-display font-extrabold text-base sm:text-lg text-white">
                    {state.currentUser?.nickname || 'Hero Explorer'}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#231C3D] text-[11px] font-extrabold text-[#FFB84D] border border-[#FFB84D]/40">
                    {state.currentUser?.ageTier || '8-11'} Yrs
                  </span>
                </div>
                <div className="text-xs text-[#B8B0D6]">
                  Completed: <strong className="text-white">{completed.size}/5</strong> Quests
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {/* Trophies & Achievements Button */}
              <button
                type="button"
                onClick={() => {
                  sound.click();
                  setShowAchievements(true);
                }}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-[#F5B942]/40 text-xs font-bold text-[#FFE7A8] transition-all shadow"
              >
                <span>🏅</span>
                <span>Trophies ({unlockedAchievementsCount}/25)</span>
              </button>

              <Link
                to="/certificate"
                onClick={() => sound.click()}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-bold transition-all shadow ${
                  completed.size >= 5
                    ? 'bg-gradient-to-r from-amber-500/30 to-purple-500/30 border-[#F5B942] text-[#FFE7A8] animate-pulse'
                    : 'bg-white/10 hover:bg-white/20 border-white/15 text-white/80'
                }`}
              >
                <span>🎓</span>
                <span>{completed.size >= 5 ? 'Certificate ✓' : `Certificate (${completed.size}/5)`}</span>
              </Link>

              <Link
                to="/leaderboard"
                onClick={() => sound.click()}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-bold transition-all shadow"
              >
                <span>🏆</span>
                <span>Leaderboard</span>
              </Link>

              {/* Cloud Sync Button */}
              <button
                type="button"
                onClick={() => {
                  sound.click();
                  setShowGoogleModal(true);
                }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-bold text-white transition-all shadow"
                title="Link Google account for cross-device sync"
              >
                <span>{state.currentUser?.googleLinked ? '☁️ Synced' : '🔗 Sync'}</span>
              </button>

              {/* Language Switcher */}
              <div className="flex items-center bg-[#231C3D] border border-[#FFB84D]/40 rounded-xl p-0.5">
                {[
                  { id: 'en', label: 'EN' },
                  { id: 'hi', label: 'हि' },
                  { id: 'kn', label: 'ಕ' },
                ].map((l) => (
                  <button
                    key={l.id}
                    type="button"
                    onClick={() => {
                      sound.click();
                      dispatch({ type: 'UPDATE_LANGUAGE', payload: l.id });
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                      lang === l.id
                        ? 'bg-[#FFB84D] text-black font-extrabold shadow-sm'
                        : 'text-[#B8B0D6] hover:text-white'
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>

              {/* XP Badge */}
              <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#FFB84D] to-[#FFE5B4] text-black font-extrabold text-xs shadow-lg">
                <span>⚡</span>
                <span>{state.xp || 0} XP</span>
              </div>
            </div>
          </header>

          {/* ── SEASONAL EVENT BANNER ── */}
          {activeEvent ? (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`p-4 rounded-3xl bg-gradient-to-r ${activeEvent.bannerGradient} border-2 border-white/20 text-center font-extrabold text-sm flex items-center justify-between gap-3 shadow-xl ${activeEvent.textColor}`}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">{activeEvent.emoji}</span>
                <div className="text-left">
                  <div className="text-xs uppercase tracking-wider font-extrabold opacity-80">
                    Active National Event • {activeEvent.xpMultiplier}x XP Multiplier
                  </div>
                  <div className="text-base font-display font-black">{activeEvent.name}</div>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-black/20 text-xs font-bold uppercase tracking-wider">
                Active Now
              </span>
            </motion.div>
          ) : (
            <div className="p-3.5 rounded-2xl bg-[#231C3D] border border-[#312756] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-lg">🗓️</span>
                <span className="text-white/70">Next National Quest:</span>
                <span className="text-[#FFB84D] font-bold">Children's Day (Nov 14) &amp; Constitution Day (Nov 26) • Bonus XP</span>
              </div>
              <span className="self-start sm:self-auto px-2 py-0.5 rounded bg-white/5 text-[10px] font-mono text-[#FFB84D]">
                Seasonal Mode Ready
              </span>
            </div>
          )}

          {/* ── ADAPTIVE DIFFICULTY & LEARNING METRICS ── */}
          <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 rounded-2xl bg-[#1D1733] border border-[#312756] text-xs">
            <div className="flex items-center gap-2">
              <span className="text-base">{diffInfo.icon}</span>
              <span className="text-white/60">Adaptive Learning Level:</span>
              <span className={`font-extrabold font-mono px-2 py-0.5 rounded bg-white/5 ${diffInfo.color}`}>
                {diffInfo.label}
              </span>
            </div>
            <div className="flex items-center gap-3 text-white/50">
              <span>Quiz Accuracy: <strong className="text-white">{perf.quizAccuracy}%</strong></span>
              <span>•</span>
              <span>Stories: <strong className="text-[#FFB84D]">{perf.storiesCompleted}</strong></span>
              <span>•</span>
              <span>Avg Hearts Kept: <strong className="text-emerald-400">{Math.max(0, 3 - parseFloat(perf.avgHeartsLost || 0)).toFixed(1)}/3</strong></span>
            </div>
          </div>


          {/* ── 5-STORY COMPLETION BANNER ── */}
          {completed.size >= 5 && (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-5 rounded-3xl bg-gradient-to-r from-[#1D3C2C] via-[#25493A] to-[#1D3C2C] border-2 border-[#F5B942] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xl"
            >
              <div className="flex items-center gap-4 text-center sm:text-left">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-[#F5B942] flex items-center justify-center text-3xl shadow-inner flex-shrink-0">
                  🎓
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-display font-extrabold text-[#FFE7A8]">
                    All 5 Constitutional Rights Mastered!
                  </h3>
                  <p className="text-xs text-[#FBF3E3]/80 mt-0.5">
                    You have completed the entire Living Constitutional Trail. Claim and download your official
                    Rights Defender Keepsake Certificate!
                  </p>
                </div>
              </div>
              <Link to="/certificate">
                <AnimatedButton variant="primary" size="md" icon="🎓">
                  Claim Certificate →
                </AnimatedButton>
              </Link>
            </motion.div>
          )}

          {/* ── ADAPTIVE NUDGE BANNER ── */}
          {nudge && (
            <div
              className={`p-4 sm:p-5 rounded-3xl border-2 transition-all flex items-start justify-between gap-4 shadow-xl backdrop-blur-md ${
                nudge.type === 'champion'
                  ? 'bg-purple-950/30 border-purple-400/50'
                  : 'bg-[#1D3C2C] border-[#F5B942]/60'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <span className="text-2xl sm:text-3xl mt-0.5">{nudge.icon}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-display font-extrabold text-sm sm:text-base text-white">
                      {nudge.headline}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-white/10 text-[10px] font-mono text-[#F5B942] uppercase font-bold">
                      Learning Guide
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-white/80 mt-1 max-w-xl leading-relaxed">
                    {nudge.message}
                  </p>
                </div>
              </div>

              {nudge.storyId && (
                <AnimatedButton
                  variant="gold"
                  size="sm"
                  onClick={() => navigate(`/story/${nudge.storyId}`)}
                  className="self-center flex-shrink-0"
                >
                  Go →
                </AnimatedButton>
              )}
            </div>
          )}

          {/* ── TRAIL BANNER ── */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-500/20 via-[#25493A]/50 to-purple-900/30 border border-white/15 p-6 sm:p-8 backdrop-blur-md shadow-2xl">
            <div className="relative z-10 max-w-xl">
              <span className="px-3 py-1 rounded-full bg-[#F5B942]/20 border border-[#F5B942]/40 text-[#F5B942] text-xs font-extrabold uppercase tracking-wider">
                Interactive Story Quests
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold font-display text-white mt-3 leading-tight">
                The Rights Trail
              </h1>
              <p className="text-xs sm:text-sm text-white/75 mt-2 leading-relaxed font-normal">
                Travel across 5 illustrated interactive stories. Make courageous choices, invoke constitutional
                articles, and defend children’s legal rights.
              </p>
            </div>
          </div>

          {/* ── STORY QUESTS LIST ── */}
          <div className="space-y-4 relative" role="list" aria-label="Constitutional Rights Story Trail">
            {STORIES.map((quest, idx) => {
              const isUnlocked = isStoryUnlocked(idx);
              const isCompleted = completed.has(quest.id);
              const isRecommended = nudge?.storyId === quest.id;
              const title = quest.title[lang] || quest.title.en;
              const desc = quest.desc[lang] || quest.desc.en;

              return (
                <motion.div
                  key={quest.id}
                  role="listitem"
                  whileHover={isUnlocked ? { y: -2 } : {}}
                  className={`relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 sm:p-6 rounded-3xl border transition-all duration-300 ${
                    isRecommended
                      ? 'bg-amber-500/15 border-2 border-[#FFB84D] shadow-2xl'
                      : isCompleted
                      ? 'bg-emerald-950/30 border-emerald-500/40 hover:border-emerald-400 shadow-md'
                      : isUnlocked
                      ? 'bg-[#231C3D] hover:bg-[#2F264F] border-[#312756] hover:border-[#FFB84D]/50 shadow-lg'
                      : 'bg-white/[0.03] border-white/10 opacity-65 group hover:animate-shakeSoft'
                  }`}
                >
                  {/* Left Info */}
                  <div className="flex items-start sm:items-center gap-4">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 shadow-inner transition-transform ${
                        isCompleted
                          ? 'bg-emerald-500 text-black font-extrabold'
                          : isUnlocked
                          ? `bg-gradient-to-br ${quest.color} text-white shadow-lg`
                          : 'bg-white/10 text-white/40'
                      }`}
                    >
                      {isCompleted ? '✓' : isUnlocked ? quest.icon : '🔒'}
                    </div>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-white/10 text-[#F5B942]">
                          {quest.actTag}
                        </span>
                        {isCompleted && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                            COMPLETED
                          </span>
                        )}
                        {isRecommended && (
                          <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-amber-500 text-black animate-pulse">
                            RECOMMENDED NEXT
                          </span>
                        )}
                        <span className="text-xs text-white/40">{quest.length}</span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold font-display text-white mt-1">
                        {title}
                      </h3>
                      <p className="text-xs sm:text-sm text-white/70 mt-1 max-w-lg leading-relaxed">
                        {desc}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="self-end sm:self-center flex-shrink-0 flex items-center gap-2">
                    <Link
                      to={`/community/${quest.id}`}
                      onClick={() => sound.click()}
                      title="View Community Reflections & Q&A"
                      className="p-2.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-xs font-bold text-white transition-all"
                    >
                      💬 Q&amp;A
                    </Link>

                    {isUnlocked ? (
                      <AnimatedButton
                        variant={isCompleted ? 'secondary' : 'primary'}
                        size="sm"
                        onClick={() => navigate(`/story/${quest.id}`)}
                      >
                        {isCompleted ? '🔄 Replay' : '▶ Start Story'}
                      </AnimatedButton>
                    ) : (
                      <div className="text-xs font-semibold text-white/40 px-4 py-2 rounded-xl bg-white/5 border border-white/10 flex items-center gap-1.5 select-none">
                        <span>🔒</span>
                        <span>Complete 2 stories</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </SmoothScroll>
  );
}
