/**
 * CommunityWall.jsx
 * 
 * Per-story Public Reflection Wall & Moderated Legal Expert Q&A.
 * Fully persistent via universal storageEngine (LocalStorage + Cloud Firestore).
 */

import { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import {
  listenCommunityReflectionsCloud,
  postCommunityReflectionCloud,
  listenQuestionsCloud,
  postQuestionCloud,
} from '../../firebase/firebase';
import { getAllQuestions, saveQuestion, markHelpful } from '../../lib/storageEngine';
import { generateLegalAnswer, moderateContent } from '../../lib/groqAI';
import sound from '../../lib/sound';
import SmoothScroll from '../ui/SmoothScroll';
import AnimatedButton from '../ui/AnimatedButton';

const MAX_LEN = 280;

const BLOCKED_WORDS = [
  'whatsapp', 'instagram', 'facebook', 'telegram', 'call me', 'my number',
  'phone', 'address', 'meet me', 'come home', 'discord', 'snapchat',
];

function containsBlocked(text) {
  const lower = text.toLowerCase();
  return BLOCKED_WORDS.some((w) => lower.includes(w));
}

const STORY_LABELS = {
  'right-to-education': 'Right for Education (Art 21-A)',
  'protection-from-child-marriage': 'Right against Child Marriage (PCMA)',
  'protection-from-child-labour': 'Right against Child Labor (CLPRA)',
  'protection-from-abuse': 'Right against Abuse (POCSO)',
  'right-to-healthcare': 'Right to Healthcare (Art 21)',
  'right-to-equality': 'Right to Equality (Articles 14, 15 & 17)',
};

const CHEER_REACTIONS = ['🎉', '💪', '🌟', '👏', '❤️'];

export default function CommunityWall() {
  const params = useParams();
  const navigate = useNavigate();
  const { state } = useApp();

  // If accessed via /qa, default to right-to-education, or allow topic switching
  const [currentStoryId, setCurrentStoryId] = useState(params.storyId || 'right-to-education');

  const [activeTab, setActiveTab] = useState('qa'); // 'qa' | 'reflections'
  const [posts, setPosts] = useState([]);
  const [draft, setDraft] = useState('');
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState('');
  const [reported, setReported] = useState(new Set());
  const [votedHelpful, setVotedHelpful] = useState(new Set());

  // Q&A State
  const [qaList, setQaList] = useState([]);
  const [qaQuestionText, setQaQuestionText] = useState('');
  const [qaSubmitting, setQaSubmitting] = useState(false);
  const [qaToast, setQaToast] = useState('');

  const bottomRef = useRef(null);

  const storyLabel = STORY_LABELS[currentStoryId] || 'Legal Rights Q&A';
  const charsLeft = MAX_LEN - draft.length;
  const canPost = draft.trim().length >= 3 && charsLeft >= 0 && !containsBlocked(draft);

  const qaCharsLeft = MAX_LEN - qaQuestionText.length;
  const canSubmitQa = qaQuestionText.trim().length >= 5 && qaCharsLeft >= 0 && !containsBlocked(qaQuestionText);

  // Load persistent Q&A questions from storage engine
  useEffect(() => {
    loadQuestions();
  }, [currentStoryId]);

  const loadQuestions = () => {
    const list = getAllQuestions(currentStoryId);
    setQaList(list);
  };

  // Real-time listener for community reflections from Realtime Cloud
  useEffect(() => {
    setPosts([]); // clear on topic change to avoid stale data
    const unsub = listenCommunityReflectionsCloud(currentStoryId, (cloudPosts) => {
      setPosts(cloudPosts || []);
    });
    return () => unsub();
  }, [currentStoryId]);

  // Real-time listener for Q&A questions from Realtime Cloud (single source of truth)
  useEffect(() => {
    setQaList([]); // clear on topic change to avoid stale data flicker
    const unsub = listenQuestionsCloud(currentStoryId, (cloudQa) => {
      if (cloudQa && cloudQa.length > 0) {
        // Cloud is the source of truth — sort newest first
        const sorted = [...cloudQa].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setQaList(sorted);
      } else {
        // Fallback to local storage when cloud is empty / offline
        const localList = getAllQuestions(currentStoryId);
        setQaList(localList);
      }
    });
    return () => unsub();
  }, [currentStoryId]);

  const handlePost = async () => {
    if (!canPost || posting) return;
    if (containsBlocked(draft)) {
      setError('Your message contains restricted contact information. Please remove it.');
      return;
    }
    setPosting(true);
    setError('');
    try {
      // AI Safety Moderation
      const modResult = await moderateContent(draft.trim());
      if (!modResult.safe) {
        setError('Your message was flagged by our safety system. Please review and try again.');
        setPosting(false);
        return;
      }

      const activeUid = state.currentUser?.uid || 'anonymous';
      const newPost = await postCommunityReflectionCloud({
        storyId: currentStoryId,
        text: draft.trim(),
        authorId: activeUid,
        nickname: state.currentUser?.nickname || 'Explorer',
        avatar: state.currentUser?.avatar || 'boy-short-blue-medium',
      });

      if (newPost) {
        setPosts((prev) => [newPost, ...prev.filter((p) => p.id !== newPost.id)]);
      }
      setDraft('');
    } catch {
      setPosts((prev) => [
        ...prev,
        {
          id: `local-${Date.now()}`,
          storyId: currentStoryId,
          text: draft.trim(),
          nickname: state.currentUser?.nickname || 'Explorer',
          avatar: state.currentUser?.avatar || 'boy-short-blue-medium',
          cheers: {},
          reportCount: 0,
          local: true,
        },
      ]);
      setDraft('');
    } finally {
      setPosting(false);
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  };

  const handleCheer = async (postId, emoji) => {
    sound.click();
    if (!db || postId.startsWith('local-')) return;
    try {
      await updateDoc(doc(db, 'community_posts', postId), {
        [`cheers.${emoji}`]: increment(1),
      });
    } catch {
      // offline
    }
  };

  const handleReport = async (postId) => {
    if (reported.has(postId) || !db || postId.startsWith('local-')) return;
    try {
      await updateDoc(doc(db, 'community_posts', postId), { reportCount: increment(1) });
      setReported((prev) => new Set([...prev, postId]));
    } catch {
      setReported((prev) => new Set([...prev, postId]));
    }
  };

  const handleHelpfulClick = async (qaId) => {
    if (votedHelpful.has(qaId)) return;
    sound.click();
    setVotedHelpful((prev) => new Set([...prev, qaId]));
    await markHelpful(qaId);
    loadQuestions();
  };

  // Submit Q&A Question with AI moderation + AI auto-answer
  const handleSubmitQuestion = async () => {
    if (!canSubmitQa || qaSubmitting) return;
    if (containsBlocked(qaQuestionText)) {
      setError('Questions cannot contain phone numbers, social handles, or contact info.');
      return;
    }
    setQaSubmitting(true);
    setError('');

    try {
      // AI Safety Moderation first
      const modResult = await moderateContent(qaQuestionText.trim());
      if (!modResult.safe) {
        setError('Your question was flagged by our safety system. Please rephrase and try again.');
        setQaSubmitting(false);
        return;
      }

      sound.advance();
      await saveQuestion({
        storyId: currentStoryId,
        question: qaQuestionText.trim(),
        author: state.currentUser?.nickname || 'Young Explorer',
        authorId: state.currentUser?.uid || 'anonymous',
      });

      // Post to cloud and trigger AI answer
      const cloudQ = await postQuestionCloud({
        storyId: currentStoryId,
        question: qaQuestionText.trim(),
        author: state.currentUser?.nickname || 'Young Explorer',
        authorId: state.currentUser?.uid || 'anonymous',
      });

      // Generate AI Legal Answer in background
      if (cloudQ?.id) {
        generateLegalAnswer(qaQuestionText.trim(), currentStoryId, state.language || 'en')
          .then(async (aiAnswer) => {
            if (aiAnswer) {
              // Save AI answer back to the question
              const { ref: rtdbRef, update: rtdbUpdate } = await import('firebase/database');
              const { rtdb } = await import('../../firebase/firebase');
              if (rtdb) {
                await rtdbUpdate(rtdbRef(rtdb, `qa_questions/${cloudQ.id}`), {
                  aiAnswer,
                  aiAnsweredAt: new Date().toISOString(),
                });
              }
            }
          })
          .catch(() => {});
      }

      setQaQuestionText('');
      setQaToast('Question submitted! 🤖 Nyay AI is preparing an answer...');
      setTimeout(() => setQaToast(''), 5000);
    } catch (err) {
      console.error('Save question error:', err);
    } finally {
      setQaSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0c0c1e] via-[#161233] to-[#0a0a18] text-[#f0eef6] font-body select-none pb-12">
      {/* ── TOP HEADER WITH COMPREHENSIVE NAVIGATION ── */}
      <header className="sticky top-0 z-30 bg-black/80 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        {/* Back Buttons */}
        <div className="flex items-center gap-2">
          <Link
            to="/"
            onClick={() => sound.click()}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-bold text-white transition-all shadow"
          >
            ← Back to Home
          </Link>
          <Link
            to="/map"
            onClick={() => sound.click()}
            className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-bold text-white transition-all shadow"
          >
            🗺️ Rights Trail
          </Link>
        </div>

        {/* Center Title */}
        <div className="text-center hidden md:block">
          <div className="text-[11px] font-mono text-white/50 uppercase tracking-wider">
            Community Knowledge Hub
          </div>
          <div className="text-sm font-display font-bold text-[#F5B942] truncate max-w-xs">
            {storyLabel}
          </div>
        </div>

        {/* Right Navigation */}
        <div className="flex items-center gap-2">
          <Link
            to="/leaderboard"
            onClick={() => sound.click()}
            className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-bold text-white transition-all shadow"
          >
            🏆 Leaderboard
          </Link>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6 flex flex-col gap-5">
        {/* Story Topic Selector Dropdown */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#121124] p-4 rounded-3xl border border-white/15 shadow-xl">
          <div className="flex items-center gap-2">
            <span className="text-xl">📚</span>
            <span className="text-xs font-bold text-white/80">Select Legal Topic:</span>
          </div>
          <select
            value={currentStoryId}
            onChange={(e) => {
              sound.click();
              setCurrentStoryId(e.target.value);
            }}
            className="bg-black/50 border border-white/20 rounded-xl px-3.5 py-2 text-xs font-semibold text-white outline-none focus:border-[#F5B942]"
          >
            <option value="right-to-education">🎒 Right for Education (Article 21-A)</option>
            <option value="protection-from-child-marriage">📜 Right against Child Marriage (PCMA 2006)</option>
            <option value="protection-from-child-labour">🏭 Right against Child Labor (CLPRA)</option>
            <option value="protection-from-abuse">🛡️ Right against Abuse (POCSO Act 2012)</option>
            <option value="right-to-healthcare">🏥 Right to Healthcare (Article 21)</option>
            <option value="right-to-equality">⚖️ Right to Equality (Articles 14, 15 & 17)</option>
          </select>
        </div>

        {/* Safety Notice (non-dismissible) */}
        <div className="p-3.5 rounded-2xl bg-amber-900/25 border border-amber-500/40 text-xs text-amber-200 flex gap-2.5 items-start shadow-md">
          <span className="text-base flex-shrink-0">🛡️</span>
          <span>
            <strong>Child Safety Protected Hub:</strong> Questions &amp; reflections are saved publicly in our
            moderated database. Zero private messaging, phone numbers, or social handles allowed.
          </span>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 gap-2 bg-white/5 border border-white/10 p-1.5 rounded-2xl">
          <button
            type="button"
            onClick={() => {
              sound.click();
              setActiveTab('qa');
            }}
            className={`py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'qa'
                ? 'bg-gradient-to-r from-[#F5B942] to-amber-400 text-black shadow-lg'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <span>⚖️</span>
            <span>Legal Expert Q&amp;A ({qaList.length})</span>
          </button>

          <button
            type="button"
            onClick={() => {
              sound.click();
              setActiveTab('reflections');
            }}
            className={`py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'reflections'
                ? 'bg-gradient-to-r from-[#F5B942] to-amber-400 text-black shadow-lg'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <span>💭</span>
            <span>Reflections ({posts.length})</span>
          </button>
        </div>

        {/* ── TAB 1: MODERATED LEGAL EXPERT Q&A ── */}
        {activeTab === 'qa' && (
          <div className="flex flex-col gap-5 animate-fadeIn">
            {/* Ask Question Box */}
            <div className="bg-[#121124]/90 border-2 border-white/15 rounded-3xl p-5 flex flex-col gap-3 shadow-2xl">
              <div className="flex items-center gap-2">
                <span className="text-xl">⚖️</span>
                <span className="font-display font-bold text-sm text-white">
                  Ask a Verified Child Rights Legal Advocate
                </span>
              </div>

              <p className="text-xs text-white/60 leading-relaxed">
                Have a question about constitutional laws in this story? Ask here. All questions are saved
                permanently in the database and answered publicly by verified child rights lawyers.
              </p>

              <textarea
                value={qaQuestionText}
                onChange={(e) => {
                  setQaQuestionText(e.target.value.slice(0, MAX_LEN));
                  setError('');
                }}
                placeholder="Ask your legal question (e.g. Can a school expel a student for non-payment of extra fees?)"
                rows={3}
                className="w-full bg-black/40 border border-white/10 focus:border-[#F5B942] rounded-2xl p-3.5 text-sm text-white placeholder-white/30 resize-none outline-none transition-colors"
              />

              {qaToast && (
                <div className="p-3.5 rounded-2xl bg-emerald-950/60 border-2 border-emerald-400 text-xs text-emerald-200 font-bold flex items-center gap-2 shadow-xl animate-fadeIn">
                  <span>✓</span>
                  <span>{qaToast}</span>
                </div>
              )}

              {error && <p className="text-xs text-rose-400 font-bold">{error}</p>}

              <div className="flex items-center justify-between">
                <span
                  className={`text-xs font-mono font-bold transition-colors ${
                    qaCharsLeft < 20
                      ? 'text-rose-400 font-extrabold animate-pulse'
                      : qaCharsLeft < 60
                      ? 'text-amber-400'
                      : 'text-emerald-400'
                  }`}
                >
                  {qaCharsLeft} chars left
                </span>
                <AnimatedButton
                  variant="primary"
                  size="sm"
                  disabled={!canSubmitQa || qaSubmitting}
                  onClick={handleSubmitQuestion}
                >
                  {qaSubmitting ? 'Saving to Database...' : 'Save & Submit Question →'}
                </AnimatedButton>
              </div>
            </div>

            {/* Answered & Pending Questions Feed */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between px-1">
                <h3 className="text-xs uppercase tracking-wider text-[#F5B942] font-mono font-extrabold flex items-center gap-1.5">
                  <span>📢</span>
                  <span>Verified Legal Questions ({qaList.length})</span>
                </h3>
                <span className="text-xs text-white/40">Real Database Stream</span>
              </div>

              {qaList.length === 0 && (
                <div className="text-center py-12 text-white/40 bg-[#121124] rounded-3xl border border-white/10">
                  <span className="text-4xl block mb-2">⚖️</span>
                  <p className="text-sm">No questions submitted for this topic yet. Be the first to ask!</p>
                </div>
              )}

              {qaList.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#121124]/90 border border-white/10 rounded-3xl p-5 flex flex-col gap-4 shadow-xl hover:border-white/20 transition-all"
                >
                  {/* Child's Question */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm flex-shrink-0">
                      ❓
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#F5B942] font-display">
                          {item.author || 'Young Explorer'}
                        </span>
                        <span className="text-[10px] text-white/40">{item.time || 'Saved in Database'}</span>
                      </div>
                      <p className="text-sm font-medium text-white mt-1 leading-snug">
                        "{item.question || item.text}"
                      </p>
                    </div>
                  </div>

                  {/* Verified Answer Section */}
                  {item.answer ? (
                    <div className="p-4 rounded-2xl bg-amber-500/10 border border-[#F5B942]/40 flex flex-col gap-2">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#F5B942]">
                          <span>⚖️</span>
                          <span>{item.answer.answeredBy}</span>
                        </div>
                        <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-[#FFE7A8] font-bold">
                          VERIFIED COUNSEL
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#FBF3E3] leading-relaxed">
                        {item.answer.text}
                      </p>

                      {/* Helpful Button */}
                      <div className="pt-2 flex items-center justify-between border-t border-white/10 text-xs">
                        <button
                          type="button"
                          onClick={() => handleHelpfulClick(item.id)}
                          className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs transition-all ${
                            votedHelpful.has(item.id)
                              ? 'bg-emerald-500/30 text-emerald-300 font-bold'
                              : 'bg-white/5 hover:bg-white/15 text-white/70'
                          }`}
                        >
                          <span>👍</span>
                          <span>Helpful ({item.helpfulCount || 0})</span>
                        </button>
                        <span className="text-[10px] text-white/40">{item.answer.answeredAt || 'Verified Statutory Advice'}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="p-3.5 rounded-2xl bg-white/5 border border-amber-500/30 flex items-center gap-2 text-xs text-amber-200/80">
                      <span className="animate-spin">⏳</span>
                      <span>Saved in Database. Pending review &amp; answer by certified child rights counsel.</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TAB 2: REFLECTIONS FEED ── */}
        {activeTab === 'reflections' && (
          <div className="flex flex-col gap-4 animate-fadeIn">
            {/* Post Composer */}
            {state.currentUser && (
              <div className="bg-[#121124]/90 border border-white/15 rounded-3xl p-5 flex flex-col gap-3 shadow-xl">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-sm">
                    💭
                  </div>
                  <span className="text-xs font-bold text-white/70">
                    {state.currentUser.nickname || 'Young Explorer'} · Share your reflection
                  </span>
                </div>
                <textarea
                  value={draft}
                  onChange={(e) => {
                    setDraft(e.target.value.slice(0, MAX_LEN));
                    setError('');
                  }}
                  placeholder="What did this story teach you about children's rights? (max 280 characters)"
                  rows={3}
                  className="w-full bg-black/40 border border-white/10 focus:border-[#F5B942] rounded-2xl p-3.5 text-sm text-white placeholder-white/30 resize-none outline-none transition-colors"
                />
                {error && <p className="text-xs text-rose-400 font-bold">{error}</p>}
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-mono font-bold transition-colors ${
                      charsLeft < 20
                        ? 'text-rose-400 font-extrabold animate-pulse'
                        : charsLeft < 60
                        ? 'text-amber-400'
                        : 'text-emerald-400'
                    }`}
                  >
                    {charsLeft} chars left
                  </span>
                  <AnimatedButton
                    variant="primary"
                    size="sm"
                    disabled={!canPost || posting}
                    onClick={handlePost}
                  >
                    {posting ? 'Posting...' : 'Share Thought →'}
                  </AnimatedButton>
                </div>
              </div>
            )}

            {/* Posts Feed */}
            <div className="flex flex-col gap-3">
              {posts.length === 0 && (
                <div className="text-center py-12 text-white/30">
                  <div className="text-4xl mb-3">💬</div>
                  <p className="text-sm">No reflections yet for this topic — be the first to share!</p>
                </div>
              )}
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-[#121124]/80 border border-white/10 rounded-2xl p-4 flex flex-col gap-3 shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-display font-bold text-[#F5B942]">{post.nickname || 'Explorer'}</span>
                    {!reported.has(post.id) ? (
                      <button
                        type="button"
                        onClick={() => handleReport(post.id)}
                        className="text-[10px] text-white/30 hover:text-rose-400 transition-colors"
                      >
                        Report
                      </button>
                    ) : (
                      <span className="text-[10px] text-rose-400 font-bold">Reported</span>
                    )}
                  </div>
                  <p className="text-sm text-white leading-relaxed">{post.text}</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    {CHEER_REACTIONS.map((emoji) => {
                      const count = post.cheers?.[emoji] || 0;
                      return (
                        <button
                          key={emoji}
                          type="button"
                          onClick={() => handleCheer(post.id, emoji)}
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-xs transition-all active:scale-95"
                        >
                          <span>{emoji}</span>
                          {count > 0 && <span className="text-white/60 font-mono font-bold">{count}</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
