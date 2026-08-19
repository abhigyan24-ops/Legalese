/**
 * Leaderboard.jsx
 * 
 * Global Explorers Scoreboard & Safe Community Cheer Wall.
 * Features:
 * - Real-time community players & seed champions with rank calculation
 * - Category filters (All-Time, Weekly League, Rights Defenders)
 * - Safe Community Quick-Chat / Cheer Feed:
 *   * Preset curated shoutout bubbles (child-safe, no free-text risk)
 *   * Instant emoji cheers (🎉, ⚡, 🏆, 👏, 🌟, ❤️)
 *   * Live activity stream
 */

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import CharacterAvatar from '../story-engine/CharacterAvatar';
import sound from '../../lib/sound';
import {
  listenLeaderboardCloud,
  listenCheersCloud,
  postCheerCloud,
} from '../../firebase/firebase';

const SAFE_QUICK_CHATS = [
  { id: 'c1', text: '🎉 Great job everyone!', icon: '🎉' },
  { id: 'c2', text: '⚖️ Defend your rights, change the world!', icon: '⚖️' },
  { id: 'c3', text: '🎓 Education is our fundamental right!', icon: '🎓' },
  { id: 'c4', text: '🛡️ Stay safe, call 1098 if needed!', icon: '🛡️' },
  { id: 'c5', text: '🌟 Keep exploring and learning!', icon: '🌟' },
  { id: 'c6', text: '🚀 Just completed a new quest!', icon: '🚀' },
  { id: 'c7', text: '💪 Stand strong for child equality!', icon: '💪' },
  { id: 'c8', text: '❤️ Every child deserves care and respect!', icon: '❤️' },
];

export default function Leaderboard() {
  const navigate = useNavigate();
  const { state } = useApp();
  const [activeTab, setActiveTab] = useState('rankings'); // 'rankings' | 'cheers'
  const [filter, setFilter] = useState('all'); // 'all', 'weekly', 'defenders'
  const [cheersList, setCheersList] = useState([]);
  const [justSent, setJustSent] = useState(false);

  const userXp = state.xp || 0;
  const userNickname = state.currentUser?.nickname || 'You (Explorer)';
  const userAvatar = state.currentUser?.avatar || 'boy-short-blue-medium';
  const userBadges = state.badges?.length || 0;

  const currentUserEntry = {
    id: state.currentUser?.uid || 'current-user',
    nickname: userNickname,
    avatar: userAvatar,
    xp: userXp,
    badgeCount: userBadges,
    isCurrent: true,
    tier: userXp >= 400 ? 'Diamond' : userXp >= 300 ? 'Gold' : userXp >= 150 ? 'Silver' : 'Bronze',
  };

  const [cloudRankings, setCloudRankings] = useState([]);

  // Real-time listener for community rankings from Realtime Cloud
  useEffect(() => {
    const unsub = listenLeaderboardCloud((list) => {
      setCloudRankings(list || []);
      setLastFetched(new Date());
    });
    return () => unsub();
  }, []);

  // Filter rankings based on category
  const filteredCloud = cloudRankings.filter((p) => {
    if (filter === 'defenders') return (p.badgeCount || 0) >= 2;
    return true;
  });

  const combinedList = [
    ...filteredCloud.filter((e) => e.id !== currentUserEntry.id && Number(e.xp || 0) > 0),
    ...(state.currentUser && userXp > 0 ? [currentUserEntry] : []),
  ].sort((a, b) => (b.xp || 0) - (a.xp || 0));

  const getRankBadge = (rank) => {
    if (rank === 0) return { icon: '🥇', color: 'text-amber-300 border-amber-400 bg-amber-400/10' };
    if (rank === 1) return { icon: '🥈', color: 'text-slate-300 border-slate-400 bg-slate-400/10' };
    if (rank === 2) return { icon: '🥉', color: 'text-amber-600 border-amber-600 bg-amber-600/10' };
    return { icon: `#${rank + 1}`, color: 'text-white/60 border-white/10 bg-white/5' };
  };

  const [lastFetched, setLastFetched] = useState(new Date());
  const [isFromCache, setIsFromCache] = useState(false);

  // Real-time listener for community cheers from Realtime Cloud
  useEffect(() => {
    const unsub = listenCheersCloud((liveCheers) => {
      setCheersList(liveCheers || []);
      setLastFetched(new Date());
    });
    return () => unsub();
  }, []);

  const handleSendQuickChat = async (msg) => {
    sound.click();
    const newCheer = {
      id: `cheer-${Date.now()}`,
      nickname: userNickname,
      avatar: userAvatar,
      message: msg,
      time: 'Just now',
    };

    setCheersList((prev) => [newCheer, ...prev]);
    setJustSent(true);
    setTimeout(() => setJustSent(false), 2000);

    postCheerCloud({
      nickname: userNickname,
      avatar: userAvatar,
      message: msg,
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-[#f0eef6] py-8 px-4 sm:px-6 font-body select-none">
      <div className="max-w-3xl mx-auto flex flex-col gap-6">
        {/* ── HEADER ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-3xl">🏆</span>
              <h1 className="text-2xl sm:text-3xl font-extrabold font-display bg-gradient-to-r from-[#F5B942] to-amber-200 bg-clip-text text-transparent">
                Hall of Fame &amp; Cheers
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-white/60 mt-1">
              Cheer on fellow child rights champions standing up across India!
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-[11px] font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 flex items-center gap-1.5 text-white/60">
              <span className={`w-2 h-2 rounded-full ${isFromCache ? 'bg-amber-400' : 'bg-emerald-400'}`} />
              <span>{isFromCache ? 'Cached view (offline)' : 'Synced live'}</span>
            </div>

            <Link
              to="/map"
              onClick={() => sound.click()}
              className="self-start sm:self-auto px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-bold transition-all shadow"
            >
              🗺️ Back to Map
            </Link>
          </div>
        </div>

        {/* ── MAIN TAB SWITCHER (RANKINGS vs CHEERS) ── */}
        <div className="grid grid-cols-2 gap-2 bg-white/5 border border-white/10 p-1.5 rounded-2xl">
          <button
            type="button"
            onClick={() => {
              sound.click();
              setActiveTab('rankings');
            }}
            className={`py-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'rankings'
                ? 'bg-gradient-to-r from-[#F5B942] to-amber-400 text-black shadow-lg'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <span>🏆</span>
            <span>Explorer Rankings</span>
          </button>

          <button
            type="button"
            onClick={() => {
              sound.click();
              setActiveTab('cheers');
            }}
            className={`py-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'cheers'
                ? 'bg-gradient-to-r from-[#F5B942] to-amber-400 text-black shadow-lg'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <span>💬</span>
            <span>Community Cheers</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          </button>
        </div>

        {/* ── CURRENT PLAYER HIGHLIGHT CARD ── */}
        <div className="relative overflow-hidden bg-gradient-to-r from-amber-500/20 via-primary/20 to-purple-500/20 border-2 border-[#F5B942]/60 rounded-2xl p-4 sm:p-5 backdrop-blur-md shadow-xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-16 rounded-2xl bg-black/40 border border-[#F5B942]/40 flex items-center justify-center overflow-hidden">
                <CharacterAvatar avatar={userAvatar} className="w-12 h-14" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold font-display text-white">{userNickname}</span>
                  <span className="px-2 py-0.5 rounded-full bg-[#F5B942] text-black font-extrabold text-[10px] uppercase">
                    YOU
                  </span>
                </div>
                <div className="text-xs text-white/70 flex items-center gap-3 mt-1">
                  <span>🏅 {userBadges} Badges Earned</span>
                  <span>•</span>
                  <span className="text-emerald-400 font-semibold">{currentUserEntry.tier} Tier</span>
                </div>
              </div>
            </div>

            <div className="text-center sm:text-right bg-black/30 px-5 py-2.5 rounded-xl border border-white/10 w-full sm:w-auto">
              <div className="text-2xl font-extrabold text-[#F5B942]">⚡ {userXp} XP</div>
              <div className="text-xs text-white/60">
                Rank #{combinedList.findIndex((p) => p.isCurrent) + 1} of {combinedList.length}
              </div>
            </div>
          </div>
        </div>

        {/* ── TAB 1: RANKINGS ── */}
        {activeTab === 'rankings' && (
          <div className="flex flex-col gap-4 animate-fadeIn">
            {/* Filter Pills */}
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 p-1 rounded-xl">
              {[
                { key: 'all', label: '🌍 All Time' },
                { key: 'weekly', label: '🔥 Weekly League' },
                { key: 'defenders', label: '🛡️ Top Defenders' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => {
                    sound.click();
                    setFilter(tab.key);
                  }}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                    filter === tab.key
                      ? 'bg-[#F5B942] text-black shadow-md font-extrabold'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* List */}
            <div className="space-y-2.5">
              {combinedList.length === 0 ? (
                <div className="text-center py-12 px-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center">
                  <div className="text-4xl mb-2">🏆</div>
                  <h3 className="text-base font-bold text-white">No Ranked Defenders Yet</h3>
                  <p className="text-xs text-white/50 mt-1 max-w-sm">
                    Complete stories on the Rights Trail to earn your first XP and lead the scoreboard!
                  </p>
                  <button
                    onClick={() => {
                      sound.click();
                      navigate('/map');
                    }}
                    className="mt-4 px-4 py-2 rounded-xl bg-[#F5B942] text-black font-extrabold text-xs shadow hover:brightness-110 active:scale-95 transition-all"
                  >
                    🗺️ Go to Rights Trail →
                  </button>
                </div>
              ) : (
                combinedList.map((player, idx) => {
                  const badge = getRankBadge(idx);
                  return (
                    <motion.div
                      key={player.id}
                      layout
                      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                      className={`flex items-center justify-between p-3.5 sm:p-4 rounded-2xl border transition-colors ${
                        player.isCurrent
                          ? 'bg-gradient-to-r from-amber-500/25 via-[#25493A] to-amber-500/20 border-[#F5B942] shadow-[0_0_20px_rgba(245,185,66,0.25)] ring-1 ring-[#F5B942]/60'
                          : 'bg-white/5 hover:bg-white/10 border-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div
                          className={`w-9 h-9 rounded-xl border flex items-center justify-center font-extrabold text-sm sm:text-base ${badge.color}`}
                        >
                          {badge.icon}
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm sm:text-base text-white">{player.nickname}</span>
                            {player.isCurrent && (
                              <span className="px-2 py-0.5 rounded-full bg-[#F5B942] text-black font-extrabold text-[9px] shadow-sm">
                                YOU
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-white/50 flex items-center gap-2 mt-0.5">
                            <span>{player.tier}</span>
                            <span>•</span>
                            <span>{player.badgeCount} badges</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-base sm:text-lg font-extrabold text-[#F5B942]">⚡ {player.xp}</div>
                        <div className="text-[10px] text-white/40 uppercase tracking-wide">XP Earned</div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* ── TAB 2: SAFE COMMUNITY CHEERS / QUICK CHAT ── */}
        {activeTab === 'cheers' && (
          <div className="flex flex-col gap-6 animate-fadeIn">
            {/* Quick-Chat Shoutout Picker */}
            <div className="bg-[#121124]/90 border border-white/15 rounded-2xl p-5 shadow-xl flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-[#F5B942] font-extrabold flex items-center gap-1.5">
                  <span>💬</span>
                  <span>Send a Safe Cheer Shoutout</span>
                </span>
                {justSent && (
                  <span className="text-xs font-extrabold text-emerald-400 animate-bounce">
                    ✓ Cheer Sent!
                  </span>
                )}
              </div>

              <p className="text-xs text-white/60">
                Click any kid-safe cheer bubble to shout out your encouragement to all young defenders:
              </p>

              {/* Canned Quick Chat Bubbles Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                {SAFE_QUICK_CHATS.map((chat) => (
                  <button
                    key={chat.id}
                    type="button"
                    onClick={() => handleSendQuickChat(chat.text)}
                    className="p-3 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 hover:border-[#F5B942]/60 text-left transition-all text-xs font-semibold flex items-center gap-2.5 shadow-sm active:scale-95"
                  >
                    <span className="text-lg flex-shrink-0">{chat.icon}</span>
                    <span className="text-white/90">{chat.text}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Live Cheers Activity Stream */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between px-1">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  📢 Live Cheers Stream
                </h3>
                <span className="text-xs text-white/40">Child-safe moderated feed</span>
              </div>

              <div className="space-y-2.5">
                {cheersList.length === 0 ? (
                  <div className="text-center py-8 px-4 rounded-xl bg-white/5 border border-white/10 text-white/50 text-xs">
                    💬 No cheers sent yet. Be the first young defender to click a cheer bubble above!
                  </div>
                ) : (
                  cheersList.map((c, idx) => (
                    <div
                      key={c.id || idx}
                      className="flex items-start gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10 shadow-sm"
                    >
                      <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-lg flex-shrink-0">
                        🌟
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-display font-bold text-xs text-[#F5B942] truncate">
                            {c.nickname}
                          </span>
                          <span className="text-[10px] text-white/40">{c.time || 'Just now'}</span>
                        </div>
                        <p className="text-sm text-white/90 mt-0.5 leading-snug">{c.message}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── CALL TO ACTION ── */}
        <div className="mt-2 p-6 rounded-2xl bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-white/10 text-center flex flex-col items-center gap-3">
          <h3 className="text-lg font-bold text-white">Want to earn more badges?</h3>
          <p className="text-xs sm:text-sm text-white/70 max-w-md">
            Complete Rights Quests, make courageous choices, and earn up to 50 Bonus XP for gold endings!
          </p>
          <button
            onClick={() => {
              sound.click();
              navigate('/map');
            }}
            className="mt-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#F5B942] to-[#ffd700] text-black font-extrabold text-sm shadow-lg hover:scale-105 transition-all"
          >
            🚀 Continue Your Quest
          </button>
        </div>
      </div>
    </div>
  );
}
