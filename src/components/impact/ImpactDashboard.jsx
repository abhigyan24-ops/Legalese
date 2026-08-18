/**
 * ImpactDashboard.jsx — 100% Real-Time Authentic Learning & Reach Analytics
 * 
 * Powered directly by live telemetry from Firebase Realtime Database:
 * - Real Registered Defenders count
 * - Real Quests Completed count
 * - Real Quiz Comprehension Accuracy from player submissions
 * - Real Language and Age Group distributions
 * - Real Total XP Accumulated across all players
 * - Zero hardcoded/mock data.
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { listenRealtimeImpactMetrics } from '../../firebase/firebase';
import sound from '../../lib/sound';
import ParticleBackground from '../ui/ParticleBackground';
import SmoothScroll from '../ui/SmoothScroll';

const STORY_INFO = {
  'right-to-education': {
    title: 'Right to Education',
    statute: 'Article 21-A & RTE Act 2009',
    icon: '🎒',
    color: 'from-amber-500/20 to-orange-500/20',
    borderColor: 'border-amber-500/40',
    textColor: 'text-[#FFB84D]',
  },
  'right-to-healthcare': {
    title: 'Right to Healthcare',
    statute: 'Article 21 & Mid-Day Meal Scheme',
    icon: '🏥',
    color: 'from-emerald-500/20 to-teal-500/20',
    borderColor: 'border-emerald-500/40',
    textColor: 'text-emerald-400',
  },
  'protection-from-child-labour': {
    title: 'Child Labour Prohibition',
    statute: 'CLPRA 1986 & 2016 Amendment',
    icon: '🏭',
    color: 'from-blue-500/20 to-cyan-500/20',
    borderColor: 'border-blue-500/40',
    textColor: 'text-sky-400',
  },
  'protection-from-abuse': {
    title: 'Protection from Abuse',
    statute: 'POCSO Act 2012 & JJ Act 2015',
    icon: '🛡️',
    color: 'from-purple-500/20 to-pink-500/20',
    borderColor: 'border-purple-500/40',
    textColor: 'text-purple-300',
  },
  'protection-from-child-marriage': {
    title: 'Child Marriage Prohibition',
    statute: 'PCMA 2006 (Section 3 & 13)',
    icon: '📜',
    color: 'from-rose-500/20 to-orange-500/20',
    borderColor: 'border-rose-500/40',
    textColor: 'text-rose-400',
  },
};

export default function ImpactDashboard() {
  const [metrics, setMetrics] = useState({
    totalUsers: 0,
    totalXP: 0,
    totalCompletions: 0,
    totalQuizQuestions: 0,
    totalQuizCorrect: 0,
    overallQuizAccuracy: null,
    totalAchievementsEarned: 0,
    storyStats: {
      'right-to-education': { completions: 0, quizCorrect: 0, quizTotal: 0 },
      'right-to-healthcare': { completions: 0, quizCorrect: 0, quizTotal: 0 },
      'protection-from-child-labour': { completions: 0, quizCorrect: 0, quizTotal: 0 },
      'protection-from-abuse': { completions: 0, quizCorrect: 0, quizTotal: 0 },
      'protection-from-child-marriage': { completions: 0, quizCorrect: 0, quizTotal: 0 },
    },
    langCounts: { en: 0, hi: 0, kn: 0 },
    ageCounts: { '8-11': 0, '12-16': 0 },
  });

  const [selectedStoryId, setSelectedStoryId] = useState('all');

  useEffect(() => {
    const unsubscribe = listenRealtimeImpactMetrics((liveData) => {
      if (liveData) {
        setMetrics(liveData);
      }
    });
    return () => unsubscribe();
  }, []);

  const totalLanguages = (metrics.langCounts.en || 0) + (metrics.langCounts.hi || 0) + (metrics.langCounts.kn || 0) || 1;
  const totalAges = (metrics.ageCounts['8-11'] || 0) + (metrics.ageCounts['12-16'] || 0) || 1;

  // Export Real Data CSV
  const handleExportCSV = () => {
    sound.win();
    const rows = [
      ['Metric', 'Real Database Value'],
      ['Total Registered Defenders', metrics.totalUsers],
      ['Total Quests Completed', metrics.totalCompletions],
      ['Total XP Earned Across Platform', metrics.totalXP],
      ['Total Quiz Questions Answered', metrics.totalQuizQuestions],
      ['Overall Quiz Accuracy', metrics.overallQuizAccuracy !== null ? `${metrics.overallQuizAccuracy}%` : 'N/A'],
      ['Total Achievements Unlocked', metrics.totalAchievementsEarned],
      ['Language - English', metrics.langCounts.en || 0],
      ['Language - Hindi', metrics.langCounts.hi || 0],
      ['Language - Kannada', metrics.langCounts.kn || 0],
      ['Age Group 8-11', metrics.ageCounts['8-11'] || 0],
      ['Age Group 12-16', metrics.ageCounts['12-16'] || 0],
      [],
      ['Story Breakdown', 'Completions', 'Quiz Correct', 'Quiz Total'],
      ...Object.entries(metrics.storyStats).map(([sId, stats]) => [
        STORY_INFO[sId]?.title || sId,
        stats.completions,
        stats.quizCorrect,
        stats.quizTotal,
      ]),
    ];

    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map((e) => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Legalese_Live_Realtime_Impact_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-[#161226] text-[#FFF8F0] font-body select-none py-8 px-4 sm:px-8 relative overflow-hidden">
        <ParticleBackground count={22} />

        <div className="max-w-6xl mx-auto flex flex-col gap-8 relative z-10">
          {/* ── HEADER ── */}
          <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#312756]">
            <div className="flex items-center gap-3">
              <Link
                to="/"
                onClick={() => sound.click()}
                className="p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-bold text-white transition-all shadow"
              >
                ← Back to Home
              </Link>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">📊</span>
                  <h1 className="text-xl sm:text-3xl font-extrabold font-display bg-gradient-to-r from-[#FFB84D] via-[#FFE5B4] to-white bg-clip-text text-transparent">
                    Live Real-Time Impact Dashboard
                  </h1>
                </div>
                <p className="text-xs sm:text-sm text-[#B8B0D6] mt-0.5">
                  100% authentic aggregated learning telemetry streaming directly from active user accounts
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleExportCSV}
                className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-bold text-white transition-all shadow flex items-center gap-1.5"
                title="Download verified live telemetry as CSV"
              >
                <span>📥</span>
                <span>Export Real CSV</span>
              </button>
              <Link
                to="/map"
                onClick={() => sound.click()}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#FFB84D] to-[#FFE5B4] text-black font-extrabold text-xs shadow-lg hover:scale-105 transition-all"
              >
                🗺️ Rights Trail
              </Link>
            </div>
          </header>

          {/* ── LIVE DATABASE STREAM STATUS ── */}
          <div className="p-4 rounded-3xl bg-[#231C3D] border-2 border-[#312756] text-xs text-[#FFE5B4] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 flex items-center justify-center text-xl flex-shrink-0">
                ⚡
              </div>
              <div>
                <strong className="block text-sm font-bold text-white">
                  Real-Time Database Telemetry (Zero Mock Data)
                </strong>
                <span className="text-white/70 text-xs leading-relaxed">
                  Every metric on this dashboard is aggregated live from registered child defenders across India in compliance with the DPDP Act 2023.
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 self-start sm:self-auto px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[11px] font-bold border border-emerald-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Live Stream Active</span>
            </div>
          </div>

          {/* ── KEY HERO METRICS (4 TILES) ── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-3xl bg-[#231C3D] border border-[#312756] shadow-xl flex flex-col gap-1.5">
              <span className="text-xs uppercase font-extrabold text-[#B8B0D6] tracking-wider">
                Total Defenders
              </span>
              <span className="text-2xl sm:text-4xl font-extrabold font-display text-[#FFB84D]">
                {metrics.totalUsers}
              </span>
              <span className="text-[11px] text-white/50 font-medium">
                Active unique accounts
              </span>
            </div>

            <div className="p-5 rounded-3xl bg-[#231C3D] border border-[#312756] shadow-xl flex flex-col gap-1.5">
              <span className="text-xs uppercase font-extrabold text-[#B8B0D6] tracking-wider">
                Quests Completed
              </span>
              <span className="text-2xl sm:text-4xl font-extrabold font-display text-emerald-400">
                {metrics.totalCompletions}
              </span>
              <span className="text-[11px] text-white/50 font-medium">
                Stories conquered
              </span>
            </div>

            <div className="p-5 rounded-3xl bg-[#231C3D] border border-[#312756] shadow-xl flex flex-col gap-1.5">
              <span className="text-xs uppercase font-extrabold text-[#B8B0D6] tracking-wider">
                Quiz Accuracy
              </span>
              <span className="text-2xl sm:text-4xl font-extrabold font-display text-sky-400">
                {metrics.overallQuizAccuracy !== null ? `${metrics.overallQuizAccuracy}%` : '—'}
              </span>
              <span className="text-[11px] text-white/50 font-medium">
                {metrics.totalQuizCorrect} of {metrics.totalQuizQuestions} questions correct
              </span>
            </div>

            <div className="p-5 rounded-3xl bg-[#231C3D] border border-[#312756] shadow-xl flex flex-col gap-1.5">
              <span className="text-xs uppercase font-extrabold text-[#B8B0D6] tracking-wider">
                Total XP Earned
              </span>
              <span className="text-2xl sm:text-4xl font-extrabold font-display text-purple-300">
                {metrics.totalXP.toLocaleString()}
              </span>
              <span className="text-[11px] text-white/50 font-medium">
                {metrics.totalAchievementsEarned} achievements unlocked
              </span>
            </div>
          </div>

          {/* ── TOPIC FILTER BUTTONS ── */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => {
                sound.click();
                setSelectedStoryId('all');
              }}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all shadow whitespace-nowrap ${
                selectedStoryId === 'all'
                  ? 'bg-[#FFB84D] text-black font-extrabold shadow-lg'
                  : 'bg-[#231C3D] text-[#B8B0D6] hover:text-white border border-[#312756]'
              }`}
            >
              🌟 All Constitutional Stories
            </button>

            {Object.entries(STORY_INFO).map(([id, item]) => (
              <button
                key={id}
                onClick={() => {
                  sound.click();
                  setSelectedStoryId(id);
                }}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all shadow flex items-center gap-1.5 whitespace-nowrap ${
                  selectedStoryId === id
                    ? 'bg-[#FFB84D] text-black font-extrabold shadow-lg'
                    : 'bg-[#231C3D] text-[#B8B0D6] hover:text-white border border-[#312756]'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.title}</span>
              </button>
            ))}
          </div>

          {/* ── REAL STORY BREAKDOWN ── */}
          {selectedStoryId !== 'all' && STORY_INFO[selectedStoryId] ? (
            <motion.div
              key={selectedStoryId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 sm:p-8 rounded-3xl bg-[#231C3D] border-2 border-[#312756] shadow-2xl flex flex-col gap-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{STORY_INFO[selectedStoryId].icon}</span>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-extrabold font-display text-white">
                      {STORY_INFO[selectedStoryId].title}
                    </h3>
                    <span className={`text-xs font-mono font-bold ${STORY_INFO[selectedStoryId].textColor}`}>
                      {STORY_INFO[selectedStoryId].statute}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono">
                  <div className="text-center p-3 rounded-2xl bg-white/5 border border-white/10">
                    <span className="text-white/60 block text-[10px]">REAL COMPLETIONS</span>
                    <strong className="text-[#FFB84D] text-lg">
                      {metrics.storyStats[selectedStoryId]?.completions || 0}
                    </strong>
                  </div>
                  <div className="text-center p-3 rounded-2xl bg-white/5 border border-white/10">
                    <span className="text-white/60 block text-[10px]">QUIZ ACCURACY</span>
                    <strong className="text-emerald-400 text-lg">
                      {metrics.storyStats[selectedStoryId]?.quizTotal > 0
                        ? `${Math.round(
                            (metrics.storyStats[selectedStoryId].quizCorrect /
                              metrics.storyStats[selectedStoryId].quizTotal) *
                              100
                          )}%`
                        : '—'}
                    </strong>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-black/30 border border-white/10 text-xs text-white/70">
                {metrics.storyStats[selectedStoryId]?.completions > 0 ? (
                  <span>
                    🎉 <strong className="text-white">{metrics.storyStats[selectedStoryId].completions}</strong> children have completed this quest in the live database.
                  </span>
                ) : (
                  <span>
                    ⏳ No children have completed this quest yet. Play through <strong className="text-[#FFB84D]">{STORY_INFO[selectedStoryId].title}</strong> on the Rights Trail to record the first completion!
                  </span>
                )}
              </div>
            </motion.div>
          ) : (
            /* ── ALL 5 STORIES OVERVIEW TILES ── */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(STORY_INFO).map(([id, item]) => {
                const s = metrics.storyStats[id] || { completions: 0, quizCorrect: 0, quizTotal: 0 };
                const accuracy = s.quizTotal > 0 ? Math.round((s.quizCorrect / s.quizTotal) * 100) : null;

                return (
                  <div
                    key={id}
                    onClick={() => {
                      sound.click();
                      setSelectedStoryId(id);
                    }}
                    className="p-5 rounded-3xl bg-[#231C3D] border border-[#312756] hover:border-[#FFB84D]/60 cursor-pointer shadow-xl transition-all hover:scale-[1.02] flex flex-col justify-between gap-4 group"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="text-3xl">{item.icon}</span>
                        <div>
                          <h4 className="font-bold font-display text-sm text-white group-hover:text-[#FFB84D] transition-colors">
                            {item.title}
                          </h4>
                          <span className="text-[10px] font-mono text-white/50">{item.statute}</span>
                        </div>
                      </div>
                      <span className="text-xs text-[#FFB84D] group-hover:translate-x-1 transition-transform">→</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-white/10">
                      <div>
                        <span className="text-[10px] text-white/50 block">Real Completions</span>
                        <strong className="text-[#FFB84D] font-mono text-sm">{s.completions}</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-white/50 block">Quiz Accuracy</span>
                        <strong className="text-emerald-400 font-mono text-sm">
                          {accuracy !== null ? `${accuracy}%` : '—'}
                        </strong>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* ── TWO-COLUMN METRICS: LANGUAGE & AGE SPLIT (REAL DATA) ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Real Language Split */}
            <div className="p-6 rounded-3xl bg-[#231C3D] border-2 border-[#312756] shadow-xl flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🗣️</span>
                  <h3 className="font-display font-extrabold text-base text-white">
                    Live Language Distribution
                  </h3>
                </div>
                <span className="text-[11px] font-mono text-white/50">
                  {metrics.totalUsers} Active Profiles
                </span>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between text-xs">
                    <span>English</span>
                    <strong className="text-sky-300 font-mono">
                      {Math.round(((metrics.langCounts.en || 0) / totalLanguages) * 100)}% ({metrics.langCounts.en || 0})
                    </strong>
                  </div>
                  <div className="h-2 rounded-full bg-black/40 overflow-hidden">
                    <div
                      className="h-full bg-sky-400 rounded-full transition-all duration-500"
                      style={{ width: `${Math.round(((metrics.langCounts.en || 0) / totalLanguages) * 100)}%` }}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between text-xs">
                    <span>Hindi • हिन्दी</span>
                    <strong className="text-[#FFB84D] font-mono">
                      {Math.round(((metrics.langCounts.hi || 0) / totalLanguages) * 100)}% ({metrics.langCounts.hi || 0})
                    </strong>
                  </div>
                  <div className="h-2 rounded-full bg-black/40 overflow-hidden">
                    <div
                      className="h-full bg-[#FFB84D] rounded-full transition-all duration-500"
                      style={{ width: `${Math.round(((metrics.langCounts.hi || 0) / totalLanguages) * 100)}%` }}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between text-xs">
                    <span>Kannada • ಕನ್ನಡ</span>
                    <strong className="text-emerald-400 font-mono">
                      {Math.round(((metrics.langCounts.kn || 0) / totalLanguages) * 100)}% ({metrics.langCounts.kn || 0})
                    </strong>
                  </div>
                  <div className="h-2 rounded-full bg-black/40 overflow-hidden">
                    <div
                      className="h-full bg-emerald-400 rounded-full transition-all duration-500"
                      style={{ width: `${Math.round(((metrics.langCounts.kn || 0) / totalLanguages) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Real Age Demographics */}
            <div className="p-6 rounded-3xl bg-[#231C3D] border-2 border-[#312756] shadow-xl flex flex-col justify-between gap-6">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-xl">👥</span>
                  <h3 className="font-display font-extrabold text-base text-white">
                    Live Age Group Demographics
                  </h3>
                </div>

                <div className="p-4 rounded-2xl bg-black/30 border border-white/10 flex items-center justify-around text-center">
                  <div>
                    <span className="text-2xl block mb-1">🎒</span>
                    <span className="text-[11px] text-white/60 block">Ages 8–11 Yrs</span>
                    <strong className="text-[#FFB84D] text-lg font-display">
                      {Math.round(((metrics.ageCounts['8-11'] || 0) / totalAges) * 100)}%
                    </strong>
                    <span className="text-[10px] text-white/40 block">
                      ({metrics.ageCounts['8-11'] || 0} defenders)
                    </span>
                  </div>
                  <div className="w-[1px] h-12 bg-white/10" />
                  <div>
                    <span className="text-2xl block mb-1">⚖️</span>
                    <span className="text-[11px] text-white/60 block">Ages 12–16 Yrs</span>
                    <strong className="text-emerald-400 text-lg font-display">
                      {Math.round(((metrics.ageCounts['12-16'] || 0) / totalAges) * 100)}%
                    </strong>
                    <span className="text-[10px] text-white/40 block">
                      ({metrics.ageCounts['12-16'] || 0} defenders)
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-center text-[11px] text-white/40">
                Telemetry aggregates active local &amp; Google-synced explorer profiles.
              </div>
            </div>
          </div>
        </div>
      </div>
    </SmoothScroll>
  );
}
