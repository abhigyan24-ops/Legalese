/**
 * AdvocateDashboard.jsx
 * 
 * Official Legal Advocate & Moderator Portal.
 * Allows certified child rights advocates to:
 * - Log in with passkey
 * - Review and answer pending legal questions across all 5 story topics
 * - Publish official statutory guidance directly to children's public Q&A feed
 */

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { listenAllQuestionsCloud, answerQuestionCloud } from '../../firebase/firebase';
import { draftAdvocateAnswerAI } from '../../lib/groqAI';
import sound from '../../lib/sound';

const PASSKEY = 'RIGHTS_QUEST_LEGAL_2026';

const STORY_MAP = {
  'right-to-education': 'Right to Education (Article 21-A)',
  'right-to-healthcare': 'Right to Healthcare (Article 21)',
  'protection-from-child-labour': 'Protection from Child Labour (CLPRA)',
  'protection-from-abuse': 'Protection from Abuse (POCSO Act 2012)',
  'protection-from-child-marriage': 'Protection from Child Marriage (PCMA 2006)',
};

export default function AdvocateDashboard() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passInput, setPassInput] = useState('');
  const [error, setError] = useState('');

  // Questions management
  const [questions, setQuestions] = useState([]);
  const [selectedStory, setSelectedStory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all'); // 'all' | 'pending' | 'answered'

  // Answer Modal
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [advocateName, setAdvocateName] = useState('Adv. Smita Patel • High Court Legal Aid Panel');
  const [answerText, setAnswerText] = useState('');
  const [isDraftingAI, setIsDraftingAI] = useState(false);
  const [statuteTag, setStatuteTag] = useState('');
  const [successToast, setSuccessToast] = useState('');

  useEffect(() => {
    // Check if session was already authenticated
    if (sessionStorage.getItem('rq_advocate_authenticated') === 'true') {
      setIsAuthenticated(true);
    }
    // Subscribe to live Realtime Database stream
    const unsubscribe = listenAllQuestionsCloud((data) => {
      setQuestions(data);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (passInput.trim() === PASSKEY) {
      sound.win();
      setIsAuthenticated(true);
      sessionStorage.setItem('rq_advocate_authenticated', 'true');
      setError('');
    } else {
      setError('Invalid passkey. Access restricted to certified child rights legal advocates.');
    }
  };

  const handleLogout = () => {
    sound.click();
    setIsAuthenticated(false);
    sessionStorage.removeItem('rq_advocate_authenticated');
  };

  const handleOpenAnswerModal = (q) => {
    sound.click();
    setActiveQuestion(q);
    setAnswerText(q.answer ? q.answer.text : '');
    setAdvocateName(q.answer ? q.answer.answeredBy : 'Adv. Smita Patel • High Court Legal Aid Panel');
  };

  const handleDraftWithAI = async () => {
    if (!activeQuestion) return;
    sound.advance();
    setIsDraftingAI(true);
    const qText = activeQuestion.question || activeQuestion.text || '';
    const storyTopic = STORY_MAP[activeQuestion.storyId] || 'Child Rights in India';
    const draft = await draftAdvocateAnswerAI(qText, storyTopic);
    if (draft) {
      setAnswerText(draft);
      sound.win();
    }
    setIsDraftingAI(false);
  };

  const handlePublishAnswer = async () => {
    if (!activeQuestion || !answerText.trim()) return;
    sound.advance();

    const payload = {
      text: answerText.trim(),
      answeredBy: advocateName.trim() || 'Verified Legal Advocate',
      answeredAt: `Verified on ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}`,
    };

    await answerQuestionCloud(activeQuestion.id, payload);
    setActiveQuestion(null);
    setAnswerText('');
    setSuccessToast('Official legal answer published live to the public Q&A feed!');
    setTimeout(() => setSuccessToast(''), 4000);
  };

  const filteredQuestions = questions.filter((q) => {
    const storyMatch = selectedStory === 'all' || q.storyId === selectedStory;
    const statusMatch = filterStatus === 'all' || q.status === filterStatus;
    return storyMatch && statusMatch;
  });

  const pendingCount = questions.filter((q) => q.status === 'pending').length;

  return (
    <div className="min-h-screen bg-[#0c0c1e] text-[#f0eef6] font-body select-none py-8 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-bold text-white transition-all shadow"
            >
              ← Back to Home
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">⚖️</span>
                <h1 className="text-xl sm:text-2xl font-extrabold font-display bg-gradient-to-r from-[#F5B942] to-amber-200 bg-clip-text text-transparent">
                  Legal Advocate Moderation Console
                </h1>
              </div>
              <p className="text-xs text-white/60">
                Official review &amp; statutory guidance portal for verified child rights counsel
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              to="/map"
              className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-bold text-white transition-all"
            >
              🗺️ Rights Trail
            </Link>
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="px-3.5 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-xs font-bold text-rose-300 transition-all"
              >
                Log Out
              </button>
            )}
          </div>
        </header>

        {/* ── NOT AUTHENTICATED: LOGIN GATE ── */}
        {!isAuthenticated ? (
          <div className="max-w-md mx-auto w-full mt-8 bg-[#121124] border-2 border-[#F5B942]/60 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col gap-5">
            <div className="text-center flex flex-col items-center gap-2">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-3xl shadow-inner">
                ⚖️
              </div>
              <h2 className="text-xl font-bold font-display text-white">Advocate Verification</h2>
              <p className="text-xs text-white/60">
                Please enter the verified legal advocate passkey to access the answering console.
              </p>
            </div>

            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <input
                type="password"
                value={passInput}
                onChange={(e) => {
                  setPassInput(e.target.value);
                  setError('');
                }}
                placeholder="Enter Legal Passkey..."
                className="w-full bg-black/50 border border-white/20 focus:border-[#F5B942] rounded-xl p-3.5 text-sm text-white placeholder-white/30 outline-none"
              />
              {error && <p className="text-xs text-rose-400 font-bold">{error}</p>}

              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[11px] text-white/60">
                🔑 <strong>Demo Access Passkey:</strong>{' '}
                <code className="text-[#F5B942] font-mono select-all">RIGHTS_QUEST_LEGAL_2026</code>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#F5B942] to-[#ffd700] text-black font-extrabold text-sm shadow-xl hover:scale-105 transition-all"
              >
                Verify &amp; Enter Console →
              </button>
            </form>
          </div>
        ) : (
          /* ── AUTHENTICATED: ADVOCATE WORKBENCH ── */
          <div className="flex flex-col gap-6 animate-fadeIn">
            {/* Status Summary Banner */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-[#121124] border border-white/15 flex items-center justify-between">
                <div>
                  <div className="text-2xl font-extrabold text-white">{questions.length}</div>
                  <div className="text-xs text-white/50">Total Questions</div>
                </div>
                <span className="text-3xl">📚</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#121124] border border-amber-500/40 flex items-center justify-between">
                <div>
                  <div className="text-2xl font-extrabold text-[#F5B942]">{pendingCount}</div>
                  <div className="text-xs text-amber-200/70">Pending Review</div>
                </div>
                <span className="text-3xl">⏳</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#121124] border border-emerald-500/40 flex items-center justify-between">
                <div>
                  <div className="text-2xl font-extrabold text-emerald-400">
                    {questions.length - pendingCount}
                  </div>
                  <div className="text-xs text-emerald-200/70">Answered &amp; Live</div>
                </div>
                <span className="text-3xl">✓</span>
              </div>
            </div>

            {successToast && (
              <div className="p-4 rounded-2xl bg-emerald-950/60 border-2 border-emerald-400 text-sm text-emerald-200 font-bold flex items-center gap-2 shadow-xl animate-fadeIn">
                <span>✓</span>
                <span>{successToast}</span>
              </div>
            )}

            {/* Filter Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#121124] p-4 rounded-2xl border border-white/10">
              {/* Story Filter */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-white/50">Story Topic:</span>
                <select
                  value={selectedStory}
                  onChange={(e) => setSelectedStory(e.target.value)}
                  className="bg-black/50 border border-white/15 rounded-xl px-3 py-1.5 text-xs text-white outline-none focus:border-[#F5B942]"
                >
                  <option value="all">🌟 All Story Topics</option>
                  <option value="right-to-education">🎒 Right to Education (Art 21-A)</option>
                  <option value="right-to-healthcare">🏥 Right to Healthcare (Art 21)</option>
                  <option value="protection-from-child-labour">🏭 Protection from Child Labour</option>
                  <option value="protection-from-abuse">🛡️ Protection from Abuse (POCSO)</option>
                  <option value="protection-from-child-marriage">📜 Protection from Child Marriage</option>
                </select>
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-1.5">
                {[
                  { key: 'all', label: 'All' },
                  { key: 'pending', label: `Pending (${pendingCount})` },
                  { key: 'answered', label: 'Answered' },
                ].map((st) => (
                  <button
                    key={st.key}
                    onClick={() => setFilterStatus(st.key)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      filterStatus === st.key
                        ? 'bg-[#F5B942] text-black shadow'
                        : 'bg-white/5 text-white/60 hover:bg-white/10'
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Questions Feed */}
            <div className="space-y-4">
              {filteredQuestions.length === 0 && (
                <div className="text-center py-12 text-white/40 bg-[#121124] rounded-3xl border border-white/10">
                  <span className="text-4xl block mb-2">⚖️</span>
                  <p className="text-sm">No questions matching this filter criteria.</p>
                </div>
              )}

              {filteredQuestions.map((q) => (
                <div
                  key={q.id}
                  className={`p-5 rounded-3xl border transition-all flex flex-col gap-4 shadow-xl ${
                    q.status === 'pending'
                      ? 'bg-[#18162e] border-amber-500/50'
                      : 'bg-[#121124] border-white/10'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-[#F5B942] text-[10px] font-mono font-bold">
                        {STORY_MAP[q.storyId] || q.storyId}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          q.status === 'pending'
                            ? 'bg-amber-500/20 text-amber-300'
                            : 'bg-emerald-500/20 text-emerald-300'
                        }`}
                      >
                        {q.status === 'pending' ? '⏳ PENDING REVIEW' : '✓ ANSWERED'}
                      </span>
                    </div>
                    <span className="text-xs text-white/40">{q.time || 'Recent'}</span>
                  </div>

                  {/* Question Content */}
                  <div className="flex items-start gap-3">
                    <span className="text-xl mt-0.5">❓</span>
                    <div>
                      <div className="text-xs font-bold text-white/60">Asked by {q.author || 'Young Explorer'}:</div>
                      <p className="text-sm font-semibold text-white mt-0.5 leading-snug">
                        "{q.question || q.text}"
                      </p>
                    </div>
                  </div>

                  {/* Existing Answer if present */}
                  {q.answer && (
                    <div className="p-4 rounded-2xl bg-amber-500/10 border border-[#F5B942]/30 flex flex-col gap-2">
                      <div className="flex items-center justify-between text-xs text-[#F5B942] font-bold">
                        <span>⚖️ {q.answer.answeredBy}</span>
                        <span className="text-[10px] text-white/40">{q.answer.answeredAt}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#FBF3E3] leading-relaxed">
                        {q.answer.text}
                      </p>
                    </div>
                  )}

                  {/* Action Button */}
                  <div className="self-end">
                    <button
                      onClick={() => handleOpenAnswerModal(q)}
                      className={`px-4 py-2 rounded-xl text-xs font-extrabold shadow-md transition-all flex items-center gap-1.5 ${
                        q.status === 'pending'
                          ? 'bg-gradient-to-r from-[#F5B942] to-amber-400 text-black hover:scale-105'
                          : 'bg-white/10 hover:bg-white/20 text-white'
                      }`}
                    >
                      <span>✍️</span>
                      <span>{q.status === 'pending' ? 'Publish Verified Answer' : 'Edit Official Guidance'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── ANSWER EDIT MODAL ── */}
        {activeQuestion && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
            <div className="bg-[#121124] border-2 border-emerald-400/60 rounded-3xl p-6 max-w-xl w-full shadow-2xl flex flex-col gap-4">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="text-xl">⚖️</span>
                  <h3 className="font-display font-extrabold text-base text-white">
                    Publish Official Legal Guidance
                  </h3>
                </div>
                <button
                  onClick={() => setActiveQuestion(null)}
                  className="text-white/60 hover:text-white text-sm"
                >
                  ✕
                </button>
              </div>

              <div className="p-3.5 rounded-2xl bg-black/50 border border-white/10 text-xs text-white/90">
                <span className="text-[#F5B942] font-bold block mb-1">Child's Question:</span>
                "{activeQuestion.question || activeQuestion.text}"
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-white/70">Your Advocate Name &amp; Title:</label>
                <input
                  type="text"
                  value={advocateName}
                  onChange={(e) => setAdvocateName(e.target.value)}
                  placeholder="e.g. Adv. Smita Patel • High Court Legal Aid Panel"
                  className="w-full bg-black/40 border border-white/20 focus:border-emerald-400 rounded-xl p-2.5 text-xs text-white outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-white/70">Statutory Legal Guidance for Child:</label>
                  <button
                    type="button"
                    onClick={handleDraftWithAI}
                    disabled={isDraftingAI}
                    className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-amber-500/20 to-purple-500/20 hover:from-amber-500/30 hover:to-purple-500/30 border border-amber-400/40 text-[11px] font-extrabold text-amber-300 flex items-center gap-1.5 transition-all shadow"
                    title="Generate a statutory draft based on Indian law using Groq AI"
                  >
                    <span>{isDraftingAI ? '⏳' : '✨'}</span>
                    <span>{isDraftingAI ? 'Drafting with Groq AI...' : 'Generate with AI (Groq)'}</span>
                  </button>
                </div>
                <textarea
                  value={answerText}
                  onChange={(e) => setAnswerText(e.target.value)}
                  placeholder="Cite the relevant constitutional articles or acts (e.g. Section 3 of RTE Act, POCSO Act 2012), explain the legal protection, and provide safe actionable next steps..."
                  rows={5}
                  className="w-full bg-black/40 border border-white/20 focus:border-emerald-400 rounded-xl p-3 text-xs sm:text-sm text-white placeholder-white/30 resize-none outline-none leading-relaxed"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveQuestion(null)}
                  className="flex-1 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-all"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handlePublishAnswer}
                  disabled={!answerText.trim()}
                  className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs shadow-lg hover:scale-105 transition-all disabled:opacity-40"
                >
                  Publish Answer Live →
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
